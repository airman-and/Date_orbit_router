import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PLACE_DB, PLANETS } from './data/places';
import {
  answersToMbti,
  buildRouteAnalysis,
  getCoupleMbti,
  getDeterministicOrbit,
  estimateEnvironmentalConditions
} from './domain/dateOrbit';
import { useDateOrbit } from './hooks/useDateOrbit';
import { playSFX } from './utils/sfx';
import BalanceGame from './components/BalanceGame';
import DoomEasterEgg from './components/DoomEasterEgg';
import KioskTimeline from './components/KioskTimeline';
import LoadingRoute from './components/LoadingRoute';
import OrbitVisualizer from './components/OrbitVisualizer';
import RouteConditionsPanel from './components/RouteConditionsPanel';
import RouteInsights from './components/RouteInsights';
import RouteSidebar from './components/RouteSidebar';
import RouteSummary from './components/RouteSummary';
import SpaceHero from './components/SpaceHero';
import StoreDirectoryPanel from './components/StoreDirectoryPanel';

const ROUTE_LOADING_DELAY_MS = 5000;
const DEFAULT_BF_ANSWERS = { q1: 'A', q2: 'A', q3: 'B', q4: 'A' };
const DEFAULT_GF_ANSWERS = { q1: 'B', q2: 'B', q3: 'A', q4: 'B' };
const DEFAULT_DATE_TYPE = '1. 설렘 반 어색 반 (초기 커플)';
const DEFAULT_ZONE = '스타필드 수원 올인원 몰링 코스 (실내)';
const DOOM_SEQUENCE = 'DOOM';

