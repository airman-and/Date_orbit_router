import { useState } from 'react';
import { PLACE_DB } from '../data/places';

// Parse individual MBTI to vector
export const parseMbti = (mbtiStr) => {
  const norm = String(mbtiStr).trim().toUpperCase();
  if (norm.length !== 4) return { E_I: 0.5, S_N: 0.5, T_F: 0.5, J_P: 0.5 };
  return {
    E_I: norm.includes('E') ? 1.0 : 0.0,
    S_N: norm.includes('S') ? 1.0 : 0.0,
    T_F: norm.includes('T') ? 1.0 : 0.0,
    J_P: norm.includes('J') ? 1.0 : 0.0
  };
};

// Calculate normalized couple MBTI
export const getCoupleMbti = (bf, gf) => {
  const m = parseMbti(bf);
  const f = parseMbti(gf);
  return {
    E_I: (m.E_I + f.E_I) / 2.0,
    S_N: (m.S_N + f.S_N) / 2.0,
    T_F: (m.T_F + f.T_F) / 2.0,
    J_P: (m.J_P + f.J_P) / 2.0
  };
};

// Mbti-to-planet logic
export const getDeterministicOrbit = (couple) => {
  // Planet A (Dining)
  let planet_a = "조용한 행성";
  if (couple.T_F < 0.4) {
    planet_a = "설렘 행성";
  } else if (couple.E_I > 0.6) {
    planet_a = "도파민 행성";
  }

  // Planet B (Cafe)
  let planet_b = couple.S_N > 0.5 ? "달콤 행성" : "조용한 행성";
  if (planet_b === planet_a) {
    planet_b = planet_a === "조용한 행성" ? "달콤 행성" : "조용한 행성";
  }

  // Planet C (Activity)
  let planet_c = "향기 행성";
  if (couple.E_I > 0.6) {
    planet_c = "도파민 행성";
  } else if (couple.S_N > 0.5 && couple.J_P < 0.5) {
    planet_c = "기록 행성";
  } else if (couple.J_P > 0.5) {
    planet_c = "선물 행성";
  }

  const used = new Set([planet_a, planet_b]);
  if (used.has(planet_c)) {
    const fallbacks = ["기록 행성", "도파민 행성", "선물 행성", "향기 행성"];
    for (const f of fallbacks) {
      if (!used.has(f)) {
        planet_c = f;
        break;
      }
    }
  }

  return [planet_a, planet_b, planet_c];
};

export const scorePlace = (node, currentNode, couple, type, remaining, weather, crowd, catalyst = null) => {
  if (node.cost > remaining) return -999.0;

  // MBTI scoring distance
  const mbtiDist = (
    Math.abs(couple.E_I - node.E_I) * 1.2 +
    Math.abs(couple.S_N - node.S_N) * 1.0 +
    Math.abs(couple.T_F - node.T_F) * 1.0
  );
  let mbtiScore = 30.0 - (mbtiDist * 8.0);

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

  // Preset rules
  let presetScore = 0.0;
  if (type === "1. 설렘 반 어색 반 (초기 커플)") {
    if (node.category === "액티비티" || node.tag === "전시/예술" || node.tag === "음악/전시") {
      presetScore += 15.0;
    }
    if (node.S_N < 0.4) presetScore += 8.0;
  } else if (type === "2. 인스타 하이라이트 (트렌드 세터)") {
    presetScore += node.instagram_score * 3.0;
    if (node.S_N < 0.4) presetScore += 5.0;
    if (node.T_F < 0.4) presetScore += 5.0;
  } else if (type === "3. 만사 귀찮음 (릴랙스 힐링)") {
    presetScore += node.comfort_score * 3.5;
    presetScore += (5.0 - node.energy) * 4.0;
  } else if (type === "4. 파이팅 넘치는 (이색 도전)") {
    presetScore += node.energy * 6.0;
    if (node.category === "액티비티") presetScore += 10.0;
  }

  // Live Crowd Penalty
  if (crowd === 'peak') {
    if (node.booking_required) mbtiScore -= 10.0; // Harder to get in
    if (node.instagram_score >= 9) presetScore -= 8.0; // Extreme wait times
  } else if (crowd === 'quiet') {
    if (node.booking_required) mbtiScore += 5.0; // Easier bookings
  }

  // Physical travel fatigue penalty
  let routingPenalty = 0.0;
  if (currentNode) {
    const isSameSpace = currentNode.space_type === node.space_type;
    if (isSameSpace && node.space_type === "Starfield_Suwon") {
      const floorGap = Math.abs(currentNode.floor - node.floor);
      let multiplier = type === "3. 만사 귀찮음 (릴랙스 힐링)" ? 8.0 : 4.0;
      if (crowd === 'peak') multiplier += 2.0; // Crowded elevators add fatigue
      routingPenalty += floorGap * multiplier;
      routingPenalty -= 10.0; // Mall compression bonus

      if (node.name.startsWith("별마당 도서관")) {
        routingPenalty -= 15.0;
      }
    } else {
      let dist = Math.sqrt(Math.pow(currentNode.lat - node.lat, 2) + Math.pow(currentNode.lng - node.lng, 2)) * 100;
      
      // Live Weather Penalty
      let weatherMultiplier = 3.5;
      if (weather === 'rainy' || weather === 'cold') {
        weatherMultiplier = 8.0; // Outdoor walking is highly exhausting in rain/cold
        routingPenalty += 50.0;  // High friction leaving the warm, dry mall
      }
      
      routingPenalty += dist * weatherMultiplier;
      if (currentNode.space_type !== node.space_type) {
        routingPenalty += 30.0;
      }
    }
  } else {
    // Starting Node Egress penalty in bad weather
    if ((weather === 'rainy' || weather === 'cold') && node.space_type === 'External') {
      routingPenalty += 60.0;
    }
  }

  // Destiny Catalyst Scoring Boosts
  let catalystScore = 0.0;
  if (catalyst === 'dopamine') {
    if (node.category === '액티비티' || node.energy >= 4) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'oxytocin') {
    if (node.comfort_score >= 8 || node.tag?.includes('힐링') || node.tag?.includes('카페') || node.name.includes('스파') || node.name.includes('도서관')) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'spark') {
    if (node.instagram_score >= 8 || node.tag?.includes('감성') || node.tag?.includes('인생네컷') || node.tag?.includes('철판') || node.tag?.includes('베이글') || node.tag?.includes('전시')) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'telepathy') {
    if (node.E_I < 0.4 || node.tag?.includes('북카페') || node.tag?.includes('음악') || node.tag?.includes('산책')) {
      catalystScore += 18.0;
    }
  } else if (catalyst === 'lucky') {
    const hash = (node.name.charCodeAt(0) + node.name.charCodeAt(node.name.length - 1)) % 20;
    catalystScore += (hash - 10) * 1.5; // [-15, +15] dynamic score shuffler
  }

  const finalScore = mbtiScore + presetScore + catalystScore - routingPenalty;
  return Math.round(finalScore * 10) / 10;
};

