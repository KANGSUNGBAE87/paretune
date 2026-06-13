import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { DifferenceReport } from "../../core/report/reportTypes";
import { setActiveLocale } from "../../i18n";
import { DifferenceCard } from "./DifferenceCard";

const difference: DifferenceReport = {
  axis: "conflict_timing",
  title: "Speed of reconnecting after conflict",
  participantADescription: "A wants to talk and reconnect quickly after conflict.",
  participantBDescription: "B feels safer talking after emotions settle.",
  misunderstandingMoment: "One person can feel avoided while the other feels pushed.",
  adjustmentTip: "Set both a pause time and a time to return to the conversation.",
  agreementSuggestion: "Pause right after conflict, then return at the time you both named.",
  dailyMission: "Choose your shared pause and return timing.",
};

describe("DifferenceCard", () => {
  it("uses localized section labels in English", () => {
    setActiveLocale("en");

    const { container } = render(<DifferenceCard index={1} difference={difference} />);

    expect(screen.getByText("Easy misunderstanding moment")).toBeInTheDocument();
    expect(screen.getByText("How to adjust together")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
});
