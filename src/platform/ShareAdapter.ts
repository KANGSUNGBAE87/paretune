import type { ShareSummary } from "../core/report/reportTypes";

export type ShareAdapter = {
  share(summary: ShareSummary): Promise<void>;
};
