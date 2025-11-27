# 실시간 금융 대시보드 (React + Vite + Tailwind)

## 개요
- 금/주식/암호화폐/환율 위젯을 추가·배치·확대/축소할 수 있는 대시보드입니다.
- React (JSX), Vite, Tailwind CSS, shadcn-ui 기반이며 Supabase 연동 훅/유틸이 포함되어 있습니다.

## 로컬 실행
```sh
npm install
npm run dev   # http://localhost:8080
npm run build # 프로덕션 빌드
```

## 주요 구조
- `src/main.jsx`, `src/App.jsx`: 앱 엔트리 및 라우터
- `src/pages`: 페이지 (Index, NotFound)
- `src/components`: 위젯/공통 UI
- `src/hooks`: 상태/퍼플렉시티/반응형 훅
- `src/config/presets.js`: 기본 위젯 프리셋

## 라이선스
사내 사용 목적 프로젝트. 필요 시 별도 라이선스 명시.***
