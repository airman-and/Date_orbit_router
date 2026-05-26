import { useCallback, useState } from 'react';
import { calculateDateCourse } from '../domain/dateOrbit';

export {
  answersToMbti,
  buildRouteAnalysis,
  calculateDateCourse,
  getCatalystDetail,
  getCompatibilityMetrics,
  getCompatibilityTip,
  getCoupleMbti,
  getDeterministicOrbit,
  isValidMbti,
  parseMbti,
  pickCourseStop,
  scorePlace
} from '../domain/dateOrbit';

export const useDateOrbit = () => {
  const [course, setCourse] = useState({
    selectedRestaurant: null,
    selectedCafe: null,
    selectedActivity: null,
    totalBudgetSpent: 0,
    planetOrder: []
  });

  const calculateCourse = useCallback((
    boyfriendMbti,
    girlfriendMbti,
    budget,
    dateType,
    zonePreference,
    weather,
    crowd,
    planetOrder,
    catalyst = null,
    randomFn = Math.random
  ) => {
    const nextCourse = calculateDateCourse({
      boyfriendMbti,
      girlfriendMbti,
      budget,
      dateType,
      zonePreference,
      weather,
      crowd,
      planetOrder,
      catalyst,
      randomFn
    });

    setCourse(nextCourse);
    return nextCourse;
  }, []);

  return {
    ...course,
    calculateCourse
  };
};
