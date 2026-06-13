export type PaymentStoreId = "apps_in_toss_iap" | "google_play_billing";
export type PaymentStatus = "stub" | "enabled";
export type EntitlementId = "premium_report" | "remove_ads";

export type PaymentAdapter = {
  status: PaymentStatus;
  plannedStores: PaymentStoreId[];
  isAvailable(): boolean;
  hasEntitlement(entitlementId: EntitlementId): Promise<boolean>;
};
