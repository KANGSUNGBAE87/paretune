import { describe, expect, it } from "vitest";
import { setActiveLocale, t, localeOptions } from "./index";

describe("i18n locale switching", () => {
  it("switches active copy and keeps locale options extensible", () => {
    expect(localeOptions.map((option) => option.id)).toEqual(["ko", "en"]);

    setActiveLocale("en");
    expect(t("onboarding.start.cta")).toBe("Start couple map");
    expect(t("question.adjustment_anchor.q25")).toContain("differences");

    setActiveLocale("ko");
    expect(t("onboarding.start.cta")).toBe("커플 성향지도 시작하기");
  });
});
