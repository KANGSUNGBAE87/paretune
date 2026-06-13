export type ResultAxisKind = "single" | "average" | "paired_pattern";

export type ResultAxis = {
  id: string;
  questionIds: string[];
  kind: ResultAxisKind;
  titleKey: string;
  highMeaningKey: string;
  lowMeaningKey: string;
  sensitivity: "normal" | "sensitive";
};

export const resultAxes: ResultAxis[] = [
  ["contact_frequency", ["q01"], "single"],
  ["planning_style", ["q02"], "single"],
  ["novelty_energy", ["q03"], "single"],
  ["quiet_togetherness", ["q04"], "single"],
  ["social_energy", ["q05"], "single"],
  ["routine_care", ["q06"], "single"],
  ["reassurance_sensitivity", ["q07", "q08"], "average"],
  ["personal_space_independence", ["q09", "q11"], "average"],
  ["sharing_pace", ["q10"], "single"],
  ["direct_check_style", ["q12"], "single"],
  ["words_affection", ["q13"], "single"],
  ["focused_time", ["q14"], "single"],
  ["practical_care", ["q15"], "single"],
  ["physical_closeness", ["q16"], "single"],
  ["symbolic_ritual", ["q17"], "single"],
  ["detail_memory", ["q18"], "single"],
  ["conflict_timing", ["q19", "q20"], "paired_pattern"],
  ["empathy_solution_balance", ["q21", "q22"], "paired_pattern"],
  ["repair_action", ["q23"], "single"],
  ["revisit_after_calm", ["q24"], "single"],
].map(([id, questionIds, kind]) => ({
  id: id as string,
  questionIds: questionIds as string[],
  kind: kind as ResultAxisKind,
  titleKey: `result.axis.${id}.title`,
  highMeaningKey: `result.axis.${id}.high`,
  lowMeaningKey: `result.axis.${id}.low`,
  sensitivity: ["reassurance_sensitivity", "conflict_timing", "empathy_solution_balance"].includes(id as string)
    ? "sensitive"
    : "normal",
}));
