import React, { useState, useEffect, useMemo } from 'react';
import { STARFIELD_STORES, PLANETS } from './data/places';
import { useDateOrbit, getDeterministicOrbit, getCoupleMbti } from './hooks/useDateOrbit';
import { playSFX } from './utils/sfx';

// Import modular components
import BalanceGame from './components/BalanceGame';
import OrbitVisualizer from './components/OrbitVisualizer';
import MbtiRadarChart from './components/MbtiRadarChart';
import KioskTimeline from './components/KioskTimeline';
import StoreMapGuide from './components/StoreMapGuide';
import CouponWalletModal from './components/CouponWalletModal';

export default function App() {
  // ==========================================================================
  // [STATE DECLARATIONS]
  // ==========================================================================
  const [step, setStep] = useState(0); // 0: onboarding, 1: loading, 2: results
  const [onboardingMode, setOnboardingMode] = useState('game');
  
  // Dual Quiz State Control
  const [gameStep, setGameStep] = useState(0);
  const [gameTurn, setGameTurn] = useState('boyfriend'); // 'boyfriend', 'girlfriend', 'complete'
  const [bfAnswers, setBfAnswers] = useState({ q1: 'A', q2: 'A', q3: 'B', q4: 'A' });
  const [gfAnswers, setGfAnswers] = useState({ q1: 'B', q2: 'B', q3: 'A', q4: 'B' });

  // Core Kiosk inputs
  const [boyfriendMbti, setBoyfriendMbti] = useState('INFJ');
  const [girlfriendMbti, setGirlfriendMbti] = useState('ENFP');
  const [budgetInput, setBudgetInput] = useState(100000);
  const [dateType, setDateType] = useState('1. 설렘 반 어색 반 (초기 커플)');
  const [zonePreference, setZonePreference] = useState('스타필드 수원 올인원 몰링 코스 (실내)');

  // Environmental Physics Simulator States
  const [weather, setWeather] = useState('sunny'); // 'sunny', 'rainy', 'cold'
  const [crowd, setCrowd] = useState('normal'); // 'quiet', 'normal', 'peak'

  // Customized drag-swapped planet order
  const [planetOrder, setPlanetOrder] = useState([]);

  // Destiny Chemistry Catalyst State
  const [catalyst, setCatalyst] = useState(null);

  // Store Directory Guide Drawer States
  const [expanderOpen, setExpanderOpen] = useState(false);
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryCatFilter, setDirectoryCatFilter] = useState('전체보기');

  // Interactive 3D Wallet Coupon Modal States
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  // Initialize custom calculation hook
  const {
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    totalBudgetSpent,
    calculateCourse
  } = useDateOrbit();

  // Sync game answers to MBTIs
  useEffect(() => {
    if (onboardingMode === 'game' && gameTurn === 'complete') {
      const char1 = bfAnswers.q1 === 'A' ? 'E' : 'I';
      const char2 = bfAnswers.q2 === 'A' ? 'S' : 'N';
      const char3 = bfAnswers.q3 === 'A' ? 'T' : 'F';
      const char4 = bfAnswers.q4 === 'A' ? 'J' : 'P';
      setBoyfriendMbti(`${char1}${char2}${char3}${char4}`);

      const char1_g = gfAnswers.q1 === 'A' ? 'E' : 'I';
      const char2_g = gfAnswers.q2 === 'A' ? 'S' : 'N';
      const char3_g = gfAnswers.q3 === 'A' ? 'T' : 'F';
      const char4_g = gfAnswers.q4 === 'A' ? 'J' : 'P';
      setGirlfriendMbti(`${char1_g}${char2_g}${char3_g}${char4_g}`);
    }
  }, [bfAnswers, gfAnswers, gameTurn, onboardingMode]);

  // Sync initial planet order on first routing or reset
  useEffect(() => {
    if (step === 2 && planetOrder.length === 0) {
      const couple = getCoupleMbti(boyfriendMbti, girlfriendMbti);
      setPlanetOrder(getDeterministicOrbit(couple));
    }
  }, [step, boyfriendMbti, girlfriendMbti]);

  // Perform greedy path calculations
  const triggerCalculation = (orderOverride = null, catalystOverride = undefined) => {
    const activeCatalyst = catalystOverride !== undefined ? catalystOverride : catalyst;
    calculateCourse(
      boyfriendMbti,
      girlfriendMbti,
      budgetInput,
      dateType,
      zonePreference,
      weather,
      crowd,
      orderOverride || planetOrder,
      activeCatalyst
    );
  };

  // Recalculate on input parameters change
  useEffect(() => {
    if (step === 2) {
      triggerCalculation();
    }
  }, [boyfriendMbti, girlfriendMbti, budgetInput, dateType, zonePreference, weather, crowd, catalyst]);

  // Recalculate on planet swap
  const handlePlanetOrderChange = (newOrder) => {
    setPlanetOrder(newOrder);
    triggerCalculation(newOrder);
  };

  // Onboarding loading countdown trigger
  const handleStartCalculations = () => {
    playSFX('click');
    setStep(1); // Mount loading page
    const couple = getCoupleMbti(boyfriendMbti, girlfriendMbti);
    const initialOrder = getDeterministicOrbit(couple);
    setPlanetOrder(initialOrder);
    
    // Simulate 3s calculation countdown
    setTimeout(() => {
      calculateCourse(
        boyfriendMbti,
        girlfriendMbti,
        budgetInput,
        dateType,
        zonePreference,
        weather,
        crowd,
        initialOrder,
        null
      );
      setStep(2);
      playSFX('success');
    }, 3000);
  };

  const handleReset = () => {
    playSFX('click');
    setStep(0);
    setGameStep(0);
    setGameTurn('boyfriend');
    setBfAnswers({ q1: 'A', q2: 'A', q3: 'B', q4: 'A' });
    setGfAnswers({ q1: 'B', q2: 'B', q3: 'A', q4: 'B' });
    setPlanetOrder([]);
    setCatalyst(null);
  };

  // ==========================================================================
  // [COMMENTARY & METRICS MATRIX LOGIC]
  // ==========================================================================
  const { matchRate, commentaryHtml, domainBadge, badgeClass } = useMemo(() => {
    let currentMatchRate = 85;
    let currentCommentaryHtml = "";
    
    const isS = selectedRestaurant?.space_type === "Starfield_Suwon" && 
                 selectedCafe?.space_type === "Starfield_Suwon" && 
                 selectedActivity?.space_type === "Starfield_Suwon";
    const currentDomainBadge = isS ? "실내 올인원 몰링 (스타필드 수원)" : "야외 & 로드 코스 투어";
    const currentBadgeClass = isS ? "badge-starfield" : "badge-external";

    if (selectedRestaurant && selectedCafe && selectedActivity) {
      const couple = getCoupleMbti(boyfriendMbti, girlfriendMbti);
      
      // Calculate total score average
      const sc1 = selectedRestaurant.cost <= budgetInput ? 30.0 : -999;
      const sc2 = selectedCafe.cost <= budgetInput ? 30.0 : -999;
      const sc3 = selectedActivity.cost <= budgetInput ? 30.0 : -999;
      const avg = (sc1 + sc2 + sc3) / 3;
      currentMatchRate = Math.max(75, Math.min(99, Math.round(avg * 1.2 + 55)));

      currentCommentaryHtml += `<strong>💝 오늘 두 분의 데이트 궤도 연산 총평:</strong><br/>`;
      
      // Weather Commentary
      if (weather === 'rainy') {
        currentCommentaryHtml += `🌧️ <strong>날씨 피로 경보 [우천]:</strong> 실외 습도 및 대기 마찰이 매우 높은 날씨입니다. 궤도 엔진이 밖으로 탈출하는 동선 페널티를 대폭 상향 조정하여, 층간 유기적 통로로만 안전하게 회전하는 <strong>초밀착 실내 에코 몰링 플로우</strong>를 최적화 설계했습니다.<br/>`;
      } else if (weather === 'cold') {
        currentCommentaryHtml += `❄️ <strong>날씨 피로 경보 [한파]:</strong> 영하권 강풍 피로도가 심한 날입니다. 따뜻한 온기가 순환하는 <strong>Starfield Suwon 돔 내부 궤도</strong>를 압축 매핑하여 동선 에너지를 200% 보존했습니다.<br/>`;
      } else {
        currentCommentaryHtml += `☀️ <strong>기후 상태 [쾌적]:</strong> 맑고 쾌적한 데이트 기온입니다. 실내외 자유로운 궤도 이탈 이동성이 완벽 보장됩니다.<br/>`;
      }

      // Crowd Commentary
      if (crowd === 'peak') {
        currentCommentaryHtml += `🎪 <strong>인파 밀도 경보 [피크 타임]:</strong> 쇼핑몰 내 유동 인구와 엘리베이터 혼잡 마찰이 매우 심한 시간대입니다. 인기 예약제 스팟의 대기 피로가 가중되는 점을 계산하여, 불필요한 이동 층수를 최소화하고 웨이팅이 비교적 안정적인 <strong>숨은 명소 및 하이브리드 코스</strong>를 긴급 융합 배치했습니다.<br/>`;
      }

      if (isS) {
        const floors = [selectedRestaurant.floor, selectedCafe.floor, selectedActivity.floor];
        const maxF = Math.max(...floors);
        const minF = Math.min(...floors);
        const floorDiff = maxF - minF;
        currentCommentaryHtml += `<br/>본 동선은 바깥 날씨 요소를 일절 배제한 <strong>초압축 실내 수직적 궤도 플로우</strong>입니다.<br/>`;
        if (floorDiff === 0) {
          currentCommentaryHtml += `식사부터 카페, 액티비티 궤도까지 전부 동일한 <strong>${maxF}층</strong>에서 마무리되어, 층간 동선 피로가 완벽한 <strong>제로(0)</strong>입니다!`;
        } else {
          currentCommentaryHtml += `식사는 <strong>${selectedRestaurant.floor}층</strong>, 카페는 <strong>${selectedCafe.floor}층</strong>, 액티비티는 <strong>${selectedActivity.floor}층</strong>으로 이어지는 경로입니다. 층간 유기적 에스컬레이터 이동을 계산하여, 불필요하게 층이 꼬이지 않도록 부드럽게 세팅되었습니다.`;
        }
      } else {
        const dist1 = Math.sqrt(Math.pow(selectedRestaurant.lat - selectedCafe.lat, 2) + Math.pow(selectedRestaurant.lng - selectedCafe.lng, 2)) * 100;
        const dist2 = Math.sqrt(Math.pow(selectedCafe.lat - selectedActivity.lat, 2) + Math.pow(selectedCafe.lng - selectedActivity.lng, 2)) * 100;
        const totalDist = Math.round((dist1 + dist2) * 10) / 10;
        currentCommentaryHtml += `<br/>각 스팟을 부드럽게 걸어 다니는 <strong>아웃도어 스트리트 투어 궤도</strong>입니다.<br/>`;
        currentCommentaryHtml += `총 이동 수평거리 약 <strong>${totalDist}m</strong>로 연산되었으며, 복잡하지 않고 아늑하고 분위기 높은 성곽길 혹은 연트럴 감성을 편안하게 만끽할 수 있는 코스입니다.`;
      }

      currentCommentaryHtml += `<br/><br/><strong>🧠 2030 커플 맞춤형 MBTI 조율 피드백 (${dateType}):</strong><br/>`;
      if (couple.E_I < 0.4) {
        currentCommentaryHtml += `• <strong>내향적 교감 앵커링:</strong> 주변의 소란스럽고 오픈된 영역을 배제하고, 둘만의 음악 감상 LP 헤드폰 공유, 조용한 구석진 다이닝 공간을 궤도에 매핑하여 친밀도를 극대화 충전하도록 돕습니다.`;
      } else {
        currentCommentaryHtml += `• <strong>외향적 에너지 핫플레이스:</strong> 활기찬 철판 오픈 키친 핫플 및 짜릿한 실내 스포츠 스몹 라인을 중심으로, 매 순간 지루하지 않게 신나는 텐션이 지속되도록 유도했습니다.`;
      }

      if (couple.J_P < 0.4) {
        currentCommentaryHtml += `<br/>• <strong>즉흥형(P) 유연성 대책:</strong> 사전 조율이나 시간 한정에 걸리지 않는 워크인 중심 매장을 우선 배치하여 즉흥적인 감정적 동선으로 변동하더라도 높은 만족을 느낄 수 있게 공간 탄력성을 제공했습니다.`;
      } else {
        currentCommentaryHtml += `<br/>• <strong>계획형(J) 안정적 사전확정:</strong> 사전 예약제 캐주얼 다이닝과 원데이 클래스처럼 미리 타임라인이 조율되어 일탈 스트레스가 없도록 궤도 순서를 설계했습니다.`;
      }
    }

    return {
      matchRate: currentMatchRate,
      commentaryHtml: currentCommentaryHtml,
      domainBadge: currentDomainBadge,
      badgeClass: currentBadgeClass
    };
  }, [
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    boyfriendMbti,
    girlfriendMbti,
    budgetInput,
    dateType,
    weather,
    crowd
  ]);

  // Filtered store guide mapping
  const filteredStores = useMemo(() => {
    let list = [];
    for (const [cat, stores] of Object.entries(STARFIELD_STORES)) {
      if (directoryCatFilter !== '전체보기' && cat !== directoryCatFilter) continue;
      stores.forEach(s => {
        if (directorySearch.trim() !== '') {
          const q = directorySearch.toLowerCase();
          if (s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.zone.toLowerCase().includes(q) || cat.includes(q)) {
            list.push({ cat, ...s });
          }
        } else {
          list.push({ cat, ...s });
        }
      });
    }
    return list;
  }, [directoryCatFilter, directorySearch]);

  const handleGameSelect = (qKey, optionVal) => {
    if (gameTurn === 'boyfriend') {
      setBfAnswers(prev => ({ ...prev, [qKey]: optionVal }));
      if (gameStep === 3) {
        setGameStep(0);
        setGameTurn('girlfriend');
      } else {
        setGameStep(prev => prev + 1);
      }
    } else if (gameTurn === 'girlfriend') {
      setGfAnswers(prev => ({ ...prev, [qKey]: optionVal }));
      if (gameStep === 3) {
        setGameTurn('complete');
      } else {
        setGameStep(prev => prev + 1);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Cosmic 3-Layer Parallax Twinkling Background Wrapper */}
      <div className="space-nebula-wrapper">
        <div className="nebula nebula-pink"></div>
        <div className="nebula nebula-blue"></div>
        <div className="starsstars stars-1"></div>
        <div className="starsstars stars-2"></div>
        <div className="starsstars stars-3"></div>
      </div>
      {/* ======================================================================
          [🎯 SILENT / ACTIVE SIDEBAR CONSOLE]
          ====================================================================== */}
      <aside className="app-sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🌌 ORBIT CONSOLE
          </h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>실시간 감성 궤도 조절 콘솔</p>
        </div>

        {step === 2 ? (
          <div className="sidebar-form">
            <div className="sidebar-field">
              <label>👦 남자친구 MBTI</label>
              <input 
                type="text" 
                value={boyfriendMbti} 
                onChange={(e) => setBoyfriendMbti(e.target.value.toUpperCase())}
                placeholder="예: INFJ"
              />
            </div>
            <div className="sidebar-field">
              <label>👧 여자친구 MBTI</label>
              <input 
                type="text" 
                value={girlfriendMbti} 
                onChange={(e) => setGirlfriendMbti(e.target.value.toUpperCase())}
                placeholder="예: ENFP"
              />
            </div>
            <div className="sidebar-field">
              <label>💵 인당 최대 데이트 예산</label>
              <select value={budgetInput} onChange={(e) => setBudgetInput(Number(e.target.value))}>
                <option value={15000}>15,000원</option>
                <option value={30000}>30,000원</option>
                <option value={50000}>50,000원</option>
                <option value={75000}>75,000원</option>
                <option value={100000}>100,000원</option>
                <option value={150000}>150,000원</option>
                <option value={200000}>200,000원</option>
                <option value={300000}>300,000원</option>
              </select>
            </div>
            <div className="sidebar-field">
              <label>🎬 시추에이션 프리셋</label>
              <select value={dateType} onChange={(e) => setDateType(e.target.value)}>
                <option value="1. 설렘 반 어색 반 (초기 커플)">1. 설렘 반 어색 반 (초기 커플)</option>
                <option value="2. 인스타 하이라이트 (트렌드 세터)">2. 인스타 하이라이트 (트렌드 세터)</option>
                <option value="3. 만사 귀찮음 (릴랙스 힐링)">3. 만사 귀찮음 (릴랙스 힐링)</option>
                <option value="4. 파이팅 넘치는 (이색 도전)">4. 파이팅 넘치는 (이색 도전)</option>
              </select>
            </div>
            <div className="sidebar-field">
              <label>🏢 궤도 공간 토폴로지</label>
              <div className="sidebar-radio-group">
                <label className="sidebar-radio-option">
                  <input 
                    type="radio" 
                    name="sidebar-topo-2" 
                    checked={zonePreference === '스타필드 수원 올인원 몰링 코스 (실내)'} 
                    onChange={() => setZonePreference('스타필드 수원 올인원 몰링 코스 (실내)')}
                  />
                  실내 올인원 코스
                </label>
                <label className="sidebar-radio-option">
                  <input 
                    type="radio" 
                    name="sidebar-topo-2" 
                    checked={zonePreference === '스트리트형 아웃도어 & 로드 코스 (야외)'} 
                    onChange={() => setZonePreference('스트리트형 아웃도어 & 로드 코스 (야외)')}
                  />
                  야외 스트리트 코스
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="sidebar-info">
            💡 데이트 성향 및 예산 세팅은 메인 화면의 키오스크 패널에서 완료할 수 있습니다. 궤도가 생성되면 이곳에 실시간 조절 패널이 활성화됩니다.
          </div>
        )}

        {/* Sidebar Fixed Ad Panel */}
        <div className="sidebar-ad-card">
          <div className="sidebar-ad-label">SPONSOR MATCH</div>
          <div className="sidebar-ad-title">TAMBURINS CHINGE-ME</div>
          <p className="sidebar-ad-desc">“설렘 행성”이 어울리는 당신을 위한 바디 워시 & 향수 패키지 기획전.</p>
          <a href="#" className="sidebar-ad-link" onClick={(e) => e.preventDefault()}>자세히 보기 →</a>
        </div>
      </aside>

      {/* ======================================================================
          [🌌 MAIN INTERACTIVE WORKSPACE]
          ====================================================================== */}
      <main className="main-content">
        {/* Header Display */}
        <div className="title-container">
          <h1 className="main-title">🌌 DATE ORBIT ROUTER</h1>
          <p className="sub-title">영화 관람 직후, 두 사람에게 가장 어울리는 오늘의 감성 궤도 코스를 추천해 드립니다.</p>
        </div>

        {/* Co-branded Header Banner Placeholder */}
        <div className="kiosk-banner-placeholder">
          <div className="kiosk-banner-text-1">GALAXY S26 ULTRA</div>
          <div className="kiosk-banner-text-2">오늘의 아름다운 감성 순간을 우주적인 줌 렌즈로 담아보세요</div>
        </div>

        {/* Step Indicator */}
        {step !== 1 && (
          <div className="wizard-steps">
            <div className={`wizard-step-item ${step === 0 ? 'active' : 'completed'}`}>
              <div className="wizard-num">1</div> 커플 성향 & 데이트 분위기 선택
            </div>
            <div className="wizard-divider"></div>
            <div className={`wizard-step-item ${step === 2 ? 'active' : ''}`}>
              <div className="wizard-num">2</div> 오늘의 다음 데이트 궤도 산출
            </div>
          </div>
        )}

        {/* ======================================================================
            [PHASE 0: ONBOARDING ENGINE (STEP 0)]
            ====================================================================== */}
        {step === 0 && (
          <BalanceGame 
            gameStep={gameStep}
            gameTurn={gameTurn}
            onGameSelect={handleGameSelect}
            onReset={handleReset}
            boyfriendMbti={boyfriendMbti}
            girlfriendMbti={girlfriendMbti}
            onBoyfriendChange={setBoyfriendMbti}
            onGirlfriendChange={setGirlfriendMbti}
            onboardingMode={onboardingMode}
            onOnboardingModeChange={setOnboardingMode}
            budgetInput={budgetInput}
            onBudgetChange={setBudgetInput}
            dateType={dateType}
            onDateTypeChange={setDateType}
            zonePreference={zonePreference}
            onZonePreferenceChange={setZonePreference}
            onStart={handleStartCalculations}
          />
        )}

        {/* ======================================================================
            [PHASE 1: SPONSORED LOADING SCREEN (STEP 1)]
            ====================================================================== */}
        {step === 1 && (
          <div className="premium-card" style={{ marginTop: '20px' }}>
            <div className="loading-container">
              <div className="cosmic-spinner">
                <div className="orbit-ring ring-1"></div>
                <div className="orbit-ring ring-2"></div>
                <div className="orbit-ring ring-3"></div>
                <div className="core-planet"></div>
              </div>
              <h2 className="loading-title">두 분만을 위한 시뮬레이션 데이트 궤도를 조율 중입니다...</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '24px' }}>
                커플의 MBTI, 당일 날씨 피로도, 동선 최적 분기를 매핑하고 있습니다.
              </p>
              
              {/* Sponsored Loading Ad block */}
              <div className="ad-loading-box" style={{ marginBottom: '32px' }}>
                <div className="ad-loading-badge">SPONSORED ORBIT</div>
                <div className="ad-loading-brand">TAMBURINS</div>
                <div className="ad-loading-copy">
                  “오늘 두 분의 설렘 궤도는 탬버린즈의 센슈얼한 바디 실크 향과 계산 중입니다.”
                </div>
              </div>

              {/* 💀 Shimmering Cosmic Skeleton UI Loader */}
              <div className="skeleton-timeline-container" style={{ width: '100%', textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-pink)', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  ⏳ 실시간 장소 매칭 및 동선 조율 시뮬레이션
                </p>
                <div className="skeleton-title skeleton-shimmer" style={{ width: '50%' }}></div>
                
                <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px dashed rgba(255, 255, 255, 0.05)' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton-card skeleton-shimmer" style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className="skeleton-text" style={{ width: '25%', height: '12px', marginBottom: '12px', background: 'rgba(255,255,255,0.04)' }}></div>
                      <div className="skeleton-text" style={{ width: '75%', height: '14px', background: 'rgba(255,255,255,0.03)' }}></div>
                      <div className="skeleton-text" style={{ width: '45%', height: '10px', background: 'rgba(255,255,255,0.02)' }}></div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================================
            [PHASE 2: RESULTS DASHBOARD (STEP 2)]
            ====================================================================== */}
        {step === 2 && selectedRestaurant && selectedCafe && selectedActivity && (
          <div>
            
            {/* Top wide sponsor slot co-branding */}
            <div className="kiosk-header-ad">
              <div className="ad-content">
                <span className="ad-badge">PREMIUM SPONSOR</span>
                <span className="ad-brand">GALAXY S26 Ultra</span>
              </div>
              <div className="ad-tagline">“오늘의 데이트 궤도 by Galaxy S26 Ultra”</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white' }}>
                🌌 오늘의 커플 데이트 궤도 (Date Orbit) 산출서
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                축하합니다! 두 분의 MBTI 성향 지표와 물리적 동선을 정밀 조정한 3단계 시그니처 궤도가 확정되었습니다.
              </p>
            </div>

            {/* ☀️🌧️ ENVIRONMENTAL SIMULATOR WIDGET CONTROLS */}
            <div className="premium-card" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-pink)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ⛈️ 실시간 기후 및 인파 흐름 시뮬레이터 (Physical Simulator)
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Weather Select */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>당일 기후 조건</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['sunny', 'rainy', 'cold'].map(w => {
                      const icons = { sunny: '☀️ 맑음', rainy: '🌧️ 우천', cold: '❄️ 한파' };
                      const isActive = weather === w;
                      return (
                        <button 
                          key={w}
                          onClick={() => setWeather(w)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '8px',
                            background: isActive ? 'rgba(255, 117, 140, 0.15)' : 'rgba(255,255,255,0.02)',
                            border: `1.5px solid ${isActive ? 'var(--accent-pink)' : 'rgba(255,255,255,0.06)'}`,
                            color: isActive ? 'white' : 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {icons[w]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Crowd Level Select */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>쇼핑몰 유동 인구 (혼잡도)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['quiet', 'normal', 'peak'].map(c => {
                      const icons = { quiet: '☕ 여유', normal: '🚶 보통', peak: '🎪 혼잡' };
                      const isActive = crowd === c;
                      return (
                        <button 
                          key={c}
                          onClick={() => setCrowd(c)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '8px',
                            background: isActive ? 'rgba(59, 209, 255, 0.12)' : 'rgba(255,255,255,0.02)',
                            border: `1.5px solid ${isActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.06)'}`,
                            color: isActive ? 'white' : 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {icons[c]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Orbit Path Visualizer (HTML5 Drag and Swap Enabled!) */}
            {planetOrder.length === 3 && (
              <OrbitVisualizer 
                planetOrder={planetOrder}
                planetsData={PLANETS}
                onPlanetOrderChange={handlePlanetOrderChange}
              />
            )}

            {/* 2. Main Timeline Report and Modular Cards */}
            <KioskTimeline 
              selectedRestaurant={selectedRestaurant}
              selectedCafe={selectedCafe}
              selectedActivity={selectedActivity}
              totalBudgetSpent={totalBudgetSpent}
              budgetInput={budgetInput}
              planetOrder={planetOrder.length === 3 ? planetOrder : getDeterministicOrbit(getCoupleMbti(boyfriendMbti, girlfriendMbti))}
              commentaryHtml={commentaryHtml}
              domainBadge={domainBadge}
              badgeClass={badgeClass}
              matchRate={matchRate}
              catalyst={catalyst}
              onCatalystChange={(newCat) => {
                setCatalyst(newCat);
                triggerCalculation(null, newCat);
              }}
              boyfriendMbti={boyfriendMbti}
              girlfriendMbti={girlfriendMbti}
              onRecalculate={() => triggerCalculation()} // Triggers satisfying dice reroll inside Hook
            />

            {/* 📊 Overlapping Custom Vector SVG Radar Chart card */}
            <div className="premium-card" style={{ padding: '24px' }}>
              <MbtiRadarChart 
                boyfriendMbti={boyfriendMbti}
                girlfriendMbti={girlfriendMbti}
              />
            </div>

            {/* Bottom wide ad banner co-branding */}
            <div className="kiosk-bottom-ad">
              <div className="bottom-ad-text">
                <h4>📸 Galaxy S26 Ultra 줌 카메라의 초고화질 순간 기록</h4>
                <p>오늘의 기록 행성 코스를 Galaxy S26 Ultra의 100배 줌과 AI 지우개 기능으로 눈부시게 촬영해 보세요.</p>
              </div>
              <span className="ad-sponsored">Sponsored</span>
            </div>

            {/* 4. Watermark QR Saving Section (Click opens Apple Wallet 3D Flip Card Modal!) */}
            <div className="kiosk-qr-section" style={{ cursor: 'pointer' }} onClick={() => setIsWalletOpen(true)}>
              <div className="qr-container">
                <div className="qr-code-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 29 29" fill="#0b091a">
                    <path d="M0 0h7v7H0zm1 1v5h5V1zm8-1h7v7H9zm1 1v5h5V1zm8-1h3v1h-3zm0 2h3v1h-3zm0 2h3v1h-3zm-17 4h3v3H1v-3zm4 0h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z"/>
                    <rect x="22" y="0" width="7" height="7"/>
                    <rect x="23" y="1" width="5" height="5" fill="#fff"/>
                    <rect x="0" y="22" width="7" height="7"/>
                    <rect x="1" y="23" width="5" height="5" fill="#fff"/>
                    <path d="M9 9h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm-17 4h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3z"/>
                  </svg>
                </div>
                <div className="qr-meta">
                  <h3>스마트폰으로 오늘의 궤도 다운로드하기</h3>
                  <p>QR 코드를 모바일로 스캔하여 코스를 카카오톡에 소장하세요! 지금 다운로드 시, <strong>탬버린즈 바디 스킨웨어 미니어처 키트</strong> 교환권이 즉시 증정됩니다. (클릭 시 3D 카드 미리보기)</p>
                  <div className="qr-brand-partnership">Date Orbit Router × TAMBURINS</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons-row">
              <button className="btn-stretch btn-secondary" onClick={() => triggerCalculation()}>
                🔄 다른 궤도로 재조정 (동선 재생성)
              </button>
              <button className="btn-stretch" onClick={handleReset}>
                ⬅️ 커플 성향 및 예산 재설정
              </button>
            </div>
          </div>
        )}

        {/* Store Directory Expander MAP */}
        {step !== 1 && (
          <StoreMapGuide 
            isOpen={expanderOpen}
            onToggle={() => setExpanderOpen(!expanderOpen)}
            search={directorySearch}
            onSearchChange={setDirectorySearch}
            catFilter={directoryCatFilter}
            onCatFilterChange={setDirectoryCatFilter}
            filteredStores={filteredStores}
          />
        )}
      </main>

      {/* ======================================================================
          [💳 3D APPLE WALLET COUPON FLIP MODAL]
          ====================================================================== */}
      <CouponWalletModal 
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />
    </div>
  );
}
