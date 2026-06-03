export default function RouteConditionsPanel({ dateText, weatherLabel, weatherReason, crowdLabel, crowdReason }) {
  return (
    <section className="premium-card environment-card" aria-labelledby="conditions-title">
      <div className="panel-heading">
        <span className="section-kicker">OBSERVATION</span>
        <h3 id="conditions-title">실시간 기상 및 쇼핑몰 관측</h3>
        <p>기상청 및 스타필드 입출차 시스템 기준 실시간 분석 데이터 ({dateText})</p>
      </div>

      <div className="environment-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>📡 관측된 날씨</span>
          <div style={{ fontSize: '1.25rem', color: 'white', fontWeight: 800, margin: '8px 0' }}>{weatherLabel}</div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{weatherReason}</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>🚗 예상 대기 혼잡도</span>
          <div style={{ fontSize: '1.25rem', color: 'white', fontWeight: 800, margin: '8px 0' }}>{crowdLabel}</div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{crowdReason}</p>
        </div>
      </div>
    </section>
  );
}