export default function App() {
  const [step, setStep] = useState(0);
  const [onboardingMode, setOnboardingMode] = useState('game');
  const [gameStep, setGameStep] = useState(0);
  const [gameTurn, setGameTurn] = useState('boyfriend');
  const [bfAnswers, setBfAnswers] = useState(DEFAULT_BF_ANSWERS);
  const [gfAnswers, setGfAnswers] = useState(DEFAULT_GF_ANSWERS);

  const [boyfriendMbti, setBoyfriendMbti] = useState('INFJ');
  const [girlfriendMbti, setGirlfriendMbti] = useState('ENFP');
  const [budgetInput, setBudgetInput] = useState(100000);
  const [dateType, setDateType] = useState(DEFAULT_DATE_TYPE);
  const [zonePreference, setZonePreference] = useState(DEFAULT_ZONE);
  const [currentDate] = useState(() => new Date());
  const env = useMemo(() => estimateEnvironmentalConditions(currentDate), [currentDate]);
  const weather = env.weather;
  const crowd = env.crowd;
  const [planetOrder, setPlanetOrder] = useState([]);
  const [mealStatus, setMealStatus] = useState('hungry');
  const [catalyst, setCatalyst] = useState(null);
  const [isDoomOpen, setIsDoomOpen] = useState(false);
  const loadingTimerRef = useRef(null);
  const doomSequenceRef = useRef('');

  const {
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    totalBudgetSpent,
    calculateCourse
  } = useDateOrbit();

  const resolvedPlanetOrder = useMemo(() => {
    const validPlanets = ['대화의 밀도 궤도', '취향의 확장 궤도', '관계의 박제 궤도'];
    const isValid = planetOrder.length === 3 && planetOrder.every(p => validPlanets.includes(p));
    if (isValid) return planetOrder;
    return getDeterministicOrbit(getCoupleMbti(boyfriendMbti, girlfriendMbti), mealStatus);
  }, [boyfriendMbti, girlfriendMbti, planetOrder, mealStatus]);

  const triggerCalculation = useCallback((orderOverride = null, catalystOverride = undefined) => {
    const activeCatalyst = catalystOverride !== undefined ? catalystOverride : catalyst;
    const activeOrder = orderOverride || resolvedPlanetOrder;

    return calculateCourse(
      boyfriendMbti,
      girlfriendMbti,
      budgetInput,
      dateType,
      zonePreference,
      weather,
      crowd,
      activeOrder,
      activeCatalyst,
      mealStatus
    );
  }, [
    boyfriendMbti,
    girlfriendMbti,
    budgetInput,
    dateType,
    zonePreference,
    weather,
    crowd,
    resolvedPlanetOrder,
    catalyst,
    calculateCourse,
    mealStatus
  ]);

  useEffect(() => {
    if (step === 2) {
      triggerCalculation();
    }
  }, [step, triggerCalculation]);

  useEffect(() => () => {
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const handleDoomSequence = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
        return;
      }

      const nextSequence = `${doomSequenceRef.current}${event.key.toUpperCase()}`.slice(-DOOM_SEQUENCE.length);
      doomSequenceRef.current = nextSequence;

      if (nextSequence === DOOM_SEQUENCE) {
        doomSequenceRef.current = '';
        setIsDoomOpen(true);
        playSFX('success');
      }
    };

    window.addEventListener('keydown', handleDoomSequence);
    return () => window.removeEventListener('keydown', handleDoomSequence);
  }, []);


  const handlePlanetOrderChange = (newOrder) => {
    setPlanetOrder(newOrder);
    triggerCalculation(newOrder);
  };

  const handleStartCalculations = () => {
    playSFX('click');
    setStep(1);
    setCatalyst(null);

    const initialOrder = getDeterministicOrbit(getCoupleMbti(boyfriendMbti, girlfriendMbti), mealStatus);
    setPlanetOrder(initialOrder);

    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }

    loadingTimerRef.current = window.setTimeout(() => {
      calculateCourse(
        boyfriendMbti,
        girlfriendMbti,
        budgetInput,
        dateType,
        zonePreference,
        weather,
        crowd,
        initialOrder,
        null,
        mealStatus
      );
      setStep(2);
      playSFX('success');
    }, ROUTE_LOADING_DELAY_MS);
  };

  const handleReset = () => {
    playSFX('click');
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }
    setStep(0);
    setGameStep(0);
    setGameTurn('boyfriend');
    setBfAnswers(DEFAULT_BF_ANSWERS);
    setGfAnswers(DEFAULT_GF_ANSWERS);
    setPlanetOrder([]);
    setCatalyst(null);
  };

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

    if (gameTurn === 'girlfriend') {
      const nextAnswers = { ...gfAnswers, [questionKey]: optionValue };
      setGfAnswers(nextAnswers);

      if (gameStep === 3) {
        setGirlfriendMbti(answersToMbti(nextAnswers));
        setGameTurn('complete');
      } else {
        setGameStep(prev => prev + 1);
      }
    }
  };

  const routeAnalysis = useMemo(() => buildRouteAnalysis({
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    boyfriendMbti,
    girlfriendMbti,
    budgetInput,
    dateType,
    weather,
    crowd
  }), [
    selectedRestaurant,
    selectedCafe,
    selectedActivity,
    boyfriendMbti,
    girlfriendMbti,
    budgetInput,
    dateType,
    weather,
    crowd
  ]);

  const hasResults = step === 2 && selectedRestaurant && selectedCafe && selectedActivity;

  return (
    <div className="app-container">
      <div className="space-nebula-wrapper" aria-hidden="true">
        <div className="nebula nebula-pink"></div>
        <div className="nebula nebula-blue"></div>
        <div className="starsstars stars-1"></div>
        <div className="starsstars stars-2"></div>
        <div className="starsstars stars-3"></div>
      </div>

      <RouteSidebar
        step={step}
        boyfriendMbti={boyfriendMbti}
        girlfriendMbti={girlfriendMbti}
        budgetInput={budgetInput}
        dateType={dateType}
        zonePreference={zonePreference}
        onBoyfriendChange={setBoyfriendMbti}
        onGirlfriendChange={setGirlfriendMbti}
        onBudgetChange={setBudgetInput}
        onDateTypeChange={setDateType}
        onZonePreferenceChange={setZonePreference}
      />

      <main className="main-content">
        <SpaceHero step={step} />

        {step !== 1 && (
          <div className="wizard-steps" aria-label="진행 단계">
            <div className={`wizard-step-item ${step === 0 ? 'active' : 'completed'}`}>
              <div className="wizard-num">1</div> 커플 성향과 데이트 조건 선택
            </div>
            <div className="wizard-divider"></div>
            <div className={`wizard-step-item ${step === 2 ? 'active' : ''}`}>
              <div className="wizard-num">2</div> 오늘의 추천 코스 확인
            </div>
          </div>
        )}

        {step === 0 && (
          <BalanceGame
            gameStep={gameStep}
            gameTurn={gameTurn}
            onGameSelect={handleGameSelect}
            onReset={handleReset}
            boyfriendMbti={boyfriendMbti}
            girlfriendMbti={girlfriendMbti}
            onBoyfriendChange={setBoyfriendMbti}
            onGirlfriendChange={setGirlfriendMbti}
            onboardingMode={onboardingMode}
            onOnboardingModeChange={setOnboardingMode}
            budgetInput={budgetInput}
            onBudgetChange={setBudgetInput}
            dateType={dateType}
            onDateTypeChange={setDateType}
            zonePreference={zonePreference}
            onZonePreferenceChange={setZonePreference}
            onStart={handleStartCalculations}
            mealStatus={mealStatus}
            onMealStatusChange={setMealStatus}
          />
        )}

        {step === 1 && <LoadingRoute />}

        {hasResults && (
          <div className="results-dashboard">
            <RouteSummary
              selectedRestaurant={selectedRestaurant}
              selectedCafe={selectedCafe}
              selectedActivity={selectedActivity}
            />

            <RouteConditionsPanel
              dateText={env.formattedDate}
              weatherLabel={env.weatherLabel}
              weatherReason={env.weatherReason}
              crowdLabel={env.crowdLabel}
              crowdReason={env.crowdReason}
            />

            {resolvedPlanetOrder.length === 3 && (
              <OrbitVisualizer
                planetOrder={resolvedPlanetOrder}
                planetsData={PLANETS}
                onPlanetOrderChange={handlePlanetOrderChange}
              />
            )}

            <KioskTimeline
              selectedRestaurant={selectedRestaurant}
              selectedCafe={selectedCafe}
              selectedActivity={selectedActivity}
              totalBudgetSpent={totalBudgetSpent}
              budgetInput={budgetInput}
              planetOrder={resolvedPlanetOrder}
              domainBadge={routeAnalysis.domainBadge}
              badgeClass={routeAnalysis.badgeClass}
              matchRate={routeAnalysis.matchRate}
              catalyst={catalyst}
              onCatalystChange={(nextCatalyst) => {
                setCatalyst(nextCatalyst);
                triggerCalculation(null, nextCatalyst);
              }}
              boyfriendMbti={boyfriendMbti}
              girlfriendMbti={girlfriendMbti}
              mealStatus={mealStatus}
            />

            <RouteInsights
              sections={routeAnalysis.sections}
              compatibilityMetrics={routeAnalysis.compatibilityMetrics}
              boyfriendMbti={boyfriendMbti}
              girlfriendMbti={girlfriendMbti}
            />

            <StoreDirectoryPanel />

            <div className="action-buttons-row">
              <button className="btn-stretch btn-secondary" type="button" onClick={() => window.print()}>
                🖨️ 오늘의 동선 연산서 인쇄 / PDF 저장
              </button>
              <button className="btn-stretch" type="button" onClick={handleReset}>
                처음부터 다시 선택하기
              </button>
            </div>
          </div>
        )}

        {step === 2 && !hasResults && (
          <div style={{ padding: '20px', border: '2px solid #ff0055', margin: '20px 0', color: '#ff0055', backgroundColor: 'rgba(255,0,85,0.08)', borderRadius: '8px', zIndex: 99999, position: 'relative' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>⚠️ 데이트 코스 연산 실패</h3>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>결과 객체 상태:</p>
            <ul style={{ fontSize: '0.8rem', paddingLeft: '20px', margin: '6px 0' }}>
              <li>step: {step}</li>
              <li>selectedRestaurant: {selectedRestaurant ? selectedRestaurant.name : 'null (Stop 1 연산 실패)'}</li>
              <li>selectedCafe: {selectedCafe ? selectedCafe.name : 'null (Stop 2 연산 실패)'}</li>
              <li>selectedActivity: {selectedActivity ? selectedActivity.name : 'null (Stop 3 연산 실패)'}</li>
              <li>planetOrder: {JSON.stringify(planetOrder)}</li>
              <li>resolvedPlanetOrder: {JSON.stringify(resolvedPlanetOrder)}</li>
              <li>boyfriendMbti: {boyfriendMbti}</li>
              <li>girlfriendMbti: {girlfriendMbti}</li>
              <li>budgetInput: {budgetInput}</li>
              <li>zonePreference: {zonePreference}</li>
              <li>DB 총 갯수: {PLACE_DB?.length}</li>
              <li>대화의 밀도 갯수: {PLACE_DB?.filter(p => p.category === '대화의 밀도').length}</li>
              <li>취향의 확장 갯수: {PLACE_DB?.filter(p => p.category === '취향의 확장').length}</li>
              <li>관계의 박제 갯수: {PLACE_DB?.filter(p => p.category === '관계의 박제').length}</li>
            </ul>
          </div>
        )}
      </main>

      <DoomEasterEgg isOpen={isDoomOpen} onClose={() => setIsDoomOpen(false)} />
    </div>
  );
}
