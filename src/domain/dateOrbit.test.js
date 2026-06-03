import { describe, expect, it } from 'vitest';
import {
  calculateDateCourse,
  getCoupleMbti,
  parseMbti,
  pickCourseStop,
  scorePlace
} from './dateOrbit';

const DEFAULT_ARGS = {
  boyfriendMbti: 'INFJ',
  girlfriendMbti: 'ENFP',
  budget: 100000,
  dateType: '1. 설렘 반 어색 반 (초기 커플)',
  zonePreference: '스타필드 수원 올인원 몰링 코스 (실내)',
  weather: 'sunny',
  crowd: 'normal'
};

describe('date orbit domain', () => {
  it('parses valid, lowercase, spaced, and invalid MBTI values', () => {
    expect(parseMbti('ENFP')).toEqual({ E_I: 1, S_N: 0, T_F: 0, J_P: 0 });
    expect(parseMbti(' infj ')).toEqual({ E_I: 0, S_N: 0, T_F: 0, J_P: 1 });
    expect(parseMbti('NOPE')).toEqual({ E_I: 0.5, S_N: 0.5, T_F: 0.5, J_P: 0.5 });
    expect(parseMbti('EEEE')).toEqual({ E_I: 0.5, S_N: 0.5, T_F: 0.5, J_P: 0.5 });
  });

  it('selects a complete Starfield Suwon indoor course', () => {
    const course = calculateDateCourse({ ...DEFAULT_ARGS, randomFn: () => 0 });

    expect(course.selectedRestaurant.category).toBe('대화의 밀도');
    expect(course.selectedCafe.category).toBe('취향의 확장');
    expect(course.selectedActivity.category).toBe('관계의 박제');
    expect(course.selectedRestaurant.space_type).toBe('Starfield_Suwon');
    expect(course.selectedCafe.space_type).toBe('Starfield_Suwon');
    expect(course.selectedActivity.space_type).toBe('Starfield_Suwon');
  });

  it('falls back to the cheapest available stops when budget is too low', () => {
    const course = calculateDateCourse({ ...DEFAULT_ARGS, budget: 100, randomFn: () => 0 });

    expect(course.selectedRestaurant).toBeTruthy();
    expect(course.selectedCafe).toBeTruthy();
    expect(course.selectedActivity).toBeTruthy();
    expect(course.totalBudgetSpent).toBeGreaterThan(0);
  });

  it('penalizes external starts in bad weather', () => {
    const couple = getCoupleMbti('INFJ', 'ENFP');
    const externalWalk = {
      name: '화성행궁 성곽길 로맨틱 산책',
      category: '액티비티',
      cost: 0,
      energy: 3,
      tag: '성곽길산책',
      space_type: 'External',
      floor: 0,
      lat: 37.287,
      lng: 127.012,
      E_I: 0.3,
      S_N: 0.2,
      T_F: 0.2,
      J_P: 0.2,
      instagram_score: 8,
      comfort_score: 4,
      booking_required: false
    };

    const sunnyScore = scorePlace(externalWalk, null, couple, DEFAULT_ARGS.dateType, 100000, 'sunny', 'normal');
    const rainyScore = scorePlace(externalWalk, null, couple, DEFAULT_ARGS.dateType, 100000, 'rainy', 'normal');

    expect(rainyScore).toBeLessThan(sunnyScore);
  });

  it('uses injected random functions for reproducible top-candidate choice', () => {
    const couple = getCoupleMbti('INFJ', 'ENFP');
    const baseArgs = {
      category: '대화의 밀도',
      targetSpace: 'Starfield_Suwon',
      budget: 100000,
      currentNode: null,
      couple,
      dateType: DEFAULT_ARGS.dateType,
      weather: 'sunny',
      crowd: 'normal'
    };

    const firstRun = pickCourseStop({ ...baseArgs, randomFn: () => 0.7 });
    const secondRun = pickCourseStop({ ...baseArgs, randomFn: () => 0.7 });
    const firstCandidate = pickCourseStop({ ...baseArgs, randomFn: () => 0 });

    expect(secondRun.name).toBe(firstRun.name);
    expect(firstCandidate.name).toBeTruthy();
  });
});
