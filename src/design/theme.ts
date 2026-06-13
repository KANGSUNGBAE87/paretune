import type { CSSProperties } from "react";
import { tokens } from "./tokens";

export const themeCssVariables = {
  "--bg-warm-ivory": tokens.colors.bgWarmIvory,
  "--bg-cream": tokens.colors.bgCream,
  "--surface": tokens.colors.surface,
  "--coral-tint": tokens.colors.coralTint,
  "--lavender-tint": tokens.colors.lavenderTint,
  "--blue-tint": tokens.colors.blueTint,
  "--primary-coral": tokens.colors.primaryCoral,
  "--secondary-lavender": tokens.colors.secondaryLavender,
  "--accent-blue": tokens.colors.accentBlue,
  "--safe-green": tokens.colors.safeGreen,
  "--warning-amber": tokens.colors.warningAmber,
  "--danger-muted": tokens.colors.dangerMuted,
  "--text-primary": tokens.colors.textPrimary,
  "--text-secondary": tokens.colors.textSecondary,
  "--border-soft": tokens.colors.borderSoft,
} as CSSProperties;
