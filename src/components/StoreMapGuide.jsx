import React from 'react';

export default function StoreMapGuide({
  isOpen,
  onToggle,
  search,
  onSearchChange,
  catFilter,
  onCatFilterChange,
  filteredStores
}) {
  return (
    <div className="kiosk-expander">
      <div className="kiosk-expander-header" onClick={onToggle}>
        <span>🏢 스타필드 수원 전체 매장 맵 가이드</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="kiosk-expander-content">
          <div className="expander-filters">
            <div className="expander-filter-field">
              <label>🔍 매장 이름/태그 검색</label>
              <input 
                type="text" 
                value={search} 
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="예: 호호식당, 런던베이글, LP, 오코노미..."
              />
            </div>
            <div className="expander-filter-field">
              <label>📂 카테고리 분류</label>
              <select value={catFilter} onChange={(e) => onCatFilterChange(e.target.value)}>
                <option value="전체보기">전체보기</option>
                <option value="대화의 밀도">대화의 밀도</option>
                <option value="취향의 확장">취향의 확장</option>
                <option value="관계의 박제">관계의 박제</option>
              </select>
            </div>
          </div>

          <div className="directory-results-container">
            {filteredStores.length === 0 ? (
              <div style={{ padding: '20px 0', color: 'var(--text-muted)', textAlign: 'center' }}>
                🔍 조건에 맞는 매장이 없습니다.
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '10px' }}>
                  검색 결과: 총 {filteredStores.length}개 매장
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredStores.slice(0, 30).map((s, idx) => (
                    <div key={idx} className="directory-store-item">
                      <div className="directory-store-header">
                        <span className="directory-store-name">{s.name}</span>
                        <div className="directory-store-badges">
                          <span className="badge badge-floor">{s.floor}</span>
                          <span className="badge badge-tag" style={{ fontSize: '0.7rem' }}>{s.cat}</span>
                        </div>
                      </div>
                      <p className="directory-store-desc">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
