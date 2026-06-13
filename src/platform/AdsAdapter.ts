export type AdNetworkId = "apps_in_toss_ads" | "admob";
export type AdStatus = "stub" | "enabled";
export type AdPlacementId = "result_footer" | "share_card";

export type AdsAdapter = {
  status: AdStatus;
  plannedNetworks: AdNetworkId[];
  showPlacement(placementId: AdPlacementId): Promise<{ shown: boolean; reason?: "ads_disabled_in_mvp" | "placement_unavailable" }>;
};
