# 기술 블로그 프로젝트 로드맵

## 목표

- Next.js 기반으로 클라이언트~서버 전체 파이프라인을 직접 구축
- TDD, SEO를 실제로 적용해보며 체득
- 진행 중 겪는 문제/삽질/배운 점을 기록해두었다가 블로그 포스팅 소재로 재사용

## 스택

- Frontend/Backend: Next.js (TypeScript, App Router)
- DB: PostgreSQL + Prisma
- 인증: 관리자 1인, JWT/세션 쿠키 직접 구현
- 테스트: Vitest(또는 Jest) + React Testing Library + Playwright
- 배포: Docker + Nginx + Let's Encrypt, VPS/클라우드 서버

## 진행 원칙

- **TDD**: 기능 단위(API, 컴포넌트, 로직)마다 "실패하는 테스트 작성 → 최소 구현으로 통과 → 리팩토링" 순서로 진행. 테스트 없이 구현부터 하지 않기.
- **devlog**: `docs/devlog/` 폴더에 날짜별 md 파일로 즉시 기록. 막힌 순간, 에러, 원인, 해결, 배운 점 위주 (완성된 글 아님, 5~10분 메모).
  - 템플릿: 상황 / 막힌 지점(에러 원문) / 원인 / 해결 / 배운 점 / 태그(`#nextjs #docker` 등)
  - Phase 끝날 때마다 devlog를 모아 포스트 초안으로 전환 (Claude에게 정리 요청 가능)
- 아래 체크박스는 그때그때 진행 상황에 맞춰 체크해나가기. 순서는 참고용이며 상황에 따라 유동적으로 조정 가능.

---

## Phase 0. 기획

- [x] 최소 기능 정의: **MVP = 글 목록/상세 + 태그 + 관리자 글쓰기**. 검색은 Phase 7, 댓글은 Phase 9(부가 기능)로 미룸
- [x] 데이터 모델 초안 확정 (Comment는 MVP 범위 밖, 스키마 반영은 Phase 9에서)
  - **Post**: id, title, slug(제목에서 자동 생성), content, status(DRAFT/PUBLISHED 2단계), viewCount(필드만 우선, 증가 로직은 Phase 9), tags(Tag와 N:M 관계), createdAt/updatedAt
  - **Tag**: id, name, slug — Post와 N:M 조인 테이블로 연결
  - **User**: id, email(로그인 식별자), passwordHash — 관리자 1인
- [x] VPS/클라우드 사업자 결정: **AWS Lightsail**
- [x] `docs/devlog/` 폴더 + 템플릿 파일 생성

## Phase 1. 프로젝트 초기화

- [x] `git init`, `.gitignore` 설정
- [x] `create-next-app` (TypeScript, App Router, Tailwind)
- [x] 패키지 매니저로 pnpm 사용 (설치 속도/디스크 효율, 최근 실무 기본값에 더 가까움)
- [x] ESLint/Prettier 설정
- [x] 로컬 개발용 Docker Compose로 PostgreSQL 실행 (Colima + `docker-compose.yml`, `.env.example` 템플릿)

## Phase 2. 테스트 환경 구축 (TDD 기반 다지기)

> 기능을 만들기 전에 테스트 도구부터 세팅 — 이후 모든 Phase에서 TDD 사이클 적용

- [x] Vitest + React Testing Library 설치/설정 (`vitest.config.ts`, `vitest.setup.ts`)
- [x] Playwright 설치, 기본 E2E 스모크 테스트(홈페이지 로드) 작성 (`tests/home.spec.ts`, `webServer`로 dev 서버 자동 기동)
- [x] `pnpm test`, `pnpm run test:e2e` 스크립트 및 watch 모드(`pnpm run test:watch`) 확인
- [x] 간단한 유틸 함수 하나를 TDD로 만들어보며 사이클 연습 → `src/lib/slug.ts` 슬러그 생성 함수, Red→Green→Refactor 직접 수행
- [x] devlog: TDD 사이클 처음 돌려본 소감 기록 (`docs/devlog/2026-07-21.md`)

## Phase 3. 데이터 모델링 & DB

- [ ] Prisma 설치, `schema.prisma` 작성 (Post, User, Tag, Comment)
- [ ] 마이그레이션 적용
- [ ] Seed 스크립트로 더미 데이터 채우기
- [ ] Prisma 클라이언트 wrapper에 대한 유닛 테스트(테스트 DB 사용) 작성
- [ ] (선택) 규모 확장 시 Drizzle ORM과 비교 학습 — 최근 실무 채택 늘어나는 추세, 성능/타입추론 강점

## Phase 4. 백엔드 API (TDD)

