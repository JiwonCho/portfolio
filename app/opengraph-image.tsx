import { ImageResponse } from 'next/og';

export const alt = 'Jiwon Cho — Frontend Engineer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * OG 이미지를 코드로 생성한다. 별도 이미지 자산이 필요 없다.
 * 기본 폰트로는 한글이 렌더되지 않으므로 영문만 사용한다.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#111114',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          padding: '72px',
          color: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, opacity: 0.7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#8b7cf6' }} />
          jiwon.cho
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 30, letterSpacing: 6, color: '#a99cf8' }}>
            FRONTEND ENGINEER
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Drawing boundaries,
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            leaving rules behind.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 56, fontSize: 26, opacity: 0.75 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontWeight: 700 }}>1,335</span>
            <span>tickets</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontWeight: 700 }}>2,240+</span>
            <span>commits</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontWeight: 700 }}>4y 7m</span>
            <span>travel commerce</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
