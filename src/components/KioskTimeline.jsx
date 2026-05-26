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

const CATALYST_KEYS = ['dopamine', 'oxytocin', 'spark', 'telepathy', 'lucky'];

const formatCurrency = (value) => `₩${Number(value || 0).toLocaleString()}`;

const getPlanet = (planetName) => PLANETS[planetName] || {
  name: planetName || '추천 테마',
  desc: '오늘 조건에 맞춘 데이트 테마입니다.',
  color: 'var(--sf-sky)',
  sponsor: 'Starfield Suwon',
  iconKey: 'calm'
};

function TimelineNode({ order, label, place, planetName }) {
  const planet = getPlanet(planetName);

  return (
    <article className="timeline-node">
      <div className="node-dot" style={{ borderColor: planet.color, color: planet.color }}>{order}</div>
      <div className="node-header">
        <span className="node-title">
          <span style={{ color: planet.color }}>{ICONS[planet.iconKey]}</span>
          {label}
        </span>
        <span className="badge-sponsor-timeline">{planet.sponsor}</span>
      </div>
      <p className="node-theme-copy">{planet.desc}</p>
      <div className="node-meta">
        <strong>추천 매장: {place.name}</strong>
        <p>{place.desc}</p>
        <div className="node-meta-row">
          <span>2인 기준 {formatCurrency(place.cost * 2)}</span>
          <span>{place.floor}층</span>
          <span>#{place.tag}</span>
        </div>
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
  onRecalculate,
  randomFn = Math.random
}) {
  const [isRolling, setIsRolling] = useState(false);
  const [justRolled, setJustRolled] = useState(false);
  const [tempCatalyst, setTempCatalyst] = useState(null);
  const [isCatalystRolling, setIsCatalystRolling] = useState(false);

  if (!selectedRestaurant || !selectedCafe || !selectedActivity) return null;

  const activeCatalyst = tempCatalyst || catalyst;
  const catalystInfo = getCatalystDetail(activeCatalyst);
  const perPersonTotal = selectedRestaurant.cost + selectedCafe.cost + selectedActivity.cost;

  const handleCourseRoll = () => {
    if (isRolling || isCatalystRolling) return;
    setIsRolling(true);
    setJustRolled(false);
    playSFX('roll');

    window.setTimeout(() => {
      onRecalculate();
      setIsRolling(false);
      setJustRolled(true);
      playSFX('success');

      window.setTimeout(() => setJustRolled(false), 800);
    }, 650);
  };

  const handleCatalystRoll = () => {
    if (isCatalystRolling || isRolling) return;
    setIsCatalystRolling(true);
    setTempCatalyst(null);
    playSFX('roll');

    let count = 0;
    const interval = window.setInterval(() => {
      setTempCatalyst(CATALYST_KEYS[count % CATALYST_KEYS.length]);
      count += 1;
    }, 90);

    window.setTimeout(() => {
      window.clearInterval(interval);
      const safeRandom = Math.max(0, Math.min(0.999999, Number(randomFn())));
      const finalCatalyst = CATALYST_KEYS[Math.floor(safeRandom * CATALYST_KEYS.length)];
      setTempCatalyst(null);
      onCatalystChange(finalCatalyst);
      setIsCatalystRolling(false);
      setJustRolled(true);
      playSFX('success');
      window.setTimeout(() => setJustRolled(false), 800);
    }, 650);
  };

  const isBusy = isRolling || isCatalystRolling;

  return (
    <section className={`premium-card route-detail-card ${justRolled ? 'fate-flash' : ''}`} aria-labelledby="route-detail-title">
      <div className="score-badge-container">
        <div>
          <span className="section-kicker">DETAIL</span>
          <h3 id="route-detail-title" className="score-title">상세 동선</h3>
        </div>

        <div className="orbit-control-row">
          <button
            type="button"
            onClick={handleCatalystRoll}
            disabled={isBusy}
            className={`compact-orbit-button ${isCatalystRolling ? 'pulse-btn' : ''}`}
          >
            {isCatalystRolling ? '분위기 선택 중...' : '분위기 랜덤 선택'}
          </button>

          <button
            type="button"
            onClick={handleCourseRoll}
            disabled={isBusy}
            className="compact-orbit-button border-beam-btn"
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
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            {isRolling ? '추천 중...' : '코스 다시 추천'}
          </button>

          <span className="catalyst-chip" style={{ borderColor: catalystInfo.color, color: catalystInfo.color }}>
            {catalystInfo.label}
          </span>
          <span className="score-val">{matchRate}% Match</span>
        </div>
      </div>

      <div className="catalyst-description">{catalystInfo.desc}</div>

      <div className="metrics-row">
        <div className="metric-col">
          <div className="metric-label">총 비용</div>
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

      <div className="custom-timeline" data-busy={isBusy ? 'true' : 'false'}>
        <TimelineNode order={1} label="식사" place={selectedRestaurant} planetName={planetOrder[0]} />
        <TimelineNode order={2} label="카페" place={selectedCafe} planetName={planetOrder[1]} />
        <TimelineNode order={3} label="액티비티" place={selectedActivity} planetName={planetOrder[2]} />
      </div>
    </section>
  );
}