- [ ] `/api/posts` 등 CRUD: 각 엔드포인트마다 실패 테스트 → 구현 → 리팩토링
- [ ] 관리자 mutation(글 작성/수정/삭제)은 Server Actions로, 공개 조회/검색/필터는 REST route handler로 구현하는 하이브리드 패턴 적용 — App Router 핵심 패러다임 학습
- [ ] 페이지네이션, 태그 필터, 검색 쿼리 테스트 우선 작성
- [ ] zod로 입력 검증, 검증 실패 케이스 테스트
- [ ] 에러 핸들링 규칙 수립 및 테스트
- [ ] devlog: API 설계하며 겪은 고민 기록

## Phase 5. 인증 (TDD)

- [ ] 로그인/로그아웃 로직 테스트 우선 작성
- [ ] bcrypt 비밀번호 해싱, 세션/JWT 발급 테스트
- [ ] 관리자 라우트 보호 미들웨어 테스트
- [ ] 로그인 시도 rate limiting(brute-force 방지) 구현 및 테스트
- [ ] CSRF 방어, 쿠키 보안 속성(httpOnly/secure/sameSite) 점검
- [ ] devlog: 인증 구현 중 막혔던 부분 기록

## Phase 6. 관리자 페이지 (TDD)

- [ ] 글 목록/작성/수정/삭제 UI 컴포넌트 테스트(RTL) 우선 작성
- [ ] 마크다운 에디터 연동 (`@uiw/react-md-editor` 등)
- [ ] 이미지 업로드 기능 + 테스트
- [ ] Playwright E2E: 로그인 → 글 작성 → 발행 플로우

## Phase 7. 공개 블로그 프론트엔드 (TDD + SEO 기초)

- [ ] 홈/목록/상세 페이지 컴포넌트 테스트 우선 작성
- [ ] 마크다운 렌더링 + 코드 하이라이팅
- [ ] 시맨틱 HTML 구조 (h1/h2 계층, `<article>`, `<time>` 등) 적용
- [ ] 태그 페이지, 검색 기능 + 테스트 (검색은 Postgres full-text search(tsvector/tsquery)로 직접 구현)

## Phase 8. SEO 심화 적용 및 경험

- [ ] Next.js `generateMetadata`로 페이지별 title/description 동적 설정
- [ ] ISR/캐싱 전략: `revalidatePath`/`revalidateTag`로 태그별 재검증 적용
- [ ] Open Graph / Twitter Card 메타태그, OG 이미지 자동 생성(`@vercel/og` 등)
- [ ] 구조화 데이터(JSON-LD): BlogPosting, BreadcrumbList 스키마 적용
- [ ] `sitemap.xml`, `robots.txt` 자동 생성
- [ ] 정규 URL(canonical), 슬러그 설계 점검
- [ ] 이미지 최적화(`next/image`), Core Web Vitals 체크 (Lighthouse)
- [ ] Google Search Console 등록 및 색인 확인
- [ ] devlog: SEO 적용 전/후 Lighthouse 점수 비교 기록 (포스팅 소재로 좋음)

## Phase 9. 부가 기능 (선택)

- [ ] 조회수 카운트
- [ ] 댓글 (자체 구현 또는 Giscus 연동)
- [ ] 다크모드
- [ ] 방문자 통계 (자체 로그 또는 GA)

## Phase 10. 테스트 커버리지 점검

- [ ] 커버리지 리포트 확인, 핵심 로직 누락 테스트 보완
- [ ] Playwright E2E 시나리오 확장 (검색, 태그 필터, 로그인 실패 케이스 등)
- [ ] devlog: TDD로 진행하며 좋았던 점/힘들었던 점 회고

## Phase 11. 인프라 구축

- [ ] Dockerfile 작성 (멀티스테이지 빌드)
- [ ] docker-compose.yml (app + postgres + nginx)
- [ ] Nginx 리버스 프록시 설정, Let's Encrypt(Certbot)로 HTTPS
- [ ] 서버 프로비저닝 (방화벽, SSH 키, 유저 권한)

## Phase 12. CI/CD & 배포

- [ ] GitHub Actions: 테스트(유닛+E2E) 통과를 배포 게이트로 설정
- [ ] Lighthouse CI로 SEO/성능 회귀 자동 체크
- [ ] 이미지 빌드 → push → 서버 배포(SSH or webhook)
- [ ] 환경변수/시크릿 관리
- [ ] devlog: CI/CD 파이프라인 구축 경험 기록

## Phase 13. 운영 & 콘텐츠 루틴

- [ ] 로그/에러 모니터링(Sentry 등 연동), DB 백업 스크립트
- [ ] devlog 누적분을 주기적으로 검토해 포스트로 전환하는 루틴 확립
- [ ] 각 Phase 마무리마다 회고 포스트 1편씩 작성 목표
