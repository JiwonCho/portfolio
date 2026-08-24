'use client';

import { useRef } from 'react';
import { LoaderCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

import { socialLinks } from '@/shared/config';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';

import { sendMessageAction } from '../api/send-message.action';
import { validateContactPayload, type ContactPayload, type ContactResult } from '../model/schema';
import {
  selectContactMessage,
  selectContactStatus,
  submitFailed,
  submitStarted,
  submitSucceeded,
} from '../model/contact-form.slice';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function openMailto(payload: ContactPayload) {
  const subject = encodeURIComponent(`[포트폴리오] ${payload.name} 님의 문의`);
  const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
  window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`;
}

async function deliverViaWeb3Forms(payload: ContactPayload, accessKey: string): Promise<ContactResult> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[포트폴리오] ${payload.name} 님의 문의`,
      from_name: payload.name,
      name: payload.name,
      email: payload.email,
      replyto: payload.email,
      message: payload.message,
    }),
  });
  const data = (await response.json().catch(() => ({}))) as { success?: boolean | string; message?: string };
  const ok = data.success === true || data.success === 'true';
  if (ok) {
    return { ok: true, message: '메시지를 전달했습니다. 빠르게 회신드리겠습니다.' };
  }
  return { ok: false, message: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.' };
}

export function ContactForm({ accessKey }: { accessKey?: string }) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactStatus);
  const statusMessage = useAppSelector(selectContactMessage);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload: ContactPayload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      botcheck: String(formData.get('botcheck') ?? ''),
    };

    const validationError = validateContactPayload(payload);
    if (validationError) {
      dispatch(submitFailed(validationError));
      toast.error(validationError);
      return;
    }

    dispatch(submitStarted());
    const result = accessKey
      ? await deliverViaWeb3Forms(payload, accessKey)
      : await sendMessageAction(payload);

    if (result.ok) {
      dispatch(submitSucceeded(result.message));
      toast.success(result.message);
      formRef.current?.reset();
      return;
    }

    dispatch(submitFailed(result.message));
    if (result.fallbackToMailto) {
      openMailto(payload);
      toast.info(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* 허니팟 — 스크린리더와 사용자 모두에게 감춘다 */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="sr-only"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">이름</Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="홍길동"
            autoComplete="name"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">이메일</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">문의 내용</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="어떤 포지션인지, 어떤 이야기를 나누고 싶은지 적어 주세요."
          required
          disabled={isSubmitting}
        />
      </div>

      {statusMessage ? (
        <p
          role="status"
          aria-live="polite"
          className={
            isError ? 'text-sm text-destructive' : isSuccess ? 'text-sm text-primary' : 'sr-only'
          }
        >
          {statusMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="self-start">
        {isSubmitting ? <LoaderCircle className="animate-spin" aria-hidden /> : <Send aria-hidden />}
        {isSubmitting ? '보내는 중' : '메시지 보내기'}
      </Button>
    </form>
  );
}
