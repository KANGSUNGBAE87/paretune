import type { CoupleDifference } from "./compareParticipants";

const duplicateGroups: string[][] = [
  ["reassurance_sensitivity", "direct_check_style"],
  ["conflict_timing", "revisit_after_calm"],
  ["words_affection", "practical_care"],
  ["personal_space_independence", "sharing_pace"],
];

function groupKey(axis: string) {
  return duplicateGroups.find((group) => group.includes(axis))?.join("+") ?? axis;
}

export function selectTopDifferences(differences: CoupleDifference[], limit = 3): CoupleDifference[] {
  const selected = new Map<string, CoupleDifference>();
  const candidates = [...differences]
    .filter((difference) => difference.differenceLevel !== "similar")
    .sort((left, right) => right.differenceSize - left.differenceSize);

  for (const difference of candidates) {
    const key = groupKey(difference.axis);
    const current = selected.get(key);
    if (!current || difference.differenceSize > current.differenceSize) {
      selected.set(key, difference);
    }
  }

  return [...selected.values()].slice(0, limit);
}
