export const STARFIELD_DIRECTORY_VERSION = '2025-08-user-provided';

export const DIRECTORY_DATA_POLICY = [
  '입력받은 2025년 8월 기준 매장명을 원문 우선으로 수록한다.',
  '층과 존이 명시된 경우에만 floor, zone에 기록하고, 추정 정보는 넣지 않는다.',
  '각주 번호와 팝업 종료일 같은 원문 부가 정보는 notes에 보존한다.',
  '전체 매장 디렉터리와 데이트 코스 추천 후보는 분리한다.',
  '추천 후보로 쓰려면 카테고리, 예상 비용, 체류 시간, 예약 필요 여부, 층 이동 피로도, 취향 태그가 확인되어야 한다.'
];

export const RECOMMENDATION_ELIGIBILITY_CRITERIA = [
  { key: 'role', label: '데이트 역할', detail: '식사, 카페, 액티비티 중 하나로 명확히 분류 가능해야 한다.' },
  { key: 'budget', label: '예산 추정', detail: '1인 평균 비용 또는 무료 여부가 확인되어야 추천 계산에 넣는다.' },
  { key: 'dwellTime', label: '체류 가치', detail: '커플이 최소 20분 이상 머무르며 대화, 식사, 체험, 기록 중 하나를 할 수 있어야 한다.' },
  { key: 'routing', label: '동선 정보', detail: '층 또는 구역이 명확해야 날씨와 혼잡도에 따른 피로도 계산이 가능하다.' },
  { key: 'preference', label: '취향 태그', detail: '조용함, 활동성, 사진성, 편안함, 예약 필요 여부 같은 추천 속성이 확인되어야 한다.' },
  { key: 'exclusion', label: '제외 기준', detail: '단순 구매 목적 매장은 기본 추천에서 제외하고, 선물/기록/라이프스타일 목적이 분명할 때만 액티비티 후보로 승격한다.' }
];

