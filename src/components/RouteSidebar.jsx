const BUDGET_OPTIONS = [15000, 30000, 50000, 75000, 100000, 150000, 200000, 300000];
const DATE_TYPES = [
  '1. 설렘 반 어색 반 (초기 커플)',
  '2. 인스타 하이라이트 (트렌드 세터)',
  '3. 만사 귀찮음 (릴랙스 힐링)',
  '4. 파이팅 넘치는 (이색 도전)'
];
const ZONE_OPTIONS = [
  { value: '스타필드 수원 올인원 몰링 코스 (실내)', label: '스타필드 수원 실내 코스' },
  { value: '스트리트형 아웃도어 & 로드 코스 (야외)', label: '야외 스트리트 코스' }
];

export default function RouteSidebar({
  step,
  boyfriendMbti,
  girlfriendMbti,
  budgetInput,
  dateType,
  zonePreference,
  onBoyfriendChange,
  onGirlfriendChange,
  onBudgetChange,
  onDateTypeChange,
  onZonePreferenceChange
}) {
  return (
    <aside className="app-sidebar" aria-label="데이트 코스 조건">
      <div className="sidebar-brand">
        <h2>STARFIELD ROUTE</h2>
        <p>데이트 코스 조건</p>
      </div>

      {step === 2 ? (
        <div className="sidebar-form">
          <div className="sidebar-field">
            <label htmlFor="boyfriend-mbti">남자친구 MBTI</label>
            <input
              id="boyfriend-mbti"
              type="text"
              value={boyfriendMbti}
              onChange={(event) => onBoyfriendChange(event.target.value.toUpperCase())}
              placeholder="예: INFJ"
            />
          </div>

          <div className="sidebar-field">
            <label htmlFor="girlfriend-mbti">여자친구 MBTI</label>
            <input
              id="girlfriend-mbti"
              type="text"
              value={girlfriendMbti}
              onChange={(event) => onGirlfriendChange(event.target.value.toUpperCase())}
              placeholder="예: ENFP"
            />
          </div>

          <div className="sidebar-field">
            <label htmlFor="budget-input">1인 최대 예산</label>
            <select id="budget-input" value={budgetInput} onChange={(event) => onBudgetChange(Number(event.target.value))}>
              {BUDGET_OPTIONS.map(value => (
                <option key={value} value={value}>{value.toLocaleString()}원</option>
              ))}
            </select>
          </div>

          <div className="sidebar-field">
            <label htmlFor="date-type">데이트 상황</label>
            <select id="date-type" value={dateType} onChange={(event) => onDateTypeChange(event.target.value)}>
              {DATE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="sidebar-field">
            <span className="field-label">코스 범위</span>
            <div className="sidebar-radio-group">
              {ZONE_OPTIONS.map(option => (
                <label className="sidebar-radio-option" key={option.value}>
                  <input
                    type="radio"
                    name="sidebar-zone"
                    checked={zonePreference === option.value}
                    onChange={() => onZonePreferenceChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar-info">
          먼저 커플 성향과 예산을 입력하세요. 추천 결과가 나오면 이곳에서 조건을 다시 조정할 수 있습니다.
        </div>
      )}
    </aside>
  );
}
