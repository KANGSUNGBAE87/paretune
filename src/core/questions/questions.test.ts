import { describe, expect, it } from "vitest";
import { ko } from "../../i18n/ko";
import { QUESTION_SET_VERSION, questions } from "./questions";

describe("questions", () => {
  it("contains 25 MVP questions and keeps q25 as the adjustment anchor", () => {
    expect(questions).toHaveLength(25);
    expect(questions.every((question) => question.version === QUESTION_SET_VERSION)).toBe(true);

    const anchor = questions.at(-1);
    expect(anchor).toMatchObject({
      id: "q25",
      domain: "adjustment_anchor",
      textKey: "question.adjustment_anchor.q25",
      reverseScored: false,
    });
  });

  it("keeps every question keyed through Korean i18n copy", () => {
    for (const question of questions) {
      expect(question.id).toMatch(/^q\d{2}$/);
      expect(question.facet.length).toBeGreaterThan(0);
      expect(question.resultTags.length).toBeGreaterThan(0);
      expect(ko[question.textKey]).toEqual(expect.any(String));
      expect(ko[question.textKey].length).toBeGreaterThan(0);
    }
  });
});
