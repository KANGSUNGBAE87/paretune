export type AuthProviderId = "apps_in_toss" | "google_play";
export type AuthStatus = "stub" | "enabled";

export type AuthUser =
  | { status: "anonymous" }
  | { status: "authenticated"; userId: string; displayName?: string };

export type AuthAdapter = {
  status: AuthStatus;
  plannedProviders: AuthProviderId[];
  getCurrentUser(): Promise<AuthUser>;
  getUserId(): string | undefined;
};
