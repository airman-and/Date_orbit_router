const METRIC_ITEMS = [
  { key: 'comm', label: '대화 균형', tone: 'pink' },
  { key: 'tempo', label: '체험 템포', tone: 'blue' },
  { key: 'romance', label: '감정 온도', tone: 'yellow' },
  { key: 'path', label: '동선 성향', tone: 'green' }
];

export default function RouteInsights({ sections, compatibilityMetrics, boyfriendMbti, girlfriendMbti }) {
  return (
    <section className="premium-card route-insights-card" aria-labelledby="insights-title">
      <div className="panel-heading">
        <span className="section-kicker">REPORT</span>
        <h3 id="insights-title">분석 리포트</h3>
        <p>남자친구 {boyfriendMbti}와 여자친구 {girlfriendMbti} 기준으로 추천 이유를 정리했습니다.</p>
      </div>

      <div className="compatibility-grid" aria-label="커플 성향 지표">
        {METRIC_ITEMS.map(metric => (
          <div className="compatibility-metric" key={metric.key}>
            <div className="compatibility-metric-head">
              <span>{metric.label}</span>
              <strong>{compatibilityMetrics?.[metric.key] ?? 80}%</strong>
            </div>
            <div className="compatibility-track">
              <div
                className={`compatibility-fill ${metric.tone}`}
                style={{ width: `${compatibilityMetrics?.[metric.key] ?? 80}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="route-insight-list">
        {sections.map(section => (
          <article className="route-insight-item" key={`${section.title}-${section.label}`}>
            <span>{section.title}</span>
            <strong>{section.label}</strong>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
