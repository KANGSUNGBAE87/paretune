import type { AdsAdapter } from "../AdsAdapter";

export const webAdsAdapter: AdsAdapter = {
  status: "stub",
  plannedNetworks: ["apps_in_toss_ads", "admob"],
  async showPlacement() {
    return { shown: false, reason: "ads_disabled_in_mvp" };
  },
};
