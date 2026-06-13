import { afterEach, describe, expect, it, vi } from "vitest";
import type { ShareSummary } from "../../core/report/reportTypes";
import { setActiveLocale } from "../../i18n";
import { webShareAdapter } from "./share";

const englishSummary: ShareSummary = {
  title: "Couple tendency map",
  oneLineSummary: "A and B can find a rhythm that feels comfortable for both.",
  alignedArea: "You already share a point that can help the relationship feel comfortable.",
  mission: "Today, each person shares one relationship style that helps them feel comfortable.",
};

describe("webShareAdapter", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    setActiveLocale("ko");
  });

  it("uses the active English locale for share text labels", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setActiveLocale("en");
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    await webShareAdapter.share(englishSummary);

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toContain("Where we align:");
    expect(writeText.mock.calls[0][0]).toContain("Today's mission:");
    expect(writeText.mock.calls[0][0]).not.toMatch(/[가-힣]/);
  });
});
