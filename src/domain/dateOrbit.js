import { PLACE_DB } from '../data/places';

export const COURSE_CATEGORIES = ['식사', '카페', '액티비티'];
export const DEFAULT_WEATHER = 'sunny';
export const DEFAULT_CROWD = 'normal';

const VALID_MBTI = /^[EI][SN][TF][JP]$/;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const normalizeMbti = (mbtiStr) => String(mbtiStr || '').trim().toUpperCase();

export const isValidMbti = (mbtiStr) => VALID_MBTI.test(normalizeMbti(mbtiStr));

export const parseMbti = (mbtiStr) => {
  const norm = normalizeMbti(mbtiStr);
  if (!isValidMbti(norm)) {
    return { E_I: 0.5, S_N: 0.5, T_F: 0.5, J_P: 0.5 };
  }

  return {
    E_I: norm[0] === 'E' ? 1.0 : 0.0,
    S_N: norm[1] === 'S' ? 1.0 : 0.0,
    T_F: norm[2] === 'T' ? 1.0 : 0.0,
    J_P: norm[3] === 'J' ? 1.0 : 0.0
  };
};

export const getCoupleMbti = (boyfriendMbti, girlfriendMbti) => {
  const boyfriend = parseMbti(boyfriendMbti);
  const girlfriend = parseMbti(girlfriendMbti);

  return {
    E_I: (boyfriend.E_I + girlfriend.E_I) / 2.0,
    S_N: (boyfriend.S_N + girlfriend.S_N) / 2.0,
    T_F: (boyfriend.T_F + girlfriend.T_F) / 2.0,
    J_P: (boyfriend.J_P + girlfriend.J_P) / 2.0
  };
};

export const answersToMbti = (answers) => {
  const safeAnswers = answers || {};
  const char1 = safeAnswers.q1 === 'A' ? 'E' : 'I';
  const char2 = safeAnswers.q2 === 'A' ? 'S' : 'N';
  const char3 = safeAnswers.q3 === 'A' ? 'T' : 'F';
  const char4 = safeAnswers.q4 === 'A' ? 'J' : 'P';
  return `${char1}${char2}${char3}${char4}`;
};

export const getDeterministicOrbit = (couple) => {
  let planetA = '조용한 행성';
  if (couple.T_F < 0.4) {
    planetA = '설렘 행성';
  } else if (couple.E_I > 0.6) {
    planetA = '도파민 행성';
  }

  let planetB = couple.S_N > 0.5 ? '달콤 행성' : '조용한 행성';
  if (planetB === planetA) {
    planetB = planetA === '조용한 행성' ? '달콤 행성' : '조용한 행성';
  }

  let planetC = '향기 행성';
  if (couple.E_I > 0.6) {
    planetC = '도파민 행성';
  } else if (couple.S_N > 0.5 && couple.J_P < 0.5) {
    planetC = '기록 행성';
  } else if (couple.J_P > 0.5) {
    planetC = '선물 행성';
  }

  const used = new Set([planetA, planetB]);
  if (used.has(planetC)) {
    const fallbacks = ['기록 행성', '도파민 행성', '선물 행성', '향기 행성'];
    for (const fallback of fallbacks) {
      if (!used.has(fallback)) {
        planetC = fallback;
        break;
      }
    }
  }

  return [planetA, planetB, planetC];
};

export const getTargetSpace = (zonePreference) => (
  String(zonePreference || '').includes('스타필드 수원') ? 'Starfield_Suwon' : 'External'
);

