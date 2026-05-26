# React Developer Guide

이 문서는 현재 `Date Orbit Router`의 유지보수 기준을 정리합니다. 앱의 제품 방향은 스타필드 수원 공식 자산을 사용하는 데이트 코스 키오스크입니다.

## 상태 관리

- `App.jsx`는 진행 단계, 사용자 입력, 추천 결과를 조합하는 상위 컨테이너 역할만 담당합니다.
- 추천 결과에서 파생되는 `matchRate`, 구역 배지, 분석 문구는 `src/domain/dateOrbit.js`의 순수 함수로 계산합니다.
- 로딩 대기는 `900ms`로 제한하고, 계산 결과는 준비되는 즉시 결과 화면으로 넘깁니다.

## 도메인 로직

- MBTI 파싱, 커플 성향 벡터, 장소 점수, 코스 선택, 결과 분석은 `src/domain/dateOrbit.js`에 모았습니다.
- 추천 선택은 `randomFn`을 주입받을 수 있어 테스트에서 같은 결과를 재현할 수 있습니다.
- 분석 문구는 HTML 문자열이 아니라 구조화된 객체 배열로 반환하고, React 컴포넌트가 JSX로 렌더링합니다.

## 컴포넌트 구조

- `BalanceGame.jsx`: 온보딩 밸런스 게임과 직접 MBTI 입력.
- `RouteSidebar.jsx`: 결과 화면의 조건 조정 폼.
- `RouteSummary.jsx`: 오늘의 추천 코스 요약.
- `RouteConditionsPanel.jsx`: 날씨와 혼잡도 조정.
- `KioskTimeline.jsx`: 식사, 카페, 액티비티 상세 동선.
- `RouteInsights.jsx`: 추천 이유와 커플 성향 리포트.
- `OrbitVisualizer.jsx`: 코스 테마 순서 조정용 보조 비주얼.

## 스타일 구조

- `src/index.css`는 CSS entrypoint이며 세 파일만 import합니다.
- `src/styles/tokens.css`: 색상, 폰트, 기본 reset.
- `src/styles/layout.css`: 앱 레이아웃, 사이드바, 히어로.
- `src/styles/components.css`: 카드, 버튼, 온보딩, 결과, 타임라인, 리포트.
- 클릭 가능한 카드와 버튼은 기울어짐 없이 배경, 테두리, 밝기 변화만 사용합니다.

## 품질 기준

- `npm run lint`로 React hooks와 기본 코드 품질을 확인합니다.
- `npm run test:run`으로 도메인 함수와 주요 컴포넌트 흐름을 검증합니다.
- `npm run build`로 Vite production build를 확인합니다.
