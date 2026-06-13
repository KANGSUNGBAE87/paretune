import type { PaymentAdapter } from "../PaymentAdapter";

export const webPaymentAdapter: PaymentAdapter = {
  isAvailable() {
    return false;
  },
};
