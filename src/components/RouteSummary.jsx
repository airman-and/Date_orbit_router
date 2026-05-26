const ROUTE_STOPS = [
  { key: 'restaurant', order: 1, label: '식사' },
  { key: 'cafe', order: 2, label: '카페' },
  { key: 'activity', order: 3, label: '액티비티' }
];

export default function RouteSummary({ selectedRestaurant, selectedCafe, selectedActivity }) {
  const places = {
    restaurant: selectedRestaurant,
    cafe: selectedCafe,
    activity: selectedActivity
  };

  return (
    <section aria-labelledby="route-summary-title">
      <div className="result-heading">
        <span className="section-kicker">TODAY ROUTE</span>
        <h3 id="route-summary-title">오늘의 추천 코스</h3>
        <p>현재 조건에서 식사, 카페, 액티비티를 가장 편한 순서로 정리했습니다.</p>
      </div>

      <div className="starfield-route-overview" aria-label="추천 코스 요약">
        {ROUTE_STOPS.map(stop => {
          const place = places[stop.key];
          return (
            <article className="route-stop-card" key={stop.key}>
              <span>{stop.order}</span>
              <small>{stop.label}</small>
              <strong>{place?.name || '추천 장소 없음'}</strong>
              <em>{place ? `${place.floor}F · ${place.tag}` : '조건을 다시 확인하세요'}</em>
            </article>
          );
        })}
      </div>
    </section>
  );
}
