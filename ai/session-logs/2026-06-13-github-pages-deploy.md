---
date: 2026-06-13
actor: codex
stage: release
---

# GitHub Pages 배포 설정

## User Request

- `KANGSUNGBAE87/paretune` GitHub 저장소에 배포하고 public URL에서 열 수 있게 설정.

## Decisions Made

- GitHub Pages project site 기준 public URL은 `https://kangsungbae87.github.io/paretune/`로 둔다.
- Vite는 `VITE_PUBLIC_BASE=/paretune/` 또는 GitHub Actions 환경에서 `base: "/paretune/"`를 사용하고, 로컬 개발에서는 `/`를 유지한다.
- 현재 GitHub OAuth token에 `workflow` scope가 없어 `.github/workflows/*` push가 거부됐다.
- Actions workflow 대신 `gh-pages` 브랜치에 정적 `dist` 산출물을 push하고, GitHub Pages source를 `gh-pages` branch로 연결하는 방식으로 배포한다.

## Verification

- `gh auth status`: account `KANGSUNGBAE87` authenticated.
- `gh api repos/KANGSUNGBAE87/paretune`: repository exists, default branch `main`, visibility `public`, Pages initially disabled.
- `npm test -- --run`: passed, 6 files / 14 tests.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `VITE_PUBLIC_BASE=/paretune/ npm run build`: pending final deploy build.
- `dist/index.html` references `/paretune/assets/...`, confirming GitHub Pages base path.

## Remaining Work

- Commit and push source `main` to `origin`.
- Push `dist` output to `gh-pages`.
- Enable Pages source branch and verify the public URL returns the app.

## Knowledge Store Promotion

- Project-specific deployment setup only. No cross-project promotion needed.
