import type { CoupleDifference } from "../scoring/compareParticipants";

export type DifferenceTemplate = {
  axis: string;
  title: string;
  high: string;
  low: string;
  misunderstanding: string;
  adjustment: string;
  agreement: string;
  mission: string;
};

const fallback: DifferenceTemplate = {
  axis: "fallback",
  title: "맞춰가는 방식",
  high: "이 영역을 더 분명하게 느끼는 편이에요.",
  low: "이 영역을 비교적 편안하게 흘려보는 편이에요.",
  misunderstanding: "서로 중요하게 느끼는 정도가 달라 마음이 덜 전해졌다고 느낄 수 있어요.",
  adjustment: "중요하게 느끼는 순간을 짧게 말해두면 오해가 줄어들 수 있어요.",
  agreement: "다르게 느끼는 순간에는 바로 결론을 내리기보다, 서로에게 중요한 이유를 먼저 들어보기로 해요.",
  mission: "오늘 서로에게 '내가 편안함을 느끼는 관계 방식'을 하나씩 말해보세요.",
};

const templates: Record<string, DifferenceTemplate> = {
  contact_frequency: {
    axis: "contact_frequency",
    title: "연결되는 빈도",
    high: "자주 연결될수록 안정감을 느끼는 편이에요.",
    low: "연락이나 만남이 조금 적어도 안정감을 유지하는 편이에요.",
    misunderstanding: "연락 속도가 다르면 관심의 크기가 다르게 느껴질 수 있어요.",
    adjustment: "바쁜 날에도 서로가 안심할 수 있는 짧은 신호를 정해보세요.",
    agreement: "연락이 어려운 날에는 미리 알려주고, 확인이 필요한 날에는 짧게 표현하기로 해요.",
    mission: "오늘 서로에게 편안한 연락 리듬을 하나씩 말해보세요.",
  },
  planning_style: {
    axis: "planning_style",
    title: "데이트 계획 방식",
    high: "미리 정해진 계획에서 편안함을 느끼는 편이에요.",
    low: "즉흥적인 흐름에서도 편안함을 느끼는 편이에요.",
    misunderstanding: "계획을 세우는 정도가 다르면 한쪽은 부담, 한쪽은 무심함으로 받아들일 수 있어요.",
    adjustment: "꼭 정해야 하는 것과 즉흥으로 남겨둘 것을 나눠보세요.",
    agreement: "중요한 일정은 미리 정하고, 작은 선택은 당일 기분에 맡겨보기로 해요.",
    mission: "다음 데이트에서 꼭 정할 것 1개와 즉흥으로 둘 것 1개를 정해보세요.",
  },
  reassurance_sensitivity: {
    axis: "reassurance_sensitivity",
    title: "안정감을 확인하는 방식",
    high: "표현과 확인을 통해 안정감을 얻는 편이에요.",
    low: "표현이 적어도 관계의 안정감을 비교적 유지하는 편이에요.",
    misunderstanding: "표현의 빈도가 다르면 마음이 줄었다고 오해할 수 있어요.",
    adjustment: "사랑의 크기보다 안심하는 방식이 다를 수 있다는 전제를 공유해보세요.",
    agreement: "불안한 날에는 추측보다 짧게 확인하고, 확인을 받은 뒤에는 잠시 마음을 쉬게 해요.",
    mission: "오늘 내가 안심되는 표현 하나와 부담스러운 표현 하나를 나눠보세요.",
  },
  personal_space_independence: {
    axis: "personal_space_independence",
    title: "가까움과 여백의 균형",
    high: "각자의 시간과 독립적인 영역을 중요하게 느끼는 편이에요.",
    low: "더 많이 함께하고 공유하는 흐름에서 편안함을 느끼는 편이에요.",
    misunderstanding: "혼자만의 시간이 거리두기처럼 느껴질 수 있어요.",
    adjustment: "혼자 있는 시간이 관계를 덜 소중히 여긴다는 뜻은 아니라는 점을 말로 확인해보세요.",
    agreement: "각자의 시간이 필요할 때는 시간을 정해 말하고, 다시 연결되는 신호도 함께 정해요.",
    mission: "이번 주 각자에게 필요한 혼자만의 시간과 함께하고 싶은 시간을 하나씩 말해보세요.",
  },
  words_affection: {
    axis: "words_affection",
    title: "마음을 알아듣는 방식",
    high: "말로 듣는 표현에서 사랑받는 느낌을 얻는 편이에요.",
    low: "말보다 행동이나 분위기를 더 신뢰하는 편이에요.",
    misunderstanding: "표현 방식이 다르면 마음이 있는데도 덜 전해질 수 있어요.",
    adjustment: "서로에게 잘 들리는 표현 방식을 하나씩 알려주세요.",
    agreement: "말과 행동 중 한쪽만 고집하지 않고, 서로에게 잘 닿는 방식을 섞어보기로 해요.",
    mission: "오늘 상대가 편안하게 받을 수 있는 애정 표현을 하나 해보세요.",
  },
  conflict_timing: {
    axis: "conflict_timing",
    title: "갈등 후 다시 연결되는 속도",
    high: "갈등이 생기면 빠르게 이야기하고 풀고 싶은 마음이 큰 편이에요.",
    low: "감정이 가라앉은 뒤 차분히 이야기할 때 더 편한 편이에요.",
    misunderstanding: "한쪽은 피한다고 느끼고, 한쪽은 몰아붙인다고 느낄 수 있어요.",
    adjustment: "바로 결론을 내기보다 쉬는 시간과 다시 이야기할 시간을 함께 정해보세요.",
    agreement: "다툼 직후에는 잠시 쉬고, 정한 시간에 다시 이야기하기로 해요.",
    mission: "우리에게 맞는 '쉬었다가 다시 이야기하기' 시간을 정해보세요.",
  },
  empathy_solution_balance: {
    axis: "empathy_solution_balance",
    title: "공감과 해결의 순서",
    high: "감정을 먼저 이해받을 때 대화가 열리는 편이에요.",
    low: "앞으로 어떻게 할지 정할 때 마음이 정리되는 편이에요.",
    misunderstanding: "공감과 해결의 순서가 다르면 대화가 엇갈릴 수 있어요.",
    adjustment: "먼저 필요한 것이 공감인지 해결인지 대화 시작에 말해보세요.",
    agreement: "갈등 대화 전 '지금은 공감이 필요해' 또는 '해결을 같이 정하고 싶어'라고 말해보기로 해요.",
    mission: "최근 작은 서운함 하나를 공감 1분, 해결 1분 순서로 이야기해보세요.",
  },
};

export function getDifferenceTemplate(difference: CoupleDifference): DifferenceTemplate {
  return templates[difference.axis] ?? fallback;
}
