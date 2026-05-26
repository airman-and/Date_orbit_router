import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { answersToMbti } from '../domain/dateOrbit';
import BalanceGame from './BalanceGame';

vi.mock('../utils/sfx', () => ({
  playSFX: vi.fn()
}));

function BalanceGameHarness() {
  const [gameStep, setGameStep] = useState(0);
  const [gameTurn, setGameTurn] = useState('boyfriend');
  const [boyfriendMbti, setBoyfriendMbti] = useState('INFJ');
  const [girlfriendMbti, setGirlfriendMbti] = useState('ENFP');
  const [bfAnswers, setBfAnswers] = useState({ q1: 'A', q2: 'A', q3: 'B', q4: 'A' });
  const [gfAnswers, setGfAnswers] = useState({ q1: 'B', q2: 'B', q3: 'A', q4: 'B' });

  const handleGameSelect = (questionKey, optionValue) => {
    if (gameTurn === 'boyfriend') {
      const nextAnswers = { ...bfAnswers, [questionKey]: optionValue };
      setBfAnswers(nextAnswers);
      if (gameStep === 3) {
        setBoyfriendMbti(answersToMbti(nextAnswers));
        setGameStep(0);
        setGameTurn('girlfriend');
      } else {
        setGameStep(prev => prev + 1);
      }
      return;
    }

    const nextAnswers = { ...gfAnswers, [questionKey]: optionValue };
    setGfAnswers(nextAnswers);
    if (gameStep === 3) {
      setGirlfriendMbti(answersToMbti(nextAnswers));
      setGameTurn('complete');
    } else {
      setGameStep(prev => prev + 1);
    }
  };

  return (
    <BalanceGame
      gameStep={gameStep}
      gameTurn={gameTurn}
      onGameSelect={handleGameSelect}
      onReset={() => {}}
      boyfriendMbti={boyfriendMbti}
      girlfriendMbti={girlfriendMbti}
      onBoyfriendChange={setBoyfriendMbti}
      onGirlfriendChange={setGirlfriendMbti}
      onboardingMode="game"
      onOnboardingModeChange={() => {}}
      budgetInput={100000}
      onBudgetChange={() => {}}
      dateType="1. 설렘 반 어색 반 (초기 커플)"
      onDateTypeChange={() => {}}
      zonePreference="스타필드 수원 올인원 몰링 코스 (실내)"
      onZonePreferenceChange={() => {}}
      onStart={() => {}}
    />
  );
}

describe('BalanceGame', () => {
  it('calculates both MBTI values after eight answers', async () => {
    const user = userEvent.setup();
    render(<BalanceGameHarness />);

    await user.click(screen.getByText('힙하고 활기찬 플레이스'));
    await user.click(screen.getByText('직접 만들고 체험하기'));
    await user.click(screen.getByText('실용성과 완성도 분석'));
    await user.click(screen.getByText('계획된 동선과 예약 선호'));

    await user.click(screen.getByText('아늑하고 프라이빗한 공간'));
    await user.click(screen.getByText('감성 비주얼 & 향기 영감 얻기'));
    await user.click(screen.getByText('정서적 로맨스 교감 우선'));
    await user.click(screen.getByText('기분 따라 고르는 즉흥형 데이트'));

    expect(screen.getAllByText(/ESTJ/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/INFP/).length).toBeGreaterThan(0);
  });
});