export const scorePlace = (
  node,
  currentNode,
  couple,
  dateType,
  remaining,
  weather = DEFAULT_WEATHER,
  crowd = DEFAULT_CROWD,
  catalyst = null
) => {
  if (!node || node.cost > remaining) return -999.0;

  const mbtiDistance = (
    Math.abs(couple.E_I - node.E_I) * 1.2 +
    Math.abs(couple.S_N - node.S_N) * 1.0 +
    Math.abs(couple.T_F - node.T_F) * 1.0
  );

  let mbtiScore = 30.0 - (mbtiDistance * 8.0);

  if (couple.E_I < 0.4 && node.E_I < 0.3) {
    mbtiScore += 8.0;
  } else if (couple.E_I > 0.6 && node.E_I > 0.7) {
    mbtiScore += 5.0;
  }

  if (couple.J_P < 0.4 && node.booking_required) {
    mbtiScore -= 15.0;
  } else if (couple.J_P > 0.6 && node.booking_required) {
    mbtiScore += 5.0;
  }

  let presetScore = 0.0;
  if (dateType === '1. 설렘 반 어색 반 (초기 커플)') {
    if (node.category === '액티비티' || node.tag === '전시/예술' || node.tag === '음악/전시') {
      presetScore += 15.0;
    }
    if (node.S_N < 0.4) presetScore += 8.0;
  } else if (dateType === '2. 인스타 하이라이트 (트렌드 세터)') {
    presetScore += node.instagram_score * 3.0;
    if (node.S_N < 0.4) presetScore += 5.0;
    if (node.T_F < 0.4) presetScore += 5.0;
  } else if (dateType === '3. 만사 귀찮음 (릴랙스 힐링)') {
    presetScore += node.comfort_score * 3.5;
    presetScore += (5.0 - node.energy) * 4.0;
  } else if (dateType === '4. 파이팅 넘치는 (이색 도전)') {
    presetScore += node.energy * 6.0;
    if (node.category === '액티비티') presetScore += 10.0;
  }

  if (crowd === 'peak') {
    if (node.booking_required) mbtiScore -= 10.0;
    if (node.instagram_score >= 9) presetScore -= 8.0;
  } else if (crowd === 'quiet' && node.booking_required) {
    mbtiScore += 5.0;
  }

  let routingPenalty = 0.0;
  if (currentNode) {
    const isSameSpace = currentNode.space_type === node.space_type;
    if (isSameSpace && node.space_type === 'Starfield_Suwon') {
      const floorGap = Math.abs(currentNode.floor - node.floor);
      let multiplier = dateType === '3. 만사 귀찮음 (릴랙스 힐링)' ? 8.0 : 4.0;
      if (crowd === 'peak') multiplier += 2.0;
      routingPenalty += floorGap * multiplier;
      routingPenalty -= 10.0;

      if (node.name.startsWith('별마당 도서관')) {
        routingPenalty -= 15.0;
      }
    } else {
      const dist = Math.sqrt(
        Math.pow(currentNode.lat - node.lat, 2) +
        Math.pow(currentNode.lng - node.lng, 2)
      ) * 100;

      let weatherMultiplier = 3.5;
      if (weather === 'rainy' || weather === 'cold') {
        weatherMultiplier = 8.0;
        routingPenalty += 50.0;
      }

      routingPenalty += dist * weatherMultiplier;
      if (currentNode.space_type !== node.space_type) {
        routingPenalty += 30.0;
      }
    }
  } else if ((weather === 'rainy' || weather === 'cold') && node.space_type === 'External') {
    routingPenalty += 60.0;
  }

  let catalystScore = 0.0;
  if (catalyst === 'dopamine') {
    if (node.category === '액티비티' || node.energy >= 4) catalystScore += 18.0;
  } else if (catalyst === 'oxytocin') {
    if (
      node.comfort_score >= 8 ||
      node.tag?.includes('힐링') ||
      node.tag?.includes('카페') ||
      node.name.includes('스파') ||
      node.name.includes('도서관')
    ) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'spark') {
    if (
      node.instagram_score >= 8 ||
      node.tag?.includes('감성') ||
      node.tag?.includes('인생네컷') ||
      node.tag?.includes('철판') ||
      node.tag?.includes('베이글') ||
      node.tag?.includes('전시')
    ) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'telepathy') {
    if (node.E_I < 0.4 || node.tag?.includes('북카페') || node.tag?.includes('음악') || node.tag?.includes('산책')) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'lucky') {
    const hash = (node.name.charCodeAt(0) + node.name.charCodeAt(node.name.length - 1)) % 20;
    catalystScore += (hash - 10) * 1.5;
  }

  const finalScore = mbtiScore + presetScore + catalystScore - routingPenalty;
  return Math.round(finalScore * 10) / 10;
};

