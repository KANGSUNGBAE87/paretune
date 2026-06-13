export type AnalyticsAdapter = {
  track(eventName: string, payload?: Record<string, unknown>): void;
};