export const useDateOrbit = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [totalBudgetSpent, setTotalBudgetSpent] = useState(0);

  const calculateCourse = (boyfriend, girlfriend, budget, type, topo, weather, crowd, planetOrder, catalyst = null) => {
    const couple = getCoupleMbti(boyfriend, girlfriend);
    const currentTargetSpace = topo.includes("스타필드 수원") ? "Starfield_Suwon" : "External";
    let currentBudget = budget;

    // Use current customized planet order or fallback to deterministic
    const activePlanets = planetOrder && planetOrder.length === 3 ? planetOrder : getDeterministicOrbit(couple);

    // Dynamic categorizations based on planet theme rules
    const getPlanetCategory = (planetName) => {
      if (planetName === "설렘 행성" || planetName === "조용한 행성") return ["식사", "카페"];
      if (planetName === "달콤 행성") return ["카페"];
      if (planetName === "도파민 행성") return ["식사", "액티비티"];
      if (planetName === "기록 행성" || planetName === "선물 행성" || planetName === "향기 행성") return ["액티비티"];
      return ["식사", "카페", "액티비티"];
    };

    // To ensure a full course, we match: Stop 1 = 식사, Stop 2 = 카페, Stop 3 = 액티비티
    
    // Stop 1: Dining (Category = 식사)
    const restCandidates = PLACE_DB.filter(p => p.category === "식사" && p.space_type === currentTargetSpace && p.cost <= currentBudget);
    let selectedRest = null;
    if (restCandidates.length === 0) {
      selectedRest = PLACE_DB.filter(p => p.category === "식사")[0];
    } else {
      const scored = restCandidates.map(node => ({
        node,
        score: scorePlace(node, null, couple, type, currentBudget, weather, crowd, catalyst)
      })).filter(x => x.score > -500);
      scored.sort((a, b) => b.score - a.score);
      const top3 = scored.slice(0, 3);
      selectedRest = top3[Math.floor(Math.random() * top3.length)]?.node || scored[0]?.node;
    }

    let budgetLeft = currentBudget - (selectedRest ? selectedRest.cost : 0);

    // Stop 2: Cafe (Category = 카페)
    const cafeCandidates = PLACE_DB.filter(p => p.category === "카페" && p.space_type === currentTargetSpace && p.cost <= budgetLeft);
    let selectedCf = null;
    if (cafeCandidates.length === 0) {
      selectedCf = PLACE_DB.filter(p => p.category === "카페")[0];
    } else {
      const scored = cafeCandidates.map(node => ({
        node,
        score: scorePlace(node, selectedRest, couple, type, budgetLeft, weather, crowd, catalyst)
      })).filter(x => x.score > -500);
      scored.sort((a, b) => b.score - a.score);
      const top3 = scored.slice(0, 3);
      selectedCf = top3[Math.floor(Math.random() * top3.length)]?.node || scored[0]?.node;
    }

    budgetLeft -= (selectedCf ? selectedCf.cost : 0);

    // Stop 3: Activity (Category = 액티비티)
    const actCandidates = PLACE_DB.filter(p => p.category === "액티비티" && p.space_type === currentTargetSpace && p.cost <= budgetLeft);
    let selectedAct = null;
    if (actCandidates.length === 0) {
      selectedAct = PLACE_DB.filter(p => p.category === "액티비티")[0];
    } else {
      const scored = actCandidates.map(node => ({
        node,
        score: scorePlace(node, selectedCf, couple, type, budgetLeft, weather, crowd, catalyst)
      })).filter(x => x.score > -500);
      scored.sort((a, b) => b.score - a.score);
      const top3 = scored.slice(0, 3);
      selectedAct = top3[Math.floor(Math.random() * top3.length)]?.node || scored[0]?.node;
    }

    setSelectedRestaurant(selectedRest);
    setSelectedCafe(selectedCf);
    setSelectedActivity(selectedAct);

    const cost2p = ((selectedRest ? selectedRest.cost : 0) + (selectedCf ? selectedCf.cost : 0) + (selectedAct ? selectedAct.cost : 0)) * 2;
    setTotalBudgetSpent(cost2p);
  };

  return {
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    totalBudgetSpent,
    calculateCourse
  };
};