export const pickCourseStop = ({
  category,
  targetSpace,
  budget,
  currentNode,
  couple,
  dateType,
  weather = DEFAULT_WEATHER,
  crowd = DEFAULT_CROWD,
  catalyst = null,
  randomFn = Math.random
}) => {
  const placesInCategory = PLACE_DB.filter(place => place.category === category);
  const fallback = [...placesInCategory]
    .sort((a, b) => {
      if (a.space_type === targetSpace && b.space_type !== targetSpace) return -1;
      if (a.space_type !== targetSpace && b.space_type === targetSpace) return 1;
      return a.cost - b.cost;
    })[0] || null;

  const candidates = placesInCategory.filter(place =>
    place.space_type === targetSpace &&
    place.cost <= budget
  );

  if (candidates.length === 0) {
    return fallback;
  }

  const scored = candidates
    .map(node => ({
      node,
      score: scorePlace(node, currentNode, couple, dateType, budget, weather, crowd, catalyst)
    }))
    .filter(({ score }) => score > -500)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return fallback;
  }

  const topChoices = scored.slice(0, 3);
  const safeRandom = clamp(Number(randomFn()), 0, 0.999999);
  const choiceIndex = Math.floor(safeRandom * topChoices.length);
  return topChoices[choiceIndex]?.node || scored[0].node;
};

export const calculateDateCourse = ({
  boyfriendMbti,
  girlfriendMbti,
  budget,
  dateType,
  zonePreference,
  weather = DEFAULT_WEATHER,
  crowd = DEFAULT_CROWD,
  planetOrder,
  catalyst = null,
  randomFn = Math.random
}) => {
  const couple = getCoupleMbti(boyfriendMbti, girlfriendMbti);
  const targetSpace = getTargetSpace(zonePreference);
  const activePlanetOrder = planetOrder?.length === 3 ? planetOrder : getDeterministicOrbit(couple);
  const perPersonBudget = Math.max(0, Number(budget) || 0);

  const selectedRestaurant = pickCourseStop({
    category: '식사',
    targetSpace,
    budget: perPersonBudget,
    currentNode: null,
    couple,
    dateType,
    weather,
    crowd,
    catalyst,
    randomFn
  });

  const cafeBudget = perPersonBudget - (selectedRestaurant?.cost || 0);
  const selectedCafe = pickCourseStop({
    category: '카페',
    targetSpace,
    budget: cafeBudget,
    currentNode: selectedRestaurant,
    couple,
    dateType,
    weather,
    crowd,
    catalyst,
    randomFn
  });

  const activityBudget = cafeBudget - (selectedCafe?.cost || 0);
  const selectedActivity = pickCourseStop({
    category: '액티비티',
    targetSpace,
    budget: activityBudget,
    currentNode: selectedCafe,
    couple,
    dateType,
    weather,
    crowd,
    catalyst,
    randomFn
  });

  const totalBudgetSpent = (
    (selectedRestaurant?.cost || 0) +
    (selectedCafe?.cost || 0) +
    (selectedActivity?.cost || 0)
  ) * 2;

  return {
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    totalBudgetSpent,
    planetOrder: activePlanetOrder
  };
};

export const isStarfieldCourse = (stops) => (
  stops.every(stop => stop?.space_type === 'Starfield_Suwon')
);

const getCourseDistanceMeters = ([first, second, third]) => {
  if (!first || !second || !third) return 0;
  const dist1 = Math.sqrt(Math.pow(first.lat - second.lat, 2) + Math.pow(first.lng - second.lng, 2)) * 100;
  const dist2 = Math.sqrt(Math.pow(second.lat - third.lat, 2) + Math.pow(second.lng - third.lng, 2)) * 100;
  return Math.round((dist1 + dist2) * 10) / 10;
};

export const getCompatibilityMetrics = (boyfriendMbti, girlfriendMbti) => {
  const boyfriend = normalizeMbti(boyfriendMbti);
  const girlfriend = normalizeMbti(girlfriendMbti);

  if (!isValidMbti(boyfriend) || !isValidMbti(girlfriend)) {
    return { comm: 80, tempo: 80, romance: 80, path: 80 };
  }

  return {
    comm: boyfriend[0] === girlfriend[0] ? 95 : 78,
    tempo: boyfriend[1] === girlfriend[1] ? 98 : 72,
    romance: boyfriend[2] === girlfriend[2] ? 92 : 80,
    path: boyfriend[3] === girlfriend[3] ? 96 : 85
  };
};

