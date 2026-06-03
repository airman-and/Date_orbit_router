import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DoomEasterEgg from './DoomEasterEgg';

describe('DoomEasterEgg', () => {
  it('renders the js-dos iframe only when open and closes on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(<DoomEasterEgg isOpen={false} onClose={onClose} />);
    expect(screen.queryByTitle('DOOM shareware running in js-dos')).not.toBeInTheDocument();

    rerender(<DoomEasterEgg isOpen onClose={onClose} />);
    expect(screen.getByTitle('DOOM shareware running in js-dos')).toHaveAttribute('srcdoc', expect.stringContaining('vendor/doom.jsdos'));

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
