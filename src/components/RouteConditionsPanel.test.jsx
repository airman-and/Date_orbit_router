import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RouteConditionsPanel from './RouteConditionsPanel';

vi.mock('../utils/sfx', () => ({
  playSFX: vi.fn()
}));

describe('RouteConditionsPanel', () => {
  it('calls recalculation callbacks when conditions change', async () => {
    const user = userEvent.setup();
    const onWeatherChange = vi.fn();
    const onCrowdChange = vi.fn();

    render(
      <RouteConditionsPanel
        weather="sunny"
        crowd="normal"
        onWeatherChange={onWeatherChange}
        onCrowdChange={onCrowdChange}
      />
    );

    await user.click(screen.getByRole('button', { name: '비' }));
    await user.click(screen.getByRole('button', { name: '혼잡' }));

    expect(onWeatherChange).toHaveBeenCalledWith('rainy');
    expect(onCrowdChange).toHaveBeenCalledWith('peak');
  });
});
