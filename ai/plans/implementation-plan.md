---
version: 0.2.2
status: mvp-implemented
updated: 2026-06-13
canonical: true
---

# 커플 성향지도 구현 계획

현재 최신 구현 계획은 [couple-mvp-implementation-plan.md](./couple-mvp-implementation-plan.md)이다.

## Current Baseline

- React + TypeScript + Vite + Vitest 기반 MVP 구현이 완료됐다.
- 핵심 구현은 core 문항/결과 엔진 -> 세션 상태 머신 -> i18n -> platform adapter -> UI -> 테스트/QA 순서로 반영됐다.
- 문항 기준은 25문항이며 q25는 `adjustment_anchor`로 결과 톤과 미션 강도 조절에만 사용한다.
- 결과는 궁합 점수나 진단이 아니라 잘 맞는 부분, 차이 TOP 3, 합의문, 대화 미션 중심이다.
- Apps in Toss / Google Play 호환을 위해 platform SDK 직접 호출은 `src/platform/*` adapter 경계에만 둔다.
- 공유 카드 생성은 먼저 안전한 미리보기 화면으로 이동하고, 시스템 공유는 `ShareAdapter`를 통해 공유 화면 내부에서만 실행한다.
- 결과 저장은 파일 다운로드가 아니라 브라우저 저장소에 safe payload만 저장한다. 문항별 원답, `responses`, `questionId`는 저장 payload에 포함하지 않는다.
- 결과 화면 액션은 `결과 저장하기`, `공유 카드 만들기`, `처음으로 돌아가기`, `세션 삭제`로 분리한다.
- Public preview 배포는 GitHub Pages를 사용한다. `VITE_PUBLIC_BASE=/paretune/`로 빌드한 `dist` 산출물을 `gh-pages` 브랜치에 배포하고, 공개 URL은 `https://kangsungbae87.github.io/paretune/`를 기준으로 한다.

## Implemented Structure

- `src/core/questions`: 25문항 placeholder와 result axis 매핑.
- `src/core/scoring`: 참가자 점수화, 커플 차이 비교, 잘 맞는 부분/차이 TOP 3 선택, 안전한 리포트 생성.
- `src/core/session`: participantA 봉인, participantB 완료, 결과 열기, 저장/삭제를 강제하는 상태 머신.
- `src/i18n`: 한국어 기본 dictionary와 영어 fallback 구조.
- `src/platform`: storage, share, analytics, payment, locale, auth adapter 인터페이스와 web stub.
- `src/features/session`, `src/features/test`, `src/features/result`, `src/features/share`, `src/features/settings`: 계획 화면 흐름의 React 컴포넌트.
- `src/components`, `src/design`: 공통 버튼/카드/진행률/모달과 warm ivory + coral/lavender/blue 토큰.

## Verification

- `npm test -- --run`: 6 files, 12 tests passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed (`tsc --noEmit`).
- `npm run build`: passed.
- gstack browser QA: mobile viewport `390x844`, Start -> Safety -> Setup -> participantA -> sealed handoff -> participantB -> ready-to-reveal -> result -> save -> settings flow passed.
- Browser console: no runtime errors; only Vite/React development informational logs.

## Change Log

| Version | Date | Summary |
| --- | --- | --- |
| 0.2.2 | 2026-06-13 | GitHub Pages 배포 기준과 public preview URL을 추가했다. |
| 0.2.1 | 2026-06-13 | 하단 CTA overflow 수정, 결과 저장 safe payload, 결과 화면 홈/삭제 액션 분리를 반영했다. |
| 0.2 | 2026-06-13 | MVP 구현 완료 상태, 실제 파일 구조, 검증 결과를 반영했다. |
| 0.1 | 2026-06-13 | couple-mvp-implementation-plan.md를 최신 구현 계획으로 지정했다. |
