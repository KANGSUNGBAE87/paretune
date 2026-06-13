import type { AuthAdapter } from "../AuthAdapter";

export const webAuthAdapter: AuthAdapter = {
  getUserId() {
    return undefined;
  },
};