export const getCompatibilityTip = (boyfriendMbti, girlfriendMbti) => {
  const boyfriend = normalizeMbti(boyfriendMbti);
  const girlfriend = normalizeMbti(girlfriendMbti);

  if (!isValidMbti(boyfriend) || !isValidMbti(girlfriend)) {
    return 'MBTI 형식이 맞지 않아 기본 추천 기준으로 계산했습니다.';
  }

  const tips = [];
  if (boyfriend[0] !== girlfriend[0]) {
    tips.push('한 명은 활기 있는 장소에서 에너지를 얻고, 다른 한 명은 조용한 구간에서 회복하는 조합입니다. 코스 중간에 차분한 카페를 넣는 편이 좋습니다.');
  } else if (boyfriend[0] === 'I') {
    tips.push('두 분 모두 조용한 대화와 여유 있는 이동을 선호할 가능성이 높아, 웨이팅과 소음이 큰 구간을 줄였습니다.');
  } else {
    tips.push('두 분 모두 활동적인 분위기를 즐길 가능성이 높아, 식사 후 체험형 액티비티로 흐름을 이어가도록 잡았습니다.');
  }

  if (boyfriend[3] !== girlfriend[3]) {
    tips.push('계획형과 즉흥형이 섞여 있어 예약 부담이 큰 장소와 자유롭게 들를 수 있는 장소를 함께 배치했습니다.');
  } else if (boyfriend[3] === 'J') {
    tips.push('두 분 모두 계획형에 가까워 층 이동과 대기 가능성을 더 보수적으로 반영했습니다.');
  } else {
    tips.push('두 분 모두 즉흥형에 가까워 부담 없이 바꿀 수 있는 워크인 장소의 점수를 높였습니다.');
  }

  return tips.slice(0, 2).join(' ');
};

export const getCatalystDetail = (catalystKey) => {
  const details = {
    dopamine: {
      label: '활동적인 코스',
      color: '#c678ff',
      desc: '스몹, 체험형 공간처럼 몸을 쓰거나 텐션을 올릴 수 있는 장소를 더 높게 봅니다.'
    },
    oxytocin: {
      label: '편안한 코스',
      color: '#55d6be',
      desc: '카페, 도서관, 스파처럼 오래 머물기 좋고 피로가 낮은 장소를 더 높게 봅니다.'
    },
    spark: {
      label: '사진 남기기',
      color: '#ff758c',
      desc: '비주얼이 좋고 기록하기 좋은 매장과 포토 스팟을 더 높게 봅니다.'
    },
    telepathy: {
      label: '조용한 대화',
      color: '#3bd1ff',
      desc: '소음이 덜하고 대화하기 좋은 카페, 음악, 산책형 장소를 더 높게 봅니다.'
    },
    lucky: {
      label: '랜덤 추천',
      color: '#ffd23f',
      desc: '기본 점수에 작은 변화를 주어 평소와 다른 조합을 시도합니다.'
    }
  };

  return details[catalystKey] || {
    label: '기본 추천',
    color: 'var(--text-muted)',
    desc: '현재는 MBTI, 예산, 날씨, 혼잡도 기준으로만 추천합니다.'
  };
};

