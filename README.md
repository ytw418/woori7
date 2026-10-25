# 우리, 7일

미션형 소개팅 · 인터랙티브 연애 예능. "오늘부터 두 분은 예비부부입니다."

## 현재 포함

- 시즌 1 모집 랜딩 페이지 (`src/app/page.tsx`): 히어로 + 시즌 카운트다운, 콘셉트, DAY0~7 에피소드, 진행 방식, 최종 선택 미리보기, 안심 약속, 참여 신청서, FAQ
- 참여 신청 API (`src/app/api/apply/route.ts`): 서버 검증 후 Supabase `woori7_applications` 테이블에 저장
- DB 스키마 (`supabase/schema.sql`)

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # Supabase 값 입력 (비워 두면 개발 모드에서는 저장 없이 콘솔에만 기록)
npm run dev
```

## 배포 (Vercel)

1. Supabase 프로젝트 생성 → SQL Editor에서 `supabase/schema.sql` 실행
2. Vercel에서 이 레포 Import → 환경변수 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 설정
3. 도메인 연결

광고·숏폼 링크에는 `?utm_source=instagram` 처럼 UTM을 붙이면 신청 데이터에 채널이 함께 저장됩니다.
