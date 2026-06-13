import type { AuthAdapter } from "../AuthAdapter";

export const webAuthAdapter: AuthAdapter = {
  status: "stub",
  plannedProviders: ["apps_in_toss", "google_play"],
  async getCurrentUser() {
    return { status: "anonymous" };
  },
  getUserId() {
    return undefined;
  },
};
