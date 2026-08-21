export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** 봇 차단용 허니팟 — 사람이 채우지 않는 필드 */
  botcheck?: string;
}

export interface ContactResult {
  ok: boolean;
  message: string;
  /** 폼 전송 수단이 설정되지 않아 mailto 로 유도해야 하는 경우 */
  fallbackToMailto?: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(payload: ContactPayload): string | null {
  if (payload.name.trim().length < 2) return '이름을 2자 이상 입력해 주세요.';
  if (!EMAIL_PATTERN.test(payload.email.trim())) return '이메일 형식을 확인해 주세요.';
  if (payload.message.trim().length < 10) return '문의 내용을 10자 이상 입력해 주세요.';
  return null;
}
