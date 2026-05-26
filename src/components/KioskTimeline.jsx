import React, { useState } from 'react';
import { PLANETS } from '../data/places';
import { playSFX } from '../utils/sfx';

const ICONS = {
  flutter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  record: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  sweet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    </svg>
  ),
  calm: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  dopamine: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  gift: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="14" rx="2"/>
      <path d="M12 2v6M12 2a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3z"/>
    </svg>
  ),
  aroma: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/>
    </svg>
  )
};

export default function KioskTimeline({
  selectedRestaurant,
  selectedCafe,
  selectedActivity,
  totalBudgetSpent,
  budgetInput,
  planetOrder,
  commentaryHtml,
  domainBadge,
  badgeClass,
  matchRate,
  catalyst,
  onCatalystChange,
  boyfriendMbti,
  girlfriendMbti,
  onRecalculate,
  onReset
}) {
  const p1 = PLANETS[planetOrder[0]];
  const p2 = PLANETS[planetOrder[1]];
  const p3 = PLANETS[planetOrder[2]];

  // Cosmic Fate Randomizer Local States
  const [isRolling, setIsRolling] = useState(false);
  const [justRolled, setJustRolled] = useState(false);

  // Destiny Catalyst Local States
  const catalystsList = ['dopamine', 'oxytocin', 'spark', 'telepathy', 'lucky'];
  const [tempCatalyst, setTempCatalyst] = useState(null);
  const [isCatalystRolling, setIsCatalystRolling] = useState(false);

  // Collapsible detailed report state
  const [isReportOpen, setIsReportOpen] = useState(false);

  if (!selectedRestaurant || !selectedCafe || !selectedActivity) return null;

  // 3D Card Hover Tilt handlers for Stops
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(800px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale3d(1.01, 1.01, 1.01)`;
    card.style.boxShadow = `0 15px 35px rgba(255, 117, 140, 0.12), 0 0 25px rgba(255, 117, 140, 0.06)`;
    card.style.borderColor = `rgba(255, 117, 140, 0.3)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `none`;
    card.style.borderColor = `rgba(255, 255, 255, 0.03)`;
  };

  const handleFateRoll = () => {
    if (isRolling || isCatalystRolling) return;
    setIsRolling(true);
    setJustRolled(false);
    playSFX('roll'); // Cosmic frequency sweep

    // Satisfying slot-machine visual spin delay (1s)
    setTimeout(() => {
      onRecalculate(); // Draw fresh randomized spots from top-3 pool
      setIsRolling(false);
      setJustRolled(true);
      playSFX('success'); // Success chord harmony

      // Reset flash highlight after 800ms
      setTimeout(() => {
        setJustRolled(false);
      }, 800);
    }, 1000);
  };

  const handleCatalystRoll = () => {
    if (isCatalystRolling || isRolling) return;
    setIsCatalystRolling(true);
    setTempCatalyst(null);
    playSFX('roll'); // Cosmic frequency sweep

    let count = 0;
    const interval = setInterval(() => {
      setTempCatalyst(catalystsList[count % catalystsList.length]);
      count++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const final = catalystsList[Math.floor(Math.random() * catalystsList.length)];
      setTempCatalyst(null);
      onCatalystChange(final);
      setIsCatalystRolling(false);
      playSFX('success'); // Success chord harmony
      
      // Also trigger fate flash
      setJustRolled(true);
      setTimeout(() => {
        setJustRolled(false);
      }, 800);
    }, 1000);
  };

  // Compatibility Math Indexes
  const getCompatibilityMetrics = () => {
    const bf = String(boyfriendMbti || 'ENFP').toUpperCase().trim();
    const gf = String(girlfriendMbti || 'INFJ').toUpperCase().trim();
    if (bf.length !== 4 || gf.length !== 4) {
      return { comm: 80, tempo: 80, romance: 80, path: 80 };
    }
    const comm = bf[0] === gf[0] ? 95 : 78;
    const tempo = bf[1] === gf[1] ? 98 : 72;
    const romance = bf[2] === gf[2] ? 92 : 80;
    const path = bf[3] === gf[3] ? 96 : 85;
    return { comm, tempo, romance, path };
  };

  const compMetrics = getCompatibilityMetrics();

  const getCompatibilityTip = () => {
    const bf = String(boyfriendMbti || 'ENFP').toUpperCase().trim();
    const gf = String(girlfriendMbti || 'INFJ').toUpperCase().trim();
    if (bf.length !== 4 || gf.length !== 4) return "서로를 완벽하게 보완해 주는 우주 궤도입니다.";

    let tips = [];
    if (bf[0] !== gf[0]) {
      tips.push("👦외향(남자) ↔ 👧내향(여자)의 텐션 밸런스를 고려하여 경쾌한 스팟과 차분한 교감 공간이 순차적으로 배치되었습니다.");
    } else if (bf[0] === 'I') {
      tips.push("두 분 모두 내향 성향(I)으로, 소음과 인파 피로가 덜한 프라이빗하고 조용한 스팟 중심 코스로 설계되었습니다.");
    }

    if (bf[1] !== gf[1]) {
      tips.push("S(감각)와 N(직관)의 시선 융합! 직접 만지고 즐기는 체험형 공방/클래스와 몽환적인 감성 LP/북카페 뷰 공간을 유기적으로 결합했습니다.");
    }

    if (bf[2] !== gf[2]) {
      tips.push("이성적 사고(T)와 로맨틱 교감(F)의 균형! 실용적이고 깔끔한 동선 속에 마음의 피로를 풀어내는 감각적 스파/아로마 코스가 설계되었습니다.");
    }

    if (bf[3] !== gf[3]) {
      tips.push("계획형(J)의 동선 안정성에 즉흥형(P)의 유연성을 가미해, 수직 압축 경로 속에 기분 따라 즉흥적으로 입장할 수 있는 네컷부스 등을 매핑했습니다.");
    } else if (bf[3] === 'J') {
      tips.push("두 분 다 완벽주의 계획형(J)으로, 동선 혼선이나 웨이팅 피로가 완벽 배제된 층간 수직적 쾌속 수평 동선을 조율했습니다.");
    }

    return tips.length > 0 ? tips.slice(0, 2).join(' ') : "서로 오차 없이 꼭 닮은 환상적인 감성 궤도 순환 코스입니다!";
  };

  const getCatalystDetail = (catKey) => {
    const details = {
      dopamine: { label: "💥 도파민 대폭발 (Dopamine Overdrive)", color: "#c678ff", desc: "짜릿한 액티비티 및 고에너지 스팟 매칭 가중치 200% 주입 완료!" },
      oxytocin: { label: "🧸 옥시토신 온기 (Oxytocin Warmth)", color: "#55d6be", desc: "아늑하고 포근하게 쉴 수 있는 힐링/케어 스팟 매칭 가중치 200% 주입 완료!" },
      spark: { label: "⚡ 로맨틱 스파크 (Romantic Spark)", color: "#ff758c", desc: "비주얼 극강의 감성 소품 매장 및 인생네컷 트렌디 핫플 매핑 가중치 200% 주입 완료!" },
      telepathy: { label: "🔮 소울 텔레파시 (Soul Telepathy)", color: "#3bd1ff", desc: "도란도란 속삭일 수 있는 프라이빗 LP/북카페 조용한 궤도 가중치 200% 주입 완료!" },
      lucky: { label: "🎲 올라운더 럭키 (Lucky Wildcard)", color: "#ffd23f", desc: "예측 불가능한 우주 난수가 궤도를 셔플링했습니다! 완전히 특별한 운명의 코스를 만끽해 보세요." }
    };
    return details[catKey] || { label: "🧪 궁합 촉매제 주입 대기 중", color: "var(--text-muted)", desc: "궁합 촉매제가 아직 주입되지 않았습니다. 아래 랜덤 캡슐 주입 버튼을 눌러보세요!" };
  };

  const activeCat = tempCatalyst || catalyst;
  const catInfo = getCatalystDetail(activeCat);

  return (
    <div className={`premium-card ${justRolled ? 'fate-flash' : ''}`} style={{ transition: 'all 0.4s' }}>
      
      {/* 🧪 Destiny Catalyst Randomizer Control Deck */}
      <div className="destiny-catalyst-panel" style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '70%' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Destiny Catalyst Injected
          </span>
          <h4 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🧪 <span style={{ color: catInfo.color, textShadow: `0 0 10px ${catInfo.color}40`, transition: 'color 0.2s' }}>{catInfo.label}</span>
          </h4>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {catInfo.desc}
          </p>
        </div>

        <button 
          onClick={handleCatalystRoll}
          disabled={isCatalystRolling || isRolling}
          style={{
            background: isCatalystRolling ? 'rgba(255, 117, 140, 0.05)' : 'linear-gradient(135deg, rgba(255, 117, 140, 0.15) 0%, rgba(198, 120, 255, 0.15) 100%)',
            border: `1.5px solid ${isCatalystRolling ? 'var(--text-muted)' : 'var(--accent-pink)'}`,
            borderRadius: '12px',
            padding: '10px 18px',
            fontSize: '0.78rem',
            color: 'white',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 117, 140, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
          className={`border-beam-btn ${isCatalystRolling ? 'pulse-btn' : ''}`}
        >
          <svg 
            className={isCatalystRolling ? 'spinning' : ''} 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            style={{ transition: 'transform 0.5s ease' }}
          >
            <path d="M12 2v20M17 5v14M22 9v6M7 5v14M2 9v6"/>
          </svg>
          {isCatalystRolling ? '촉매제 융합 중...' : '🧪 랜덤 궁합 촉매제 주입'}
        </button>
      </div>

      {/* Title with matching score & Dynamic Cosmic Fate Button */}
      <div className="score-badge-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <span className="score-title">✨ 둘만의 커스텀 데이트 궤도 타임라인</span>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={handleFateRoll}
            disabled={isRolling || isCatalystRolling}
            style={{
              background: 'rgba(198, 120, 255, 0.15)',
              border: '1.5px solid var(--accent-pink)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.78rem',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(198, 120, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              opacity: (isRolling || isCatalystRolling) ? 0.7 : 1
            }}
            className="kiosk-fate-btn border-beam-btn"
          >
            <svg 
              className={isRolling ? 'spinning' : ''} 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              style={{ transition: 'transform 0.5s ease' }}
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            {isRolling ? '운명 궤도 조율 중...' : '🎲 우주의 이끌림 (운명 매칭)'}
          </button>

          <span className="score-val">💖 궁합매칭률: {matchRate}% Match</span>
        </div>
      </div>

      {/* Geodetic metrics */}
      <div className="metrics-row">
        <div className="metric-col">
          <div className="metric-label">총 데이트 비용 (2인)</div>
          <div className="metric-val">₩{totalBudgetSpent.toLocaleString()}</div>
        </div>
        <div className="metric-col">
          <div className="metric-label">인당 지출 금액</div>
          <div className="metric-val" style={{ fontSize: '0.82rem' }}>
            ₩{(selectedRestaurant.cost + selectedCafe.cost + selectedActivity.cost).toLocaleString()} (한도 ₩{budgetInput.toLocaleString()})
          </div>
        </div>
        <div className="metric-col">
          <div className="metric-label">궤도 구역</div>
          <div className="metric-val">
            <span className={`badge ${badgeClass}`}>{domainBadge}</span>
          </div>
        </div>
      </div>

      {/* Timeline nodes */}
      <div className="custom-timeline" style={{ filter: (isRolling || isCatalystRolling) ? 'blur(3px)' : 'none', opacity: (isRolling || isCatalystRolling) ? 0.5 : 1, transition: 'all 0.3s' }}>
        {/* Stop 1: Planet A (Dining) */}
        <div className="timeline-node">
          <div className="node-dot" style={{ borderColor: p1.color, color: p1.color }}>1</div>
          <div className="node-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: p1.color, display: 'inline-flex' }}>{ICONS[p1.iconKey]}</span>
              🌌 {p1.name} 궤도 진입
            </span>
            <span className="badge-sponsor-timeline">Sponsored by {p1.sponsor}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, margin: '2px 0 6px 0' }}>{p1.desc}</p>
          <div 
            className="node-meta"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transition: 'transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease' }}
          >
            <strong style={{ fontSize: '0.92rem' }}>🍽️ 식사 추천 매장: {selectedRestaurant.name}</strong>
            <p style={{ marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {selectedRestaurant.desc}
            </p>
            <div className="node-meta-row">
              <strong>비용:</strong> 2인 기준 ₩{(selectedRestaurant.cost * 2).toLocaleString()} | <strong>동선:</strong> {selectedRestaurant.floor}층 | <strong>카테고리:</strong> #{selectedRestaurant.tag}
            </div>
          </div>
        </div>

        {/* Stop 2: Planet B (Cafe) */}
        <div className="timeline-node">
          <div className="node-dot" style={{ borderColor: p2.color, color: p2.color }}>2</div>
          <div className="node-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: p2.color, display: 'inline-flex' }}>{ICONS[p2.iconKey]}</span>
              🌌 {p2.name} 궤도 진입
            </span>
            <span className="badge-sponsor-timeline">Sponsored by {p2.sponsor}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, margin: '2px 0 6px 0' }}>{p2.desc}</p>
          <div 
            className="node-meta"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transition: 'transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease' }}
          >
            <strong style={{ fontSize: '0.92rem' }}>☕ 카페 추천 매장: {selectedCafe.name}</strong>
            <p style={{ marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {selectedCafe.desc}
            </p>
            <div className="node-meta-row">
              <strong>비용:</strong> 2인 기준 ₩{(selectedCafe.cost * 2).toLocaleString()} | <strong>동선:</strong> {selectedCafe.floor}층 | <strong>카테고리:</strong> #{selectedCafe.tag}
            </div>
          </div>
        </div>

        {/* Stop 3: Planet C (Activity) */}
        <div className="timeline-node">
          <div className="node-dot" style={{ borderColor: p3.color, color: p3.color }}>3</div>
          <div className="node-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: p3.color, display: 'inline-flex' }}>{ICONS[p3.iconKey]}</span>
              🌌 {p3.name} 궤도 진입
            </span>
            <span className="badge-sponsor-timeline">Sponsored by {p3.sponsor}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, margin: '2px 0 6px 0' }}>{p3.desc}</p>
          <div 
            className="node-meta"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transition: 'transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease' }}
          >
            <strong style={{ fontSize: '0.92rem' }}>🧩 액티비티 추천 매장: {selectedActivity.name}</strong>
            <p style={{ marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {selectedActivity.desc}
            </p>
            <div className="node-meta-row">
              <strong>비용:</strong> 2인 기준 ₩{(selectedActivity.cost * 2).toLocaleString()} | <strong>동선:</strong> {selectedActivity.floor}층 | <strong>카테고리:</strong> #{selectedActivity.tag}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 AI 우주 궁합 & 동선 정밀 분석 리포트 아코디언 서랍 */}
      <div 
        onClick={() => setIsReportOpen(!isReportOpen)}
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px',
          marginTop: '20px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s'
        }}
        className="report-accordion-header"
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px' }}>
          🔮 {isReportOpen ? '🔓' : '🔒'} AI 우주 궁합 & 정밀 동선 리포트 {isReportOpen ? '(클릭하여 접기)' : '(클릭하여 펼치기)'}
        </span>
        <svg 
          style={{ transform: isReportOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'var(--text-muted)' }} 
          xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {isReportOpen && (
        <div className="report-accordion-content" style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease-out' }}>
          
          {/* 🔮 Couple Chemistry Indicators (궁합 연산 매칭 리포트) */}
          <div className="couple-chemistry-report-box" style={{ marginBottom: '24px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔮 우주 궁합 매칭 분석서 <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-muted)' }}>Couples Synergy Report</span>
            </h4>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              남성(<strong>{boyfriendMbti}</strong>) 성향 벡터와 여성(<strong>{girlfriendMbti}</strong>) 성향 벡터를 실시간 공간 매칭과 가중 조율한 분석서입니다.
            </p>

            {/* 4 Comp bars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              
              <div className="comp-bar-col">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px', fontWeight: 700 }}>
                  <span style={{ color: 'var(--accent-pink)' }}>💬 대화 궤도 일치도 (E/I)</span>
                  <span style={{ color: 'white' }}>{compMetrics.comm}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${compMetrics.comm}%`, background: 'var(--accent-pink)', height: '100%', borderRadius: '3px', boxShadow: '0 0 8px var(--accent-pink)' }}></div>
                </div>
              </div>

              <div className="comp-bar-col">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px', fontWeight: 700 }}>
                  <span style={{ color: 'var(--accent-blue)' }}>🎨 체험 템포 동기화 (S/N)</span>
                  <span style={{ color: 'white' }}>{compMetrics.tempo}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${compMetrics.tempo}%`, background: 'var(--accent-blue)', height: '100%', borderRadius: '3px', boxShadow: '0 0 8px var(--accent-blue)' }}></div>
                </div>
              </div>

              <div className="comp-bar-col">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px', fontWeight: 700 }}>
                  <span style={{ color: 'var(--accent-yellow)' }}>💖 로맨스 주파수 공명 (T/F)</span>
                  <span style={{ color: 'white' }}>{compMetrics.romance}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${compMetrics.romance}%`, background: 'var(--accent-yellow)', height: '100%', borderRadius: '3px', boxShadow: '0 0 8px var(--accent-yellow)' }}></div>
                </div>
              </div>

              <div className="comp-bar-col">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px', fontWeight: 700 }}>
                  <span style={{ color: '#55d6be' }}>📅 동선 탄력성 융합 (J/P)</span>
                  <span style={{ color: 'white' }}>{compMetrics.path}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${compMetrics.path}%`, background: '#55d6be', height: '100%', borderRadius: '3px', boxShadow: '0 0 8px #55d6be' }}></div>
                </div>
              </div>

            </div>

            {/* Tip text */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              ✨ <strong>궁합 밀착 조율 팁:</strong> {getCompatibilityTip()}
            </div>
          </div>

          {/* Dynamic fatigue commentary */}
          <div 
            className="algo-commentary-box" 
            dangerouslySetInnerHTML={{ __html: commentaryHtml }}
            style={{ 
              filter: (isRolling || isCatalystRolling) ? 'blur(2px)' : 'none', 
              transition: 'all 0.3s',
              borderTop: '1px dashed rgba(255,255,255,0.1)',
              paddingTop: '20px',
              marginTop: '20px'
            }}
          />
        </div>
      )}
    </div>
  );
}
