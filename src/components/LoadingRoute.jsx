export default function LoadingRoute() {
  return (
    <div className="premium-card loading-route-card" aria-live="polite">
      <div className="loading-container">
        <div className="cosmic-spinner" aria-hidden="true">
          <div className="orbit-ring ring-1"></div>
          <div className="orbit-ring ring-2"></div>
          <div className="orbit-ring ring-3"></div>
          <div className="core-planet"></div>
        </div>
        <h2 className="loading-title">오늘의 데이트 코스를 고르는 중입니다.</h2>
        <p className="loading-copy">MBTI, 예산, 날씨, 혼잡도, 층 이동을 함께 반영합니다.</p>

        <div className="skeleton-timeline-container" aria-hidden="true">
          <p>장소와 이동 순서를 확인하고 있습니다</p>
          <div className="skeleton-title skeleton-shimmer"></div>
          <div className="skeleton-list">
            {[1, 2, 3].map(index => (
              <div key={index} className="skeleton-card skeleton-shimmer" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="skeleton-text skeleton-text-short"></div>
                <div className="skeleton-text skeleton-text-long"></div>
                <div className="skeleton-text skeleton-text-mid"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
