'use server';

import { socialLinks } from '@/shared/config';

import { validateContactPayload, type ContactPayload, type ContactResult } from '../model/schema';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(socialLinks.email)}`;

interface ProviderResponse {
  success?: boolean | string;
  message?: string;
}

function isProviderSuccess(body: ProviderResponse, httpOk: boolean) {
  if (typeof body.success === 'boolean') return body.success;
  if (typeof body.success === 'string') return body.success.toLowerCase() === 'true';
  return httpOk;
}

function needsActivation(message: string) {
  const normalized = message.toLowerCase();
  return normalized.includes('activat') || normalized.includes('confirm') || normalized.includes('own this');
}

async function parseProviderResponse(response: Response): Promise<ProviderResponse> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json().catch(() => ({}))) as ProviderResponse;
  }
  const text = await response.text().catch(() => '');
  return { message: text.slice(0, 280) };
}

async function deliverViaWeb3Forms(payload: ContactPayload, accessKey: string) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; portfolio-contact/1.0)',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[포트폴리오] ${payload.name} 님의 문의`,
      from_name: payload.name,
      email: payload.email,
      replyto: payload.email,
      message: payload.message,
    }),
    cache: 'no-store',
  });
  return { httpOk: response.ok, data: await parseProviderResponse(response) };
}

async function deliverViaFormSubmit(payload: ContactPayload) {
  const body = new URLSearchParams({
    name: payload.name,
    email: payload.email,
    message: payload.message,
    _replyto: payload.email,
    _subject: `[포트폴리오] ${payload.name} 님의 문의`,
    _template: 'table',
    _captcha: 'false',
  });

  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body,
    cache: 'no-store',
  });
  return { httpOk: response.ok, data: await parseProviderResponse(response) };
}

/**
 * Contact 폼 전송.
 * WEB3FORMS_ACCESS_KEY 가 있으면 Web3Forms, 없으면 FormSubmit 로 공개 이메일에 전달한다.
 */
export async function sendMessageAction(payload: ContactPayload): Promise<ContactResult> {
  if (payload.botcheck) {
    return { ok: true, message: '메시지를 전달했습니다.' };
  }

  const validationError = validateContactPayload(payload);
  if (validationError) {
    return { ok: false, message: validationError };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

  try {
    const result = accessKey
      ? await deliverViaWeb3Forms(payload, accessKey)
      : await deliverViaFormSubmit(payload);

    if (isProviderSuccess(result.data, result.httpOk)) {
      return { ok: true, message: '메시지를 전달했습니다. 빠르게 회신드리겠습니다.' };
    }

    const providerMessage = result.data.message ?? '';
    if (needsActivation(providerMessage)) {
      return {
        ok: false,
        message: '첫 전송 확인이 필요합니다. 작성하신 내용으로 메일 앱을 열었습니다.',
        fallbackToMailto: true,
      };
    }

    return {
      ok: false,
      message: '전송에 실패했습니다. 작성하신 내용으로 메일 앱을 열었습니다.',
      fallbackToMailto: true,
    };
  } catch {
    return {
      ok: false,
      message: '네트워크 오류로 전송하지 못했습니다. 작성하신 내용으로 메일 앱을 열었습니다.',
      fallbackToMailto: true,
    };
  }
}
