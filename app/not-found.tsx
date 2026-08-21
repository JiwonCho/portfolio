import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-mono text-6xl font-bold text-primary">404</span>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">찾으시는 페이지가 없습니다</h1>
        <p className="text-sm text-muted-foreground">
          주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
        </p>
      </div>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
