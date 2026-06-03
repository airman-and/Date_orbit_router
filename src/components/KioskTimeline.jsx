import { useState } from 'react';
import { PLANETS } from '../data/places';
import { getCatalystDetail } from '../domain/dateOrbit';
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

const catalystsList = [
  { key: 'dopamine', label: "💥 도파민", color: "#c678ff" },
  { key: 'oxytocin', label: "🧸 옥시토신", color: "#55d6be" },
  { key: 'spark', label: "⚡ 스파크", color: "#ff758c" },
  { key: 'telepathy', label: "🔮 텔레파시", color: "#3bd1ff" },
  { key: 'lucky', label: "🎲 럭키", color: "#ffd23f" }
];

const formatCurrency = (value) => `₩${Number(value || 0).toLocaleString()}`;

const getPlanet = (planetName) => PLANETS[planetName] || {
  name: planetName || '추천 테마',
  desc: '오늘 조건에 맞춘 데이트 테마입니다.',
  color: 'var(--sf-sky)',
  sponsor: 'Starfield Suwon',
  iconKey: 'calm'
};

function TimelineNode({ order, place, planetName }) {
  const planet = getPlanet(planetName);
  const tagColor = planet.color;

  return (
    <article className="timeline-node">
      <div className="node-dot" style={{ borderColor: planet.color, color: planet.color }}>{order}</div>
      <div className="node-header">
        <span className="node-title">
          <span style={{ color: planet.color }}>{ICONS[planet.iconKey]}</span>
          {planet.name}
        </span>
        <span className="badge-sponsor-timeline">Sponsor: {planet.sponsor}</span>
      </div>
      <p className="node-theme-copy">{planet.desc}</p>
      <div className="node-meta">
        <strong>📍 {order}단계 코스: {place.name}</strong>
        <p style={{ marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{place.desc}</p>
        <div className="node-meta-row" style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '6px' }}>
          <span>2인 기준 {formatCurrency(place.cost * 2)}</span>
          <span>{place.floor}층</span>
          <span>#{place.tag}</span>
        </div>

        {/* Couple Action Mission Card Component */}
        {place.mission && (
          <div 
            style={{
              marginTop: '12px',
              background: `${tagColor}08`,
              border: `1px dashed ${tagColor}40`,
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              lineHeight: 1.4
            }}
          >
            <span style={{ color: tagColor, fontWeight: 800, display: 'inline-block', marginBottom: '2px' }}>🧭 커플 액션 미션(Mission):</span>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{place.mission}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function KioskTimeline({
  selectedRestaurant,
  selectedCafe,
  selectedActivity,
  totalBudgetSpent,
  budgetInput,
  planetOrder,
  domainBadge,
  badgeClass,
  matchRate,
  catalyst,
  onCatalystChange,
  boyfriendMbti,
  girlfriendMbti,
  mealStatus = 'hungry'
}) {
  if (!selectedRestaurant || !selectedCafe || !selectedActivity) return null;

  const catalystInfo = getCatalystDetail(catalyst);
  const perPersonTotal = selectedRestaurant.cost + selectedCafe.cost + selectedActivity.cost;

  const handleCatalystClick = (key) => {
    if (catalyst === key) {
      onCatalystChange(null); // Toggle off
    } else {
      onCatalystChange(key);
      playSFX('success');
    }
  };

  return (
    <section className="premium-card route-detail-card" aria-labelledby="route-detail-title">
      
      {/* 🧪 Destiny Catalyst Direct Selection Deck */}
      <div className="destiny-catalyst-panel" style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '18px', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--sf-pink)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Cosmic Chemistry Catalyst Selector
          </span>
          <h4 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
            🧪 <span style={{ color: catalystInfo.color, textShadow: `0 0 10px ${catalystInfo.color}30` }}>
              {catalyst ? `${catalystInfo.label} 주입됨` : '감정 촉매제 선택 대기 중'}
            </span>
          </h4>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
            {catalystInfo.desc}
          </p>
        </div>

        {/* Catalyst Buttons Row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
          {catalystsList.map(catItem => {
            const isSelected = catalyst === catItem.key;
            return (
              <button
                key={catItem.key}
                onClick={() => handleCatalystClick(catItem.key)}
                style={{
                  background: isSelected ? `${catItem.color}15` : 'rgba(255,255,255,0.02)',
                  border: `1.5px solid ${isSelected ? catItem.color : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '0.76rem',
                  color: isSelected ? 'white' : 'var(--text-secondary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 0 12px ${catItem.color}25` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                {catItem.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="score-badge-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="section-kicker">DETAIL</span>
          <h3 id="route-detail-title" className="score-title">단 하나의 최적 궤도 타임라인</h3>
        </div>

        <div className="orbit-control-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div 
            style={{
              background: 'rgba(255, 90, 121, 0.08)',
              border: '1.5px solid var(--sf-pink)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.78rem',
              color: 'white',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 10px rgba(255, 90, 121, 0.15)',
              letterSpacing: '0.5px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            🔒 알고리즘 확정됨
          </div>
          <span className="score-val">{matchRate}% Match</span>
        </div>
      </div>

      {/* 📣 트렌드 선언형 타겟 카피 배너 */}
      <div className="declarative-target-banner" style={{
        margin: '20px 0',
        padding: '16px 20px',
        background: mealStatus === 'full' ? 'rgba(255, 146, 51, 0.08)' : 'rgba(85, 214, 190, 0.08)',
        borderLeft: `4px solid ${mealStatus === 'full' ? '#FF9233' : '#55D6BE'}`,
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.92rem',
          lineHeight: 1.5,
          color: '#ffffff',
          fontWeight: 700,
          letterSpacing: '0.3px'
        }}>
          {mealStatus === 'full' 
            ? "📣 오늘 그냥 가기 아쉽지 않아? 요즘 커플들은 영화 보고 꼭 여기서 서로 취향 인증하더라. 우리도 가볼까?" 
            : "📣 영화 끝났어? 팝콘으로 안 채워진 얘기는 여기서 마저 해야지. 요즘 다들 영화 보고 여기 가던데?"
          }
        </p>
        <span style={{
          position: 'absolute',
          right: '12px',
          bottom: '4px',
          fontSize: '0.6rem',
          fontWeight: 800,
          opacity: 0.15,
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Early Couple Trend Guide
        </span>
      </div>

      <div className="metrics-row" style={{ marginTop: '20px' }}>
        <div className="metric-col">
          <div className="metric-label">총 비용 (2인)</div>
          <div className="metric-val">{formatCurrency(totalBudgetSpent)}</div>
        </div>
        <div className="metric-col">
          <div className="metric-label">1인 비용</div>
          <div className="metric-val">{formatCurrency(perPersonTotal)} / {formatCurrency(budgetInput)}</div>
        </div>
        <div className="metric-col">
          <div className="metric-label">코스 구역</div>
          <div className="metric-val"><span className={`badge ${badgeClass}`}>{domainBadge}</span></div>
        </div>
      </div>

      <div className="custom-timeline" style={{ marginTop: '24px' }}>
        <TimelineNode order={1} place={selectedRestaurant} planetName={planetOrder[0]} />
        <TimelineNode order={2} place={selectedCafe} planetName={planetOrder[1]} />
        <TimelineNode order={3} place={selectedActivity} planetName={planetOrder[2]} />
      </div>

      {/* 🏷️ 연속적 브랜드 노출 (맥락적 패키지 광고) */}
      <div className="co-branded-package-ad" style={{
        marginTop: '28px',
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(255, 90, 121, 0.08) 0%, rgba(255, 146, 51, 0.08) 100%)',
        border: '1.5px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #FF5A79, #FF9233)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🔥 요즘 대세 트렌드 코스 패키지
          </span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Sponsored Ad</span>
        </div>

        <h4 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 800, margin: '0 0 10px 0', lineHeight: 1.4 }}>
          {mealStatus === 'hungry' 
            ? "🎬 영화 직후 여운 200% 정복 패키지" 
            : "🛍️ 데이트 텐션 밀착 보장 연장선 패키지"
          }
        </h4>

        {/* Dynamic Route Flow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '12px 14px',
          borderRadius: '10px',
          margin: '12px 0',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: '#55D6BE', fontWeight: 700, fontSize: '0.82rem' }}>
            [{selectedRestaurant.name.split(' (')[0]}]
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>➔</span>
          <span style={{ color: '#FF9233', fontWeight: 700, fontSize: '0.82rem' }}>
            [{selectedCafe.name.split(' (')[0]}]
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>➔</span>
          <span style={{ color: '#FF5A79', fontWeight: 700, fontSize: '0.82rem' }}>
            [{selectedActivity.name.split(' (')[0]}]
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.76rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
          {mealStatus === 'hungry'
            ? `초기 커플의 대세 공식! [${selectedRestaurant.name.split(' (')[0]}]에서 여운을 나눈 뒤 [${selectedCafe.name.split(' (')[0]}] 소품 구경으로 친밀도를 넓히고, 마지막으로 [${selectedActivity.name.split(' (')[0]}]에서 인증샷을 박제해 서로를 기록해 보세요.`
            : `이것이 요즘 커플 연장 공식! [${selectedRestaurant.name.split(' (')[0]}]에서 취향을 교감하고 [${selectedCafe.name.split(' (')[0]}]에서 관계의 마무리를 박제한 뒤, 아쉬운 마음은 [${selectedActivity.name.split(' (')[0]}]에서 달콤한 음료와 함께 털어내는 것이 요즘 트렌드 대세!`
          }
        </p>

        {/* Coupon Mockup */}
        <div style={{
          marginTop: '14px',
          borderTop: '1px dashed rgba(255,255,255,0.1)',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.74rem', color: '#ffb3c1', fontWeight: 700 }}>
            🎁 패키지 전용 연계 할인 10% 쿠폰 탑재
          </span>
          <button style={{
            background: 'white',
            border: 'none',
            color: '#1a1a1a',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.7rem',
            fontWeight: 800,
            cursor: 'pointer'
          }} onClick={() => { playSFX('success'); alert('스타필드 수원 입점 브랜드 연계 10% 패키지 쿠폰이 발급되었습니다!'); }}>
            받기
          </button>
        </div>
      </div>
    </section>
  );
}
