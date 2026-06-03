import { playSFX } from '../utils/sfx';

const ICONS = {
  soundwave: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5v14M22 9v6M7 5v14M2 9v6"/>
    </svg>
  ),
  keyhole: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 10h.01M9 22h6M10 13h4v9H10z"/>
    </svg>
  ),
  palette: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm1-17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm5 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-10 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  compass: (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  )
};

const MBTI_NICKNAMES = {
  "ESTJ": "완벽한 합리와 리드 커플 🏆",
  "ESTP": "짜릿한 액티비티 모험가 커플 🏄",
  "ESFJ": "리액션 최고의 다정 커플 🌸",
  "ESFP": "이 구역의 대장! 축제형 커플 🎉",
  "ENTJ": "로망을 실천하는 전략가 커플 🎯",
  "ENTP": "위트 넘치는 아이디어 커플 💡",
  "ENFJ": "감동과 포근한 배려를 매 순 간 주는 힐러 커플 💝",
  "ENFP": "무한 영감의 비글미 가득 커플 🐾",
  "ISTJ": "안정적인 정석 무드의 웰메이드 커플 🕰️",
  "ISTP": "효율적이고 쿨하게 즐기는 힙 커플 🛠️",
  "ISFJ": "최고의 배려 케어 커플 🧸",
  "ISFP": "다사로운 몽상가 예술 커플 🎨",
  "INTJ": "지적인 몰입을 즐기는 지성 커플 ♟️",
  "INTP": "서로를 탐구하는 사색가 커플 🔮",
  "INFJ": "말하지 않아도 통하는 소울메이트 커플 🕯️",
  "INFP": "감성 가득 낭만주의 소설 커플 🌌"
};

const GAME_QUESTIONS = [
  {
    key: 'q1',
    type: "E ↔ I 성향 (외향 vs 내향)",
    question: "💬 Q1. 영화가 끝나고 밖으로 나온 지금, 더 끌리는 다음 장소는?",
    options: [
      {
        val: "A",
        icon: "soundwave",
        title: "힙하고 활기찬 플레이스",
        desc: "사람들도 적당히 붐비고 경쾌한 텐션이 가득한 핫스팟!"
      },
      {
        val: "B",
        icon: "keyhole",
        title: "아늑하고 프라이빗한 공간",
        desc: "방금 본 영화에 대해 도란도란 둘만의 깊은 이야기를 할 수 있는 곳"
      }
    ]
  },
  {
    key: 'q2',
    type: "S ↔ N 성향 (감각 vs 직관)",
    question: "🎨 Q2. 영화관 로비 옆 팝업스토어를 마주쳤을 때, 우리의 행동은?",
    options: [
      {
        val: "A",
        icon: "palette",
        title: "직접 만들고 체험하기",
        desc: "손으로 만지고 참여해서 세상에 단 하나뿐인 결과물을 얻기"
      },
      {
        val: "B",
        icon: "star",
        title: "감성 비주얼 & 향기 영감 얻기",
        desc: "세련된 무드와 인생 네컷 부스, 몽환적인 감성 소품 둘러보기"
      }
    ]
  },
  {
    key: 'q3',
    type: "T ↔ F 성향 (사고 vs 감정)",
    question: "💖 Q3. 데이트 도중 상대방이 예쁜 수제 소품을 보여주었을 때 나의 속마음은?",
    options: [
      {
        val: "A",
        icon: "search",
        title: "실용성과 완성도 분석",
        desc: "이 굿즈의 가격은 합리적일까? 실생활에 진짜 유용할지 머리로 생각"
      },
      {
        val: "B",
        icon: "heart",
        title: "정서적 로맨스 교감 우선",
        desc: "우리의 특별한 순간을 기념하는 감정 가치와 로맨틱한 소통 우선!"
      }
    ]
  },
  {
    key: 'q4',
    type: "J ↔ P 성향 (판단 vs 인식)",
    question: "📅 Q4. 영화관 출구를 나서는 우리의 기본 데이트 스타일은?",
    options: [
      {
        val: "A",
        icon: "calendar",
        title: "계획된 동선과 예약 선호",
        desc: "웨이팅과 층 이동을 미리 확인하고 편하게 움직이기"
      },
      {
        val: "B",
        icon: "compass",
        title: "기분 따라 고르는 즉흥형 데이트",
        desc: "둘러보다가 끌리는 매장에 들어가고, 웨이팅이 길면 바로 바꾸기"
      }
    ]
  }
];

