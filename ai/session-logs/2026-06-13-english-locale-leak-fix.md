---
date: 2026-06-13
actor: codex
stage: debugging
---

# English Locale Leak Fix

## User Request

- 공개 앱에서 영어를 선택했을 때 안전 안내 화면에 한국어가 섞여 보이는 문제를 수정한다.
- 영어 선택 상태에서 다른 화면에도 한국어가 섞이는 곳이 없는지 확인한다.

## Root Cause

- `SafetyNoticeScreen`의 subtitle, 안내 카드 제목/본문 일부가 i18n key가 아니라 한국어 문자열로 하드코딩되어 있었다.
- `DifferenceCard` 내부 라벨과 web share text 라벨도 한국어 문자열을 직접 사용했다.
- 브라우저 탭 제목과 `<html lang>`이 locale 변경에 맞춰 갱신되지 않았다.

## Changes

- 안전 안내 화면의 모든 사용자 노출 문구를 `onboarding.safety.*` i18n key로 분리했다.
- 결과 차이 카드의 내부 라벨을 `result.misunderstanding.title`, `result.adjustment.title`로 연결했다.
- 공유 텍스트 라벨을 `share.card.aligned`, `share.card.mission`으로 연결했다.
- locale 변경 시 `document.title`과 `document.documentElement.lang`을 함께 갱신하도록 했다.
- 영어 안전 안내, 결과 차이 카드, 공유 텍스트, title/lang 동기화에 대한 regression tests를 추가했다.

## Verification

- `npm test -- --run`: 10 files, 20 tests passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `VITE_PUBLIC_BASE=/paretune/ npm run build`: passed.
- Local browser verification on `http://127.0.0.1:5173/`:
  - English safety screen content had no Korean.
  - Setup, handoff, participant B start, ready, result, and share screens had no Korean in `.screen` content.
  - English mode set document title to `Couple Tendency Map` and `<html lang="en">`.

## Remaining Risks

- The language switcher intentionally shows `한국어` as the Korean language option even while English is selected.
- Browser-cached GitHub Pages assets may take a short time to update after redeploy.

## Knowledge Store Promotion

- No cross-project promotion needed. This is a project-specific i18n regression fix.
