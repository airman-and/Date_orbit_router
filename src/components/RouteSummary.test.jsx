import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RouteSummary from './RouteSummary';

const places = {
  restaurant: { name: '호호식당', floor: 2, tag: '일식가정식' },
  cafe: { name: '인크커피', floor: 4, tag: '뷰카페' },
  activity: { name: '별마당 도서관', floor: 4, tag: '문화/전시' }
};

describe('RouteSummary', () => {
  it('shows meal, cafe, and activity cards', () => {
    render(
      <RouteSummary
        selectedRestaurant={places.restaurant}
        selectedCafe={places.cafe}
        selectedActivity={places.activity}
      />
    );

    expect(screen.getByText('식사')).toBeInTheDocument();
    expect(screen.getByText('카페')).toBeInTheDocument();
    expect(screen.getByText('액티비티')).toBeInTheDocument();
    expect(screen.getByText('호호식당')).toBeInTheDocument();
    expect(screen.getByText('인크커피')).toBeInTheDocument();
    expect(screen.getByText('별마당 도서관')).toBeInTheDocument();
  });
});