export default function BalanceGame({
  gameStep,
  gameTurn, // 'boyfriend' or 'girlfriend'
  onGameSelect,
  onReset,
  boyfriendMbti,
  girlfriendMbti,
  onBoyfriendChange,
  onGirlfriendChange,
  onboardingMode,
  onOnboardingModeChange,
  budgetInput,
  onBudgetChange,
  dateType,
  onDateTypeChange,
  zonePreference,
  onZonePreferenceChange,
  onStart,
  mealStatus,
  onMealStatusChange
}) {
  const currentQ = GAME_QUESTIONS[gameStep] || GAME_QUESTIONS[0];


  const validateMbti = (str) => {
    const val = String(str).trim().toUpperCase();
    if (val.length !== 4) return false;
    return ['E', 'I'].includes(val[0]) && ['S', 'N'].includes(val[1]) && ['T', 'F'].includes(val[2]) && ['J', 'P'].includes(val[3]);
  };

  const isManualValid = validateMbti(boyfriendMbti) && validateMbti(girlfriendMbti);

  // Overall progress in dual game mode
  // Boyfriend 4 steps + Girlfriend 4 steps = total 8 steps
  const totalSteps = gameTurn === 'girlfriend' ? 4 + gameStep : gameStep;
  const progressPct = totalSteps * 12.5; // 100 / 8 = 12.5% per step

  return (
    <div>
      {/* Onboarding Method Radio Selector */}
      <div className="onboarding-method-selector">
        <p>성향 분석 방식 선택</p>
        <div className="onboarding-method-options">
          <label className="onboarding-method-label">
            <input 
              type="radio" 
              name="game-mode-1" 
              checked={onboardingMode === 'game'} 
              onChange={() => { playSFX('click'); onOnboardingModeChange('game'); }}
            />
            커플 개별 밸런스 게임으로 취향 찾기 (추천)
          </label>
          <label className="onboarding-method-label">
            <input 
              type="radio" 
              name="game-mode-1" 
              checked={onboardingMode === 'manual'} 
              onChange={() => { playSFX('click'); onOnboardingModeChange('manual'); }}
            />
            우리 MBTI 직접 입력하기
          </label>
        </div>
      </div>

      {/* Main Interactive Onboarding Card */}
      <div className="premium-card">
        {onboardingMode === 'game' ? (
          <div>
            {gameTurn !== 'complete' ? (
              <div>
                {/* Progress Indicators */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span 
                      style={{ 
                        fontSize: '0.82rem', 
                        fontWeight: 700, 
                        color: gameTurn === 'boyfriend' ? 'var(--accent-pink)' : 'var(--accent-blue)',
                        borderLeft: `3px solid ${gameTurn === 'boyfriend' ? 'var(--accent-pink)' : 'var(--accent-blue)'}`,
                        paddingLeft: '8px',
                        transition: 'all 0.3s'
                      }}
                    >
                      {gameTurn === 'boyfriend' ? '👦 남자친구의 차례 (Boyfriend Turn)' : '👧 여자친구의 차례 (Girlfriend Turn)'}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      총 {totalSteps + 1} / 8 단계 ({progressPct}%)
                    </span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        backgroundColor: gameTurn === 'boyfriend' ? 'var(--accent-pink)' : 'var(--accent-blue)', 
                        width: `${progressPct}%`, 
                        height: '100%', 
                        borderRadius: '3px', 
                        transition: 'all 0.3s ease', 
                        boxShadow: `0 0 8px ${gameTurn === 'boyfriend' ? 'var(--accent-pink)' : 'var(--accent-blue)'}` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <span 
                    className="badge" 
                    style={{ 
                      fontSize: '0.8rem', 
                      padding: '4px 12px', 
                      marginBottom: '12px',
                      backgroundColor: gameTurn === 'boyfriend' ? 'rgba(255,117,140,0.08)' : 'rgba(59,209,255,0.08)',
                      color: gameTurn === 'boyfriend' ? 'var(--accent-pink)' : 'var(--accent-blue)',
                      borderColor: gameTurn === 'boyfriend' ? 'rgba(255,117,140,0.15)' : 'rgba(59,209,255,0.15)'
                    }}
                  >
                    {currentQ.type}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.5, marginTop: '8px' }}>
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQ.options.map(opt => (
                    <div 
                      key={opt.val} 
                      className="balance-choice-card"
                      onClick={() => {
                        playSFX('click');
                        onGameSelect(currentQ.key, opt.val);
                      }}
                      style={{
                        borderColor: gameTurn === 'boyfriend' ? 'rgba(255,117,140,0.1)' : 'rgba(59,209,255,0.1)',
                        transition: 'background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease'
                      }}
                    >
                      <div className="balance-emoji" style={{ color: gameTurn === 'boyfriend' ? 'var(--accent-pink)' : 'var(--accent-blue)' }}>
                        {ICONS[opt.icon]}
                      </div>
                      <div>
                        <div className="balance-title">{opt.title}</div>
                        <div className="balance-desc">{opt.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {/* Match Complete */}
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-pink)' }}>커플 성향 분석 완료</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ade80' }}>분석 완료 (100%)</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#4ade80', width: '100%', height: '100%', borderRadius: '3px', boxShadow: '0 0 8px #4ade80' }}></div>
                  </div>
                </div>

                <div className="badge-game-result" style={{ border: '1px solid rgba(255, 117, 140, 0.25)' }}>
                  <span className="badge-game-result-tag">
                    남: <strong style={{ color: 'var(--accent-pink)' }}>{boyfriendMbti}</strong> × 여: <strong style={{ color: 'var(--accent-blue)' }}>{girlfriendMbti}</strong>
                  </span>
                  <h4 style={{ marginTop: '12px' }}>✨ 두 분은 「{MBTI_NICKNAMES[boyfriendMbti] || "소울메이트 커플 💕"}」</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '8px' }}>
                    남자친구({boyfriendMbti})와 여자친구({girlfriendMbti})의 취향을 함께 반영해 오늘 움직이기 좋은 코스를 고릅니다.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                  <button className="btn-text" onClick={() => { playSFX('click'); onReset(); }}>
                    🔄 게임 다시 풀기
                  </button>
                </div>

                {/* Additional Settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <div className="sidebar-field">
                    <label>💵 인당 최대 데이트 예산</label>
                    <select value={budgetInput} onChange={(e) => { playSFX('click'); onBudgetChange(Number(e.target.value)); }}>
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
                    <label>🎬 데이트 직전 식사 여부</label>
                    <div className="kiosk-radio-box" style={{ padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="kiosk-radio-options" style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
                        <label className="kiosk-radio-label" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <input 
                            type="radio" 
                            name="game-meal-status" 
                            checked={mealStatus === 'hungry'} 
                            onChange={() => { playSFX('click'); onMealStatusChange('hungry'); }}
                          />
                          <span>🍽️ 아직 식사 안 함</span>
                        </label>
                        <label className="kiosk-radio-label" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <input 
                            type="radio" 
                            name="game-meal-status" 
                            checked={mealStatus === 'full'} 
                            onChange={() => { playSFX('click'); onMealStatusChange('full'); }}
                          />
                          <span>☕ 이미 식사 완료</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="sidebar-field">
                      <label>🎬 시추에이션 데이트 프리셋</label>
                      <select value={dateType} onChange={(e) => { playSFX('click'); onDateTypeChange(e.target.value); }}>
                        <option value="1. 설렘 반 어색 반 (초기 커플)">1. 설렘 반 어색 반 (초기 커플)</option>
                        <option value="2. 인스타 하이라이트 (트렌드 세터)">2. 인스타 하이라이트 (트렌드 세터)</option>
                        <option value="3. 만사 귀찮음 (릴랙스 힐링)">3. 만사 귀찮음 (릴랙스 힐링)</option>
                        <option value="4. 파이팅 넘치는 (이색 도전)">4. 파이팅 넘치는 (이색 도전)</option>
                      </select>
                    </div>
                    <div className="sidebar-field">
                      <label>🏢 코스 범위</label>
                      <div className="kiosk-radio-box" style={{ padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="kiosk-radio-options" style={{ flexDirection: 'column', gap: '6px' }}>
                          <label className="kiosk-radio-label">
                            <input 
                              type="radio" 
                              name="game-topo-1" 
                              checked={zonePreference === '스타필드 수원 올인원 몰링 코스 (실내)'} 
                              onChange={() => { playSFX('click'); onZonePreferenceChange('스타필드 수원 올인원 몰링 코스 (실내)'); }}
                            />
                            실내 올인원 코스
                          </label>
                          <label className="kiosk-radio-label">
                            <input 
                              type="radio" 
                              name="game-topo-1" 
                              checked={zonePreference === '스트리트형 아웃도어 & 로드 코스 (야외)'} 
                              onChange={() => { playSFX('click'); onZonePreferenceChange('스트리트형 아웃도어 & 로드 코스 (야외)'); }}
                            />
                            야외 스트리트 코스
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="btn-stretch border-beam-btn" onClick={() => { playSFX('click'); onStart(); }}>
                    <span>추천 코스 만들기</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="manual-input-box">
            <p style={{ fontSize: '1.05rem', color: 'var(--accent-pink)', fontWeight: 700, borderLeft: '3px solid var(--accent-pink)', paddingLeft: '10px' }}>
              직접 MBTI 입력하기
            </p>

            <div className="manual-grid">
              <div className="manual-field">
                <label>👦 남자친구 MBTI</label>
                <input 
                  type="text" 
                  value={boyfriendMbti} 
                  onChange={(e) => { playSFX('click'); onBoyfriendChange(e.target.value.toUpperCase()); }}
                  placeholder="예: INFJ"
                />
              </div>
              <div className="manual-field">
                <label>👧 여자친구 MBTI</label>
                <input 
                  type="text" 
                  value={girlfriendMbti} 
                  onChange={(e) => { playSFX('click'); onGirlfriendChange(e.target.value.toUpperCase()); }}
                  placeholder="예: ENFP"
                />
              </div>
            </div>

            {!isManualValid && (
              <div style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                ⚠️ 4자리의 올바른 MBTI 코드를 넣어주세요. (예: ENFP, INFJ)
              </div>
            )}

            <div className="sidebar-field">
              <label>💵 인당 최대 데이트 예산</label>
              <select value={budgetInput} onChange={(e) => { playSFX('click'); onBudgetChange(Number(e.target.value)); }}>
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
              <label>🎬 데이트 직전 식사 여부</label>
              <div className="kiosk-radio-box" style={{ padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="kiosk-radio-options" style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
                  <label className="kiosk-radio-label" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input 
                      type="radio" 
                      name="manual-meal-status" 
                      checked={mealStatus === 'hungry'} 
                      onChange={() => { playSFX('click'); onMealStatusChange('hungry'); }}
                    />
                    <span>🍽️ 아직 식사 안 함</span>
                  </label>
                  <label className="kiosk-radio-label" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input 
                      type="radio" 
                      name="manual-meal-status" 
                      checked={mealStatus === 'full'} 
                      onChange={() => { playSFX('click'); onMealStatusChange('full'); }}
                    />
                    <span>☕ 이미 식사 완료</span>
                  </label>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="sidebar-field">
                <label>🎬 데이트 상황 프리셋</label>
                <select value={dateType} onChange={(e) => { playSFX('click'); onDateTypeChange(e.target.value); }}>
                  <option value="1. 설렘 반 어색 반 (초기 커플)">1. 설렘 반 어색 반 (초기 커플)</option>
                  <option value="2. 인스타 하이라이트 (트렌드 세터)">2. 인스타 하이라이트 (트렌드 세터)</option>
                  <option value="3. 만사 귀찮음 (릴랙스 힐링)">3. 만사 귀찮음 (릴랙스 힐링)</option>
                  <option value="4. 파이팅 넘치는 (이색 도전)">4. 파이팅 넘치는 (이색 도전)</option>
                </select>
              </div>
              <div className="sidebar-field">
                <label>🏢 코스 범위</label>
                <div className="kiosk-radio-box" style={{ padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="kiosk-radio-options" style={{ flexDirection: 'column', gap: '6px' }}>
                    <label className="kiosk-radio-label">
                      <input 
                        type="radio" 
                        name="manual-topo-2" 
                        checked={zonePreference === '스타필드 수원 올인원 몰링 코스 (실내)'} 
                        onChange={() => { playSFX('click'); onZonePreferenceChange('스타필드 수원 올인원 몰링 코스 (실내)'); }}
                      />
                      실내 올인원 코스
                    </label>
                    <label className="kiosk-radio-label">
                      <input 
                        type="radio" 
                        name="manual-topo-2" 
                        checked={zonePreference === '스트리트형 아웃도어 & 로드 코스 (야외)'} 
                        onChange={() => { playSFX('click'); onZonePreferenceChange('스트리트형 아웃도어 & 로드 코스 (야외)'); }}
                      />
                      야외 스트리트 코스
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn-stretch border-beam-btn" disabled={!isManualValid} onClick={() => { playSFX('click'); onStart(); }}>
              <span>추천 코스 만들기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