export const STARFIELD_DIRECTORY = [
  {
    "id": "sf-001",
    "name": "배스킨라빈스",
    "category": "카페/레스토랑",
    "floor": "B2F",
    "zone": "",
    "notes": [
      "11"
    ]
  },
  {
    "id": "sf-002",
    "name": "T-cafe",
    "category": "카페/레스토랑",
    "floor": "B2F",
    "zone": "",
    "notes": [
      "12"
    ]
  },
  {
    "id": "sf-003",
    "name": "스타벅스 1F",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-004",
    "name": "노티드",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-005",
    "name": "슈퍼말차",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-006",
    "name": "보난자로스터즈",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-007",
    "name": "공차",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-008",
    "name": "소금집델리",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-009",
    "name": "벤슨",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-010",
    "name": "삼진어묵",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-011",
    "name": "달마시안",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-012",
    "name": "본누벨 베이커리",
    "category": "카페/레스토랑",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-013",
    "name": "호호식당",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-014",
    "name": "핫쵸",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-015",
    "name": "효뜨",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-016",
    "name": "육당헌",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-017",
    "name": "어슬청담",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-018",
    "name": "정지영커피로스터즈",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-019",
    "name": "이페메라",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-020",
    "name": "런던베이글뮤지엄",
    "category": "카페/레스토랑",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": [
      "13"
    ]
  },
  {
    "id": "sf-021",
    "name": "로로아눅",
    "category": "카페/레스토랑",
    "floor": "3F",
    "zone": "",
    "notes": [
      "14"
    ]
  },
  {
    "id": "sf-022",
    "name": "앤티앤스 프레젤",
    "category": "카페/레스토랑",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-023",
    "name": "미루꾸 쿠키바 카페",
    "category": "카페/레스토랑",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-024",
    "name": "포컬포인트",
    "category": "카페/레스토랑",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-025",
    "name": "인크 커피",
    "category": "카페/레스토랑",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-026",
    "name": "타임체임버 바이 스템커피",
    "category": "카페/레스토랑",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-027",
    "name": "에이븐하우스",
    "category": "카페/레스토랑",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-028",
    "name": "바이닐",
    "category": "카페/레스토랑",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-029",
    "name": "미이츠키",
    "category": "카페/레스토랑",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-030",
    "name": "스타벅스 6F점",
    "category": "카페/레스토랑",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-031",
    "name": "성산명가",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-032",
    "name": "갓덴스시",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-033",
    "name": "선재",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-034",
    "name": "키이로",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-035",
    "name": "이병태함흥냉면",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-036",
    "name": "솥밥예찬",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-037",
    "name": "삐삣버거",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-038",
    "name": "정육면체",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-039",
    "name": "멘쇼큐",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-040",
    "name": "한와담",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-041",
    "name": "쿠차라",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": [
      "팝업 ~27.03.02"
    ]
  },
  {
    "id": "sf-042",
    "name": "버니파스타",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-043",
    "name": "촙촙",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-044",
    "name": "우마",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-045",
    "name": "포포유",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-046",
    "name": "정성돈가스",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-047",
    "name": "서호김밥",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-048",
    "name": "폴바셋",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-049",
    "name": "빠우",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": [
      "15"
    ]
  },
  {
    "id": "sf-050",
    "name": "아메리칸트레일러",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-051",
    "name": "차이797",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-052",
    "name": "금금",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-053",
    "name": "아그라",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-054",
    "name": "아웃백 스테이크하우스",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-055",
    "name": "스탬커피",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-056",
    "name": "클레 포레스트",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": [
      "16"
    ]
  },
  {
    "id": "sf-057",
    "name": "젤라떼리아 도도",
    "category": "카페/레스토랑",
    "floor": "7F",
    "zone": "잇토피아",
    "notes": []
  },
  {
    "id": "sf-058",
    "name": "메가박스 수원스타필드",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "17"
    ]
  },
  {
    "id": "sf-059",
    "name": "스몹 수원",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-060",
    "name": "콩코드 수원",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "18"
    ]
  },
  {
    "id": "sf-061",
    "name": "TGX",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "19"
    ]
  },
  {
    "id": "sf-062",
    "name": "바이닐 수원",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "20"
    ]
  },
  {
    "id": "sf-063",
    "name": "펀시티",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "21"
    ]
  },
  {
    "id": "sf-064",
    "name": "별마당 도서관",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-065",
    "name": "챔피언 더 블랙벨트",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "22"
    ]
  },
  {
    "id": "sf-066",
    "name": "상상스케치",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-067",
    "name": "슬코",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-068",
    "name": "째깍섬",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-069",
    "name": "펫파크",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-070",
    "name": "영풍문고",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-071",
    "name": "펀스퀘어",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "23"
    ]
  },
  {
    "id": "sf-072",
    "name": "타임체임버",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "24"
    ]
  },
  {
    "id": "sf-073",
    "name": "플레이인더박스",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "25"
    ]
  },
  {
    "id": "sf-074",
    "name": "모나미스토어",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "26"
    ]
  },
  {
    "id": "sf-075",
    "name": "팝마트",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-076",
    "name": "버터",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-077",
    "name": "포토이즘박스",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "27"
    ]
  },
  {
    "id": "sf-078",
    "name": "클래스콕",
    "category": "엔터테인먼트",
    "floor": "복합",
    "zone": "",
    "notes": [
      "28"
    ]
  },
  {
    "id": "sf-079",
    "name": "탑텐",
    "category": "SPA",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-080",
    "name": "ZARA",
    "category": "SPA",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": [
      "29"
    ]
  },
  {
    "id": "sf-081",
    "name": "마시모두띠",
    "category": "SPA",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-082",
    "name": "COS",
    "category": "SPA",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-083",
    "name": "ARKET",
    "category": "SPA",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-084",
    "name": "H&M",
    "category": "SPA",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": [
      "30"
    ]
  },
  {
    "id": "sf-085",
    "name": "에잇세컨즈",
    "category": "SPA",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-086",
    "name": "SPAO",
    "category": "SPA",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-087",
    "name": "탑텐 키즈",
    "category": "SPA",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-088",
    "name": "미쏘",
    "category": "SPA",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-089",
    "name": "유니클로",
    "category": "SPA",
    "floor": "4F",
    "zone": "",
    "notes": [
      "31"
    ]
  },
  {
    "id": "sf-090",
    "name": "무신사 스탠다드",
    "category": "SPA",
    "floor": "5F",
    "zone": "",
    "notes": [
      "32"
    ]
  },
  {
    "id": "sf-091",
    "name": "레이브",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-092",
    "name": "LCDC",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-093",
    "name": "더일마",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": [
      "34"
    ]
  },
  {
    "id": "sf-094",
    "name": "시야쥬",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-095",
    "name": "루에브르",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-096",
    "name": "보카바카",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-097",
    "name": "더 유닛",
    "category": "영캐주얼/도메스틱",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-098",
    "name": "EE PLACE",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": [
      "35"
    ]
  },
  {
    "id": "sf-099",
    "name": "아크메드라비",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-100",
    "name": "브라운브레스",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-101",
    "name": "Lee",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-102",
    "name": "코드그라피",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-103",
    "name": "마하그리드",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-104",
    "name": "리바이스",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-105",
    "name": "커버낫",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-106",
    "name": "마리떼 프랑소와저버",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-107",
    "name": "디스이즈 내버댓",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-108",
    "name": "와릿이즌",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-109",
    "name": "로라로라",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-110",
    "name": "오아이오아이 컬렉션",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-111",
    "name": "키르시",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-112",
    "name": "벤셔면",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-113",
    "name": "뉴에라",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-114",
    "name": "우알롱",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-115",
    "name": "수프라",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-116",
    "name": "스탠드오일",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-117",
    "name": "시눈",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-118",
    "name": "워즈히어",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": [
      "세터"
    ]
  },
  {
    "id": "sf-119",
    "name": "로우로우",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-120",
    "name": "에이랜드",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-121",
    "name": "캘빈클라인",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-122",
    "name": "스튜디어톰보이",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-123",
    "name": "HDEX",
    "category": "영캐주얼/도메스틱",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-124",
    "name": "게스",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-125",
    "name": "챔피온",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-126",
    "name": "마인드브릿지",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-127",
    "name": "캉골",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-128",
    "name": "프로젝트엠",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-129",
    "name": "지오다노",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-130",
    "name": "아웃스탠딩",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-131",
    "name": "오베이",
    "category": "영캐주얼/도메스틱",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-132",
    "name": "듀베티카",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-133",
    "name": "질스튜어트 뉴욕",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-134",
    "name": "알레그리",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-135",
    "name": "SSF flat #",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": [
      "37"
    ]
  },
  {
    "id": "sf-136",
    "name": "시리즈",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-137",
    "name": "폴로 랄프로렌",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-138",
    "name": "브룩스 브라더스",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-139",
    "name": "커스텀멜로우",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-140",
    "name": "헨리코튼",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-141",
    "name": "라코스테",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-142",
    "name": "빈폴",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-143",
    "name": "타미 힐피거",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-144",
    "name": "헤지스",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-145",
    "name": "바버",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-146",
    "name": "임팩트",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": [
      "38"
    ]
  },
  {
    "id": "sf-147",
    "name": "스테인가르텐",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": []
  },
  {
    "id": "sf-148",
    "name": "신세계 팩토리스토어",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "의류",
    "notes": [
      "39"
    ]
  },
  {
    "id": "sf-149",
    "name": "코치",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "패션잡화",
    "notes": []
  },
  {
    "id": "sf-150",
    "name": "마이클코어스",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "패션잡화",
    "notes": []
  },
  {
    "id": "sf-151",
    "name": "듀퐁",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "패션잡화",
    "notes": []
  },
  {
    "id": "sf-152",
    "name": "만다리나덕",
    "category": "컨템포러리/TD/메스티지",
    "floor": "2F",
    "zone": "패션잡화",
    "notes": []
  },
  {
    "id": "sf-153",
    "name": "로가디스",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-154",
    "name": "알지오지아",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-155",
    "name": "지이크",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-156",
    "name": "앤드지",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-157",
    "name": "에피그램",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-158",
    "name": "올젠",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-159",
    "name": "프로젝트 엠",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-160",
    "name": "마인드 브릿지",
    "category": "남성정장/여성캐주얼",
    "floor": "5F",
    "zone": "남성정장",
    "notes": []
  },
  {
    "id": "sf-161",
    "name": "쉬즈미스",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-162",
    "name": "바이린샵",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": [
      "40"
    ]
  },
  {
    "id": "sf-163",
    "name": "리스트",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-164",
    "name": "잇미샤",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": [
      "41"
    ]
  },
  {
    "id": "sf-165",
    "name": "LAP",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-166",
    "name": "코데즈컴바인",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-167",
    "name": "젝시믹스",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-168",
    "name": "쥬시쥬디",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-169",
    "name": "써스데이아일랜드",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-170",
    "name": "매그제이",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-171",
    "name": "라플리",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-172",
    "name": "바인드",
    "category": "남성정장/여성캐주얼",
    "floor": "3F",
    "zone": "여성 일반",
    "notes": []
  },
  {
    "id": "sf-173",
    "name": "후아유",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-174",
    "name": "트위",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-175",
    "name": "난닝구",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-176",
    "name": "밀바이스튜디오",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-177",
    "name": "로엠",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-178",
    "name": "피그먼트",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-179",
    "name": "클라비스",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-180",
    "name": "요이요이요이",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-181",
    "name": "시스티나",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-182",
    "name": "피플렘",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-183",
    "name": "아틀이에나인",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-184",
    "name": "메종블랑쉬",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-185",
    "name": "나무그림",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-186",
    "name": "러브앤쇼",
    "category": "남성정장/여성캐주얼",
    "floor": "1F",
    "zone": "여성 보세",
    "notes": []
  },
  {
    "id": "sf-187",
    "name": "안다르",
    "category": "스포츠/아웃도어",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-188",
    "name": "나이키 웰컬렉티브",
    "category": "스포츠/아웃도어",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-189",
    "name": "뉴발란스",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-190",
    "name": "다이나핏",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-191",
    "name": "리복",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-192",
    "name": "헤드",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-193",
    "name": "윌슨",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": [
      "42"
    ]
  },
  {
    "id": "sf-194",
    "name": "널디",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-195",
    "name": "MLB",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-196",
    "name": "엄브로",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-197",
    "name": "데상트",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-198",
    "name": "아디다스",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-199",
    "name": "스케쳐스",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-200",
    "name": "휠라",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-201",
    "name": "르꼬끄",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-202",
    "name": "디아도라",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-203",
    "name": "UFC",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-204",
    "name": "배럴",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-205",
    "name": "아레나",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-206",
    "name": "나이키스윔",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-207",
    "name": "컨버스",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-208",
    "name": "NBA",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-209",
    "name": "푸마",
    "category": "스포츠/아웃도어",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-210",
    "name": "세르지오 타키니",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-211",
    "name": "풋볼 스탠다드",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-212",
    "name": "아디다스골프",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-213",
    "name": "왁",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-214",
    "name": "ak 골프",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-215",
    "name": "말본 골프",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-216",
    "name": "골든베어",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-217",
    "name": "먼싱웨어",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-218",
    "name": "시에라디자인",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-219",
    "name": "노르디스크",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-220",
    "name": "BBC 어스",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-221",
    "name": "하이드로겐",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-222",
    "name": "볼디스트",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-223",
    "name": "디스커버리",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-224",
    "name": "스노우피크",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-225",
    "name": "오프로드",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-226",
    "name": "살로몬",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-227",
    "name": "블랙야크",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-228",
    "name": "네파",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-229",
    "name": "콜림비아",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-230",
    "name": "코오롱스포츠",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-231",
    "name": "노스페이스",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-232",
    "name": "브루클린웍스",
    "category": "스포츠/아웃도어",
    "floor": "6F",
    "zone": "",
    "notes": [
      "43"
    ]
  },
  {
    "id": "sf-233",
    "name": "폴로",
    "category": "키즈",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-234",
    "name": "라코스테",
    "category": "키즈",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-235",
    "name": "빈폴",
    "category": "키즈",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-236",
    "name": "헤지스",
    "category": "키즈",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-237",
    "name": "브룩스 브라더스",
    "category": "키즈",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-238",
    "name": "마이리틀타이거",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-239",
    "name": "캉골키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-240",
    "name": "플레이키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-241",
    "name": "MLB 키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-242",
    "name": "캐리마켓",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-243",
    "name": "아이러브제이",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-244",
    "name": "슈슈앤쎄시",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-245",
    "name": "마리떼앙팡",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-246",
    "name": "베네베네",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-247",
    "name": "레베끌레",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-248",
    "name": "로라앤제인",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-249",
    "name": "빌리",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-250",
    "name": "리틀티니",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-251",
    "name": "바베파파",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-252",
    "name": "조이파티",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-253",
    "name": "그레이트북스",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-254",
    "name": "일롬포키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-255",
    "name": "아가방플렉스",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-256",
    "name": "슈슈앤크라",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-257",
    "name": "조이몰른",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-258",
    "name": "휠라키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-259",
    "name": "폴햄키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-260",
    "name": "탑텐키즈",
    "category": "키즈",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-261",
    "name": "자라 키즈",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-262",
    "name": "자라 베이비",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-263",
    "name": "H&M 베이비",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-264",
    "name": "Arket 키즈",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-265",
    "name": "무신사스탠다드 키즈",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-266",
    "name": "유니클로 키즈",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-267",
    "name": "유니클로 베이비",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-268",
    "name": "스파오 키즈",
    "category": "키즈",
    "floor": "복합",
    "zone": "SPA 키즈 통합 매장",
    "notes": []
  },
  {
    "id": "sf-269",
    "name": "사뿐",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-270",
    "name": "락포트",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-271",
    "name": "찰스앤키스",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-272",
    "name": "닥스",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-273",
    "name": "로이드",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-274",
    "name": "슈펜",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-275",
    "name": "미니골드",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-276",
    "name": "플래티슈랩",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-277",
    "name": "바나나시스터즈",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-278",
    "name": "바바라",
    "category": "패션잡화",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-279",
    "name": "쿠론",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-280",
    "name": "슈콤바보니",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-281",
    "name": "금강제화",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-282",
    "name": "스톤헨지",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-283",
    "name": "어그",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-284",
    "name": "언커먼아이웨어",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-285",
    "name": "디디에두보",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-286",
    "name": "쿠에른",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-287",
    "name": "스위치",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-288",
    "name": "비바이아",
    "category": "패션잡화",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": []
  },
  {
    "id": "sf-289",
    "name": "모스바니",
    "category": "패션잡화",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-290",
    "name": "에스콰이어 하우스",
    "category": "패션잡화",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-291",
    "name": "파르테즈",
    "category": "패션잡화",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-292",
    "name": "스와치",
    "category": "패션잡화",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-293",
    "name": "닥터마틴",
    "category": "패션잡화",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-294",
    "name": "abc마트 그랜드스테이지",
    "category": "패션잡화",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-295",
    "name": "스트림",
    "category": "패션잡화",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-296",
    "name": "지샥",
    "category": "패션잡화",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-297",
    "name": "슈스파(소다)",
    "category": "패션잡화",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-298",
    "name": "폴더",
    "category": "패션잡화",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-299",
    "name": "헌터",
    "category": "패션잡화",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-300",
    "name": "아우디",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-301",
    "name": "볼보",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-302",
    "name": "르노",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-303",
    "name": "스미스앤레더",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-304",
    "name": "dji",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": [
      "45"
    ]
  },
  {
    "id": "sf-305",
    "name": "바디프렌드",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-306",
    "name": "모던하우스",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-307",
    "name": "헤븐센스",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": [
      "46"
    ]
  },
  {
    "id": "sf-308",
    "name": "오렌즈",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-309",
    "name": "디자인스킨",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-310",
    "name": "수수플라워",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-311",
    "name": "라빈리커스토어",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-312",
    "name": "하우스웨어",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": [
      "47"
    ]
  },
  {
    "id": "sf-313",
    "name": "알리페즈",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-314",
    "name": "올리브영",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-315",
    "name": "시코르",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-316",
    "name": "레스트인네이처",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-317",
    "name": "더바디샵",
    "category": "라이프스타일",
    "floor": "1F",
    "zone": "바이츠 플레이스",
    "notes": []
  },
  {
    "id": "sf-318",
    "name": "무자기",
    "category": "라이프스타일",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": [
      "48"
    ]
  },
  {
    "id": "sf-319",
    "name": "다니엘트루스",
    "category": "라이프스타일",
    "floor": "2F",
    "zone": "고메스트리트",
    "notes": [
      "49"
    ]
  },
  {
    "id": "sf-320",
    "name": "아트박스",
    "category": "라이프스타일",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-321",
    "name": "야마하",
    "category": "라이프스타일",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-322",
    "name": "조이파티",
    "category": "라이프스타일",
    "floor": "3F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-323",
    "name": "흑심",
    "category": "라이프스타일",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-324",
    "name": "러쉬스파",
    "category": "라이프스타일",
    "floor": "4F",
    "zone": "",
    "notes": [
      "50"
    ]
  },
  {
    "id": "sf-325",
    "name": "유쏘풀",
    "category": "라이프스타일",
    "floor": "4F",
    "zone": "",
    "notes": [
      "51"
    ]
  },
  {
    "id": "sf-326",
    "name": "오리진스토어",
    "category": "라이프스타일",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-327",
    "name": "무인양품",
    "category": "라이프스타일",
    "floor": "4F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-328",
    "name": "플라잉타이거코펜하겐",
    "category": "라이프스타일",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-329",
    "name": "릴",
    "category": "라이프스타일",
    "floor": "5F",
    "zone": "",
    "notes": [
      "52"
    ]
  },
  {
    "id": "sf-330",
    "name": "마제스티 바버샵",
    "category": "라이프스타일",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-331",
    "name": "토이킹덤",
    "category": "라이프스타일",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-332",
    "name": "일렉트로마트",
    "category": "라이프스타일",
    "floor": "5F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-333",
    "name": "에이스토어",
    "category": "라이프스타일",
    "floor": "5F",
    "zone": "",
    "notes": [
      "53"
    ]
  },
  {
    "id": "sf-334",
    "name": "미용 전문관",
    "category": "라이프스타일",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-335",
    "name": "반디인하우스",
    "category": "라이프스타일",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-336",
    "name": "바이이연",
    "category": "라이프스타일",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-337",
    "name": "헤어살롱함",
    "category": "라이프스타일",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-338",
    "name": "이마트24",
    "category": "라이프스타일",
    "floor": "6F",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-339",
    "name": "한샘",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-340",
    "name": "일룸",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-341",
    "name": "에이스침대",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-342",
    "name": "슬로우베드",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-343",
    "name": "로라애슐리",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-344",
    "name": "템퍼",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-345",
    "name": "꼬떼따블",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-346",
    "name": "라미에스",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-347",
    "name": "오이오이",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-348",
    "name": "메종드컨셉",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-349",
    "name": "에몬스",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-350",
    "name": "알로소",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-351",
    "name": "레고트",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-352",
    "name": "노르딕슬립",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-353",
    "name": "레어로우",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-354",
    "name": "데스커",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-355",
    "name": "시디즈",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-356",
    "name": "네모네",
    "category": "가구/리빙",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-357",
    "name": "트레이더스 수원화서점",
    "category": "대형마트/식료품",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-358",
    "name": "노브랜드 수원스타필드점",
    "category": "대형마트/식료품",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-359",
    "name": "다이소 스타필드 수원점",
    "category": "대형마트/식료품",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-360",
    "name": "올가홀푸드 수원스타필드점",
    "category": "대형마트/식료품",
    "floor": "복합",
    "zone": "",
    "notes": []
  },
  {
    "id": "sf-361",
    "name": "박뚜기 소금빵",
    "category": "팝업스토어",
    "floor": "1F",
    "zone": "FNB",
    "notes": []
  },
  {
    "id": "sf-362",
    "name": "흑백요리사 쉐프 기획전",
    "category": "팝업스토어",
    "floor": "1F",
    "zone": "FNB",
    "notes": []
  }
];

export const STARFIELD_DIRECTORY_CATEGORIES = [...new Set(STARFIELD_DIRECTORY.map(store => store.category))];
export const STARFIELD_DIRECTORY_FLOORS = [...new Set(STARFIELD_DIRECTORY.map(store => store.floor))];
export const STARFIELD_DIRECTORY_COUNT = STARFIELD_DIRECTORY.length;
