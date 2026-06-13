import { describe, expect, it } from "vitest";
import { adsAdapter, authAdapter, paymentAdapter } from "./index";

describe("platform readiness adapters", () => {
  it("keeps login, payment, and ads behind platform-ready stubs", async () => {
    expect(authAdapter.status).toBe("stub");
    expect(authAdapter.plannedProviders).toEqual(["apps_in_toss", "google_play"]);
    await expect(authAdapter.getCurrentUser()).resolves.toEqual({ status: "anonymous" });

    expect(paymentAdapter.status).toBe("stub");
    expect(paymentAdapter.plannedStores).toEqual(["apps_in_toss_iap", "google_play_billing"]);
    await expect(paymentAdapter.hasEntitlement("premium_report")).resolves.toBe(false);

    expect(adsAdapter.status).toBe("stub");
    expect(adsAdapter.plannedNetworks).toEqual(["apps_in_toss_ads", "admob"]);
    await expect(adsAdapter.showPlacement("result_footer")).resolves.toEqual({
      shown: false,
      reason: "ads_disabled_in_mvp",
    });
  });
});
