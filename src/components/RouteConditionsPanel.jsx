import { playSFX } from '../utils/sfx';

const WEATHER_OPTIONS = [
  { key: 'sunny', label: '맑음' },
  { key: 'rainy', label: '비' },
  { key: 'cold', label: '추움' }
];

const CROWD_OPTIONS = [
  { key: 'quiet', label: '여유' },
  { key: 'normal', label: '보통' },
  { key: 'peak', label: '혼잡' }
];

export default function RouteConditionsPanel({ weather, crowd, onWeatherChange, onCrowdChange }) {
  const handleWeather = (value) => {
    playSFX('click');
    onWeatherChange(value);
  };

  const handleCrowd = (value) => {
    playSFX('click');
    onCrowdChange(value);
  };

  return (
    <section className="premium-card environment-card" aria-labelledby="conditions-title">
      <div className="panel-heading">
        <span className="section-kicker">CONDITIONS</span>
        <h3 id="conditions-title">조건 조정</h3>
        <p>날씨와 혼잡도를 바꾸면 추천 코스가 바로 다시 계산됩니다.</p>
      </div>

      <div className="environment-grid">
        <fieldset className="segmented-field">
          <legend>당일 날씨</legend>
          <div className="segmented-control">
            {WEATHER_OPTIONS.map(option => (
              <button
                key={option.key}
                type="button"
                className={weather === option.key ? 'active' : ''}
                aria-pressed={weather === option.key}
                onClick={() => handleWeather(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="segmented-field">
          <legend>쇼핑몰 혼잡도</legend>
          <div className="segmented-control">
            {CROWD_OPTIONS.map(option => (
              <button
                key={option.key}
                type="button"
                className={crowd === option.key ? 'active' : ''}
                aria-pressed={crowd === option.key}
                onClick={() => handleCrowd(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  );
}
