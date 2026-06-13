# 커플성향 i18n/platform readiness

Date: 2026-06-13
Actor/tool: codex

## User Request

- 한국어/영어를 선택할 수 있게 하고, 나중에 다른 언어를 추가할 수 있는 구조를 준비한다.
- 로그인, 결제/IAP, 광고를 Apps in Toss와 Google Play 모두로 옮길 수 있게 미리 준비한다.

## Decisions

- 기존 i18n 구조를 실제 언어 선택 UI와 연결하고, 영어 문항/결과 템플릿 및 ads adapter 스텁을 보강했다.
- Apps in Toss first because it is non-game, while preserving Google Play compatibility.
- SDK 직접 연동은 이번 단계에서 하지 않고 adapter seam과 MVP stub/test를 먼저 둔다.

## Files Changed

- i18n/locale source and UI language selector files.
- platform adapter interfaces/stubs for auth, payment/IAP, and ads where missing.
- tests for locale support and platform adapter readiness.
- ai/plans/implementation-plan.md updated as the canonical latest implementation note.

## Verification

- npm test -- --run: 8 files, 17 tests passed
- npm run build: passed

## Remaining Risks

- 실제 계정 연동, 광고 노출, 유료 entitlement 검증은 backend/SDK 결정 후 adapter 내부에서만 구현한다.
- Store receipt verification and paid entitlement activation still require backend implementation before production monetization.

## Knowledge Promotion

- Reusable global rule already exists in 지식저장소 app platform/i18n standard.
- Project-specific platform note updated in 지식저장소/projects/커플성향/platform.md.
