import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import StoreDirectoryPanel from './StoreDirectoryPanel';

afterEach(() => cleanup());

describe('StoreDirectoryPanel', () => {
  it('shows the full directory count and recommendation criteria', () => {
    render(<StoreDirectoryPanel />);

    expect(screen.getByText(/전체 362개 중 362개 표시/)).toBeInTheDocument();
    expect(screen.getByText('추천 후보 기준')).toBeInTheDocument();
    expect(screen.getByText('데이트 역할')).toBeInTheDocument();
  });

  it('filters stores by search keyword', async () => {
    const user = userEvent.setup();
    render(<StoreDirectoryPanel />);

    await user.type(screen.getByLabelText('매장명 검색'), '런던베이글');

    expect(screen.getByText('런던베이글뮤지엄')).toBeInTheDocument();
    expect(screen.getByText(/전체 362개 중 1개 표시/)).toBeInTheDocument();
  });

  it('filters stores by category', async () => {
    const user = userEvent.setup();
    render(<StoreDirectoryPanel />);

    await user.selectOptions(screen.getByLabelText('카테고리'), '엔터테인먼트');

    expect(screen.getByText('스몹 수원')).toBeInTheDocument();
    expect(screen.getByText('메가박스 수원스타필드')).toBeInTheDocument();
  });
});
