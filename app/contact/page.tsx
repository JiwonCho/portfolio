import type { Metadata } from 'next';

import { ContactPage } from '@/views/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: '포지션 제안, 기술 협업, 코드 리뷰 — 조지원에게 메시지를 보내 주세요.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactPage />;
}