export const buildRouteAnalysis = ({
  selectedRestaurant,
  selectedCafe,
  selectedActivity,
  boyfriendMbti,
  girlfriendMbti,
  budgetInput,
  dateType,
  weather = DEFAULT_WEATHER,
  crowd = DEFAULT_CROWD
}) => {
  const stops = [selectedRestaurant, selectedCafe, selectedActivity].filter(Boolean);
  const hasFullCourse = stops.length === COURSE_CATEGORIES.length;
  const starfieldOnly = hasFullCourse && isStarfieldCourse(stops);
  const domainBadge = starfieldOnly ? '스타필드 수원 실내 코스' : '외부 이동 포함 코스';
  const badgeClass = starfieldOnly ? 'badge-starfield' : 'badge-external';
  const compatibilityMetrics = getCompatibilityMetrics(boyfriendMbti, girlfriendMbti);
  const compatibilityTip = getCompatibilityTip(boyfriendMbti, girlfriendMbti);

  if (!hasFullCourse) {
    return {
      matchRate: 75,
      domainBadge,
      badgeClass,
      sections: [],
      compatibilityMetrics,
      compatibilityTip
    };
  }

  const perPersonTotal = stops.reduce((sum, stop) => sum + stop.cost, 0);
  const floorNumbers = stops.map(stop => stop.floor).filter(floor => Number.isFinite(floor));
  const floorDiff = floorNumbers.length ? Math.max(...floorNumbers) - Math.min(...floorNumbers) : 0;
  const budgetFit = Number(budgetInput) > 0 ? clamp(1 - Math.max(0, perPersonTotal - budgetInput) / budgetInput, 0, 1) : 0;
  const movementBonus = starfieldOnly ? clamp(1 - floorDiff / 10, 0.65, 1) : 0.76;
  const comfortPenalty = crowd === 'peak' ? 0.05 : 0;
  const weatherBonus = (weather === 'rainy' || weather === 'cold') && starfieldOnly ? 0.05 : 0;
  const matchRate = clamp(Math.round((0.78 + budgetFit * 0.12 + movementBonus * 0.08 + weatherBonus - comfortPenalty) * 100), 75, 99);

  const sections = [];
  if (weather === 'rainy') {
    sections.push({
      title: '날씨 반영',
      label: '비 오는 날',
      body: '실외 이동 피로가 큰 날이라 실내 이동 점수를 높였습니다. 우산을 펴고 접는 구간을 줄이는 방향으로 추천했습니다.'
    });
  } else if (weather === 'cold') {
    sections.push({
      title: '날씨 반영',
      label: '추운 날',
      body: '외부 이동보다 따뜻한 실내에 오래 머무는 편이 좋은 날입니다. 이동 거리가 짧고 실내 체류 시간이 긴 장소를 우선했습니다.'
    });
  } else {
    sections.push({
      title: '날씨 반영',
      label: '맑음',
      body: '날씨 부담이 낮아 기본 취향 점수와 동선 효율을 중심으로 계산했습니다.'
    });
  }

  if (crowd === 'peak') {
    sections.push({
      title: '혼잡도 반영',
      label: '혼잡',
      body: '인기 매장과 예약 필요 장소에는 대기 피로를 반영했습니다. 층 이동과 웨이팅 부담이 커지지 않도록 점수를 조정했습니다.'
    });
  } else if (crowd === 'quiet') {
    sections.push({
      title: '혼잡도 반영',
      label: '여유',
      body: '대기 부담이 낮은 시간대로 보고 예약제 장소와 인기 매장의 감점을 줄였습니다.'
    });
  } else {
    sections.push({
      title: '혼잡도 반영',
      label: '보통',
      body: '일반적인 주말 몰링 수준의 이동 피로를 기준으로 추천했습니다.'
    });
  }

  if (starfieldOnly) {
    const floorSummary = floorDiff === 0
      ? `${selectedRestaurant.floor}층에서 식사, 카페, 액티비티가 모두 이어집니다.`
      : `식사 ${selectedRestaurant.floor}층, 카페 ${selectedCafe.floor}층, 액티비티 ${selectedActivity.floor}층 순서입니다.`;

    sections.push({
      title: '동선 설계',
      label: '실내 이동',
      body: `${floorSummary} 바깥으로 나가지 않고 스타필드 수원 안에서 마무리할 수 있어 날씨와 이동 피로가 낮습니다.`
    });
  } else {
    sections.push({
      title: '동선 설계',
      label: '외부 이동',
      body: `총 이동 거리는 약 ${getCourseDistanceMeters(stops)}m로 계산했습니다. 실외 구간이 있으니 날씨가 나쁘면 실내 코스로 바꾸는 편이 좋습니다.`
    });
  }

  sections.push({
    title: '취향 반영',
    label: dateType.replace(/^\d+\.\s*/, ''),
    body: compatibilityTip
  });

  sections.push({
    title: '예산 확인',
    label: `1인 약 ${perPersonTotal.toLocaleString()}원`,
    body: `입력한 1인 예산 ${Number(budgetInput).toLocaleString()}원 기준으로 계산했습니다. 실제 주문 메뉴나 이용 시간에 따라 비용은 달라질 수 있습니다.`
  });

  return {
    matchRate,
    domainBadge,
    badgeClass,
    sections,
    compatibilityMetrics,
    compatibilityTip
  };
};
