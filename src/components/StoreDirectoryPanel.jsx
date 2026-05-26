import { useMemo, useState } from 'react';
import {
  DIRECTORY_DATA_POLICY,
  RECOMMENDATION_ELIGIBILITY_CRITERIA,
  STARFIELD_DIRECTORY,
  STARFIELD_DIRECTORY_CATEGORIES,
  STARFIELD_DIRECTORY_COUNT,
  STARFIELD_DIRECTORY_FLOORS,
  STARFIELD_DIRECTORY_VERSION
} from '../data/starfieldDirectory';

const ALL_VALUE = '전체';

export default function StoreDirectoryPanel() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL_VALUE);
  const [floor, setFloor] = useState(ALL_VALUE);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredStores = useMemo(() => STARFIELD_DIRECTORY.filter((store) => {
    const matchesQuery = !normalizedQuery || [
      store.name,
      store.category,
      store.floor,
      store.zone,
      store.notes.join(' ')
    ].join(' ').toLowerCase().includes(normalizedQuery);

    const matchesCategory = category === ALL_VALUE || store.category === category;
    const matchesFloor = floor === ALL_VALUE || store.floor === floor;

    return matchesQuery && matchesCategory && matchesFloor;
  }), [category, floor, normalizedQuery]);

  return (
    <section className="premium-card store-directory-panel" aria-labelledby="store-directory-title">
      <div className="panel-heading directory-heading">
        <span className="section-kicker">DIRECTORY</span>
        <h3 id="store-directory-title">스타필드 수원 매장 디렉터리</h3>
        <p>
          입력하신 2025년 8월 기준 목록 {STARFIELD_DIRECTORY_COUNT}개를 원문 기준으로 구조화했습니다.
          추천 코스 후보는 아래 기준을 만족한 매장만 별도로 승격합니다.
        </p>
      </div>

      <div className="directory-criteria">
        <div>
          <strong>추천 후보 기준</strong>
          <div className="criteria-grid">
            {RECOMMENDATION_ELIGIBILITY_CRITERIA.map(item => (
              <article className="criteria-item" key={item.key}>
                <span>{item.label}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <details className="directory-policy">
          <summary>데이터 입력 기준</summary>
          <ul className="directory-policy-list">
            {DIRECTORY_DATA_POLICY.map(policy => (
              <li key={policy}>{policy}</li>
            ))}
          </ul>
          <p>데이터 버전: {STARFIELD_DIRECTORY_VERSION}</p>
        </details>
      </div>

      <div className="store-directory-controls" aria-label="매장 검색 필터">
        <label className="store-directory-field">
          <span>매장명 검색</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 런던베이글뮤지엄, 스몹, 자라"
          />
        </label>

        <label className="store-directory-field">
          <span>카테고리</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value={ALL_VALUE}>전체 카테고리</option>
            {STARFIELD_DIRECTORY_CATEGORIES.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="store-directory-field">
          <span>층</span>
          <select value={floor} onChange={(event) => setFloor(event.target.value)}>
            <option value={ALL_VALUE}>전체 층</option>
            {STARFIELD_DIRECTORY_FLOORS.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="store-directory-summary" aria-live="polite">
        전체 {STARFIELD_DIRECTORY_COUNT}개 중 {filteredStores.length}개 표시
      </div>

      <div className="store-directory-list">
        {filteredStores.map(store => (
          <article className="store-directory-item" key={store.id}>
            <div>
              <strong>{store.name}</strong>
              <span>{store.category}</span>
            </div>
            <p className="store-directory-meta">
              {[store.floor, store.zone].filter(Boolean).join(' · ') || '층 정보 미기재'}
              {store.notes.length > 0 && ` · 원문 메모: ${store.notes.join(', ')}`}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
