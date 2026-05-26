const STARFIELD_HIGHLIGHTS = [
  { label: 'Library', title: '별마당 도서관', desc: '휴식과 만남을 위한 수직 문화 라운지' },
  { label: 'F&B', title: '식사와 카페', desc: '고메스트리트부터 잇토피아까지 한 번에' },
  { label: 'Play', title: '액티비티', desc: '스몹, 메가박스, 스타가든으로 마무리' }
];

export default function SpaceHero({ step }) {
  const status = step === 0
    ? '성향과 예산을 입력하면 스타필드 수원 안에서 바로 움직일 수 있는 코스를 추천합니다.'
    : step === 1
      ? '층 이동, 날씨, 혼잡도를 반영해 가장 편한 동선을 계산하고 있습니다.'
      : '오늘 조건에 맞춘 스타필드 수원 코스가 준비됐습니다.';

  return (
    <section className="sf-hero" aria-label="스타필드 수원 데이트 코스 추천">
      <div className="sf-hero-content">
        <img
          className="sf-logo"
          src="/brand/starfield-suwon/logo-starfield-suwon.png"
          alt="Starfield Suwon"
        />
        <span className="sf-eyebrow">DATE ROUTE GUIDE</span>
        <h1>스타필드 수원 데이트 코스</h1>
        <p>{status}</p>

        <div className="sf-route-pills" aria-label="추천 동선 요약">
          <span>식사</span>
          <span>카페</span>
          <span>액티비티</span>
        </div>
      </div>

      <div className="sf-hero-media">
        <img src="/brand/starfield-suwon/byeolmadang-library.jpg" alt="스타필드 수원 별마당 도서관" />
        <div className="sf-media-caption">
          <strong>별마당 도서관</strong>
          <span>4-7F 문화 라운지</span>
        </div>
      </div>

      <div className="sf-highlight-row" aria-label="스타필드 수원 핵심 공간">
        {STARFIELD_HIGHLIGHTS.map(item => (
          <div className="sf-highlight" key={item.title}>
            <span>{item.label}</span>
            <strong>{item.title}</strong>
            <small>{item.desc}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
