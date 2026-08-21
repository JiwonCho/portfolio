'use server';

import { validateContactPayload, type ContactPayload, type ContactResult } from '../model/schema';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Contact 폼 전송. 액세스 키는 서버 전용 환경변수로만 읽는다.
 * (NEXT_PUBLIC_ 접두사를 붙이면 클라이언트 번들에 노출된다)
 *
 * TODO(자료 필요): .env.local 에 WEB3FORMS_ACCESS_KEY 설정
 */
export async function sendMessageAction(payload: ContactPayload): Promise<ContactResult> {
  if (payload.botcheck) {
    // 허니팟이 채워졌으면 조용히 성공 처리하고 실제 전송은 하지 않는다
    return { ok: true, message: '메시지를 전달했습니다.' };
  }

  const validationError = validateContactPayload(payload);
  if (validationError) {
    return { ok: false, message: validationError };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      message: '폼 전송이 아직 설정되지 않았습니다. 이메일로 바로 보내 주세요.',
      fallbackToMailto: true,
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[포트폴리오] ${payload.name} 님의 문의`,
        from_name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
    });

    if (!response.ok) {
      return { ok: false, message: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.' };
    }

    return { ok: true, message: '메시지를 전달했습니다. 빠르게 회신드리겠습니다.' };
  } catch {
    return {
      ok: false,
      message: '네트워크 오류로 전송하지 못했습니다. 이메일로 보내 주세요.',
      fallbackToMailto: true,
    };
  }
}
