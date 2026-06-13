import type { ShareSummary } from "../../core/report/reportTypes";
import type { ShareAdapter } from "../ShareAdapter";

type RuntimeNavigator = {
  share?: (data: { title: string; text: string }) => Promise<void>;
  clipboard?: {
    writeText: (text: string) => Promise<void>;
  };
};

function asText(summary: ShareSummary) {
  return `${summary.title}\n${summary.oneLineSummary}\n\n잘 맞는 부분: ${summary.alignedArea}\n오늘의 대화 미션: ${summary.mission}`;
}

export const webShareAdapter: ShareAdapter = {
  async share(summary: ShareSummary) {
    const text = asText(summary);
    const runtimeNavigator = globalThis.navigator as RuntimeNavigator | undefined;
    if (runtimeNavigator?.share) {
      await runtimeNavigator.share({ title: summary.title, text });
      return;
    }
    if (runtimeNavigator?.clipboard) {
      await runtimeNavigator.clipboard.writeText(text);
    }
  },
};
