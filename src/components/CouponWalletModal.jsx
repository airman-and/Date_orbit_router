import React, { useState } from 'react';

export default function CouponWalletModal({ isOpen, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => {
      setIsDownloaded(false);
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(8, 6, 20, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="premium-card" style={{
        maxWidth: '420px',
        width: '100%',
        position: 'relative',
        padding: '30px',
        textAlign: 'center',
        border: '1px solid rgba(255, 117, 140, 0.25)',
        boxShadow: '0 20px 50px rgba(255, 117, 140, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px', right: '16px',
            background: 'none', border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          ✕
        </button>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
          💳 모바일 코스 소장 및 혜택 발송
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          카드를 스캔하거나 마우스로 호버하여 3D 카드를 뒤집어보세요!
        </p>

        {/* 3D CARD WRAPPER */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            perspective: '1000px',
            width: '260px',
            height: '380px',
            margin: '0 auto 25px auto',
            cursor: 'pointer'
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'none'
          }}>
            
            {/* FRONT OF THE CARD (Apple Wallet Style) */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: '#0f0c24',
              border: '1.5px solid rgba(255, 117, 140, 0.4)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(255, 117, 140, 0.15)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-pink)', letterSpacing: '1px' }}>
                  DATE ORBIT PASS
                </span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                  VIP COUPON
                </span>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>PARTNERSHIP</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', letterSpacing: '0.5px', marginTop: '2px' }}>
                  TAMBURINS × ROUTER
                </div>
              </div>

              <div style={{ background: 'rgba(255, 117, 140, 0.04)', border: '1px dashed rgba(255, 117, 140, 0.2)', borderRadius: '12px', padding: '14px 12px', margin: '20px 0' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent-pink)', fontWeight: 700 }}>BENEFIT TICKET</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                  바디 케어 미니어처 키트
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  스타필드 수원점 3F 러쉬 옆 교환소
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                <div>
                  <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>VALID UNTIL</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#white' }}>TODAY ONLY</div>
                </div>
                {/* QR Mini */}
                <div style={{ backgroundColor: 'white', padding: '3px', borderRadius: '4px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 29 29" fill="#0b091a">
                    <path d="M0 0h7v7H0zm1 1v5h5V1zm8-1h7v7H9zm1 1v5h5V1zm8-1h3v1h-3zm0 2h3v1h-3zm0 2h3v1h-3zm-17 4h3v3H1v-3zm4 0h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z"/>
                    <rect x="22" y="0" width="7" height="7"/>
                    <rect x="23" y="1" width="5" height="5" fill="#fff"/>
                    <rect x="0" y="22" width="7" height="7"/>
                    <rect x="1" y="23" width="5" height="5" fill="#fff"/>
                    <path d="M9 9h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm-17 4h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* BACK OF THE CARD (Details / Terms) */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: '#161233',
              border: '1.5px solid rgba(59, 209, 255, 0.4)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(59, 209, 255, 0.15)',
              transform: 'rotateY(180deg)',
              textAlign: 'left'
            }}>
              <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-blue)', letterSpacing: '1px' }}>
                  USE TERMS & DETAILS
                </span>
                
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>이용 안내</div>
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1', lineHeight: '1.4', marginTop: '2px' }}>
                      • 오늘 하루 동안 스타필드 수원점 3층 탬버린즈 매장에서만 수령 가능합니다.
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>증정 품목</div>
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1', lineHeight: '1.4', marginTop: '2px' }}>
                      • 탬버린즈 퍼퓸드 바디 워시 & 로션 샘플 파우치 듀오 키트
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>유의 사항</div>
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1', lineHeight: '1.4', marginTop: '2px' }}>
                      • 커플 2인 기준 1세트 제공되며, 조기 소진 시 다른 사은품으로 대체될 수 있습니다.
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.6rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                Date Orbit Router × TAMBURINS
              </div>
            </div>

          </div>
        </div>

        {/* Action button in Modal */}
        {isDownloaded ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: 'rgba(74, 222, 128, 0.08)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: '12px',
            color: '#4ade80',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            성공적으로 지갑에 추가되었습니다!
          </div>
        ) : (
          <button className="btn-stretch" onClick={handleDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            스마트 지갑에 추가하기 (Apple Wallet / Kakao)
          </button>
        )}
      </div>
    </div>
  );
}
