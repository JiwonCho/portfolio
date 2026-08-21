'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('이메일 주소를 복사했습니다.', { description: email });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('복사에 실패했습니다. 주소를 직접 선택해 주세요.');
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} aria-label="이메일 주소 복사">
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      {copied ? '복사됨' : '이메일 복사'}
    </Button>
  );
}
