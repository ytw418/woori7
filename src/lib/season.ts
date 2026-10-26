// 시즌 1 정식 시작: 2026-11-09(월) 20:00 KST
export const SEASON_START = "2026-11-09T20:00:00+09:00";
export const SEASON_LABEL = "시즌 1";

export const EPISODES = [
  { day: 0, title: "오늘부터 두 분은 예비부부입니다", teaser: "서로 수락하면 시즌이 시작돼요" },
  { day: 1, title: "첫인상 공개", teaser: "상대가 남긴 나의 첫인상 키워드" },
  { day: 2, title: "취향과 가치관", teaser: "밸런스 게임 10문항, 우리의 일치율은?" },
  { day: 3, title: "데이트 취향", teaser: "서로 고른 데이트 카드가 겹칠까요" },
  { day: 4, title: "조금 더 깊이", teaser: "글보다 깊은 이야기 한 가지" },
  { day: 5, title: "데이트 제안", teaser: "둘 다 '예'일 때만 공개돼요" },
  { day: 6, title: "최종 선택 전 질문", teaser: "꼭 묻고 싶었던 단 하나의 질문" },
  { day: 7, title: "두 사람의 선택", teaser: "이야기를 이어갈까요?" },
] as const;

export const SEOUL_DISTRICTS = [
  "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
  "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
  "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구",
] as const;

export const PURPOSES = ["진지한 연애", "결혼을 생각하는 만남", "일단 대화부터"] as const;
