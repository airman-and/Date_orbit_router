import { useEffect, useRef } from 'react';

export default function LoadingRoute() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3.0; // Play at 3x speed
    }
  }, []);

  return (
    <div className="premium-card loading-route-card" aria-live="polite" style={{ textAlign: 'center', padding: '30px' }}>
      <div className="loading-container">
        <video 
          ref={videoRef}
          src="/loading_rocket.mp4" 
          autoPlay 
          muted 
          playsInline 
          loop
          style={{ 
            width: '100%', 
            maxWidth: '520px', 
            height: 'auto', 
            borderRadius: '14px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            border: '2px solid rgba(255, 90, 121, 0.15)',
            marginBottom: '24px',
            background: '#0a0a16'
          }}
        />
        <h2 className="loading-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', margin: '10px 0' }}>
          🚀 스타필드 하트 행성으로 진입 중...
        </h2>
        <p className="loading-copy" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '6px 0 0 0' }}>
          초기 커플만을 위한 '대화 ➔ 취향 ➔ 인증' 최적 궤도를 실시간 연산 중입니다.
        </p>
      </div>
    </div>
  );
}
