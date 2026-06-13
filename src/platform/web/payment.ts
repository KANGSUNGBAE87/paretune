import type { PaymentAdapter } from "../PaymentAdapter";

export const webPaymentAdapter: PaymentAdapter = {
  status: "stub",
  plannedStores: ["apps_in_toss_iap", "google_play_billing"],
  isAvailable() {
    return false;
  },
  async hasEntitlement() {
    return false;
  },
};
