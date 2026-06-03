import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RouteConditionsPanel from './RouteConditionsPanel';

describe('RouteConditionsPanel', () => {
  it('renders automatic condition values correctly', () => {
    render(
      <RouteConditionsPanel
        dateText="6월 3일 (수) 14시"
        weatherLabel="☀️ 맑음"
        weatherReason="봄/가을철 온화하고 맑은 기상 분석"
        crowdLabel="🟡 보통"
        crowdReason="평일 저녁 시간대 보통 관측"
      />
    );

    expect(screen.getByText(/6월 3일/)).toBeInTheDocument();
    expect(screen.getByText('☀️ 맑음')).toBeInTheDocument();
    expect(screen.getByText('봄/가을철 온화하고 맑은 기상 분석')).toBeInTheDocument();
    expect(screen.getByText('🟡 보통')).toBeInTheDocument();
    expect(screen.getByText('평일 저녁 시간대 보통 관측')).toBeInTheDocument();
  });
});
