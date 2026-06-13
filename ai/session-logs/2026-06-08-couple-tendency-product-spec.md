# Session Log: 커플 성향지도 제품 스펙 작성

Date: 2026-06-08
Actor/tool: codex

## User Request

첨부 지시문을 읽고, 커플 성향지도 앱의 기획 내용을 반영해 제품 기획과 MVP 구현 기준 문서를 작성한다. 실제 앱 구현 코드는 작성하지 않는다.

## Decisions Made

- MVP는 친구/가족/동료까지 확장하지 않고 연인/부부/썸 중심의 커플 관계 조율 앱으로 고정했다.
- 원격 초대 링크/초대 코드/계정 연결은 MVP에서 제외했다.
- 핵심 UX를 같은 기기 순차 응답 세션으로 정의했다.
- participantA 응답 후 결과와 원답을 봉인하고, participantB 응답 후 함께 결과를 열도록 정리했다.
- 참가자 구조는 여자/남자 고정이 아니라 `participantA`/`participantB`와 닉네임 기반으로 정리했다.
- MVP 문항 수는 1인당 20~24문항, 권장 24문항으로 정리했다.
- 결과는 판정이 아니라 차이, 오해 가능성, 조율법, 합의문, 대화 미션 중심으로 구성했다.
- 결과 저장은 자동 저장이 아니라 명시적 선택 저장을 기본으로 했다.
- 비게임 앱 기준으로 Apps in Toss 우선 출시, Google Play 호환 유지, i18n 및 플랫폼 어댑터 기준을 반영했다.

## Files Changed

- `ai/plans/2026-06-08-couple-tendency-product-spec.md`
- `ai/session-logs/2026-06-08-couple-tendency-product-spec.md`
- `/Users/kangsungbae/Documents/지식저장소/projects/커플성향/platform.md`

Project bootstrap helper also created project-local Graphify/Understand and shared agent instruction scaffolding.

## Commands / Verification

- Read attached request text.
- Ran `/Users/kangsungbae/.codex/bin/apply-project-knowledge-tools /Users/kangsungbae/Documents/커플성향`.
- Checked app platform standard from `/Users/kangsungbae/Documents/지식저장소/docs/workflows/app-platform-standard.md`.
- Ran `/Users/kangsungbae/.codex/bin/graphify update . --no-cluster` in `/Users/kangsungbae/Documents/커플성향`; rebuilt 147 nodes and 402 edges.
- Ran `/Users/kangsungbae/.codex/bin/graphify update . --no-cluster` in `/Users/kangsungbae/Documents/지식저장소`; rebuilt 382 nodes and 9558 edges.

## Remaining Risks

- Superseded on 2026-06-13: the MVP question set is now documented as 25 questions in `ai/plans/couple-mvp-integrated-design-question-result-spec.md`; q25 is an `adjustment_anchor`, not a scoring domain.
- The app name is not finalized.
- Technical stack is not selected yet.
- Apps in Toss and Google Play implementation details should be rechecked against current official docs before release or monetization work.

## Next Steps

1. Confirm the product spec.
2. Decide app name and first implementation stack.
3. Draft the 24 MVP questions.
4. Move to implementation planning before coding.

## Knowledge Promotion

The project-specific platform note was added to `/Users/kangsungbae/Documents/지식저장소/projects/커플성향/platform.md`. No broader global knowledge update is needed yet.
