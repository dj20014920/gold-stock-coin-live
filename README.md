# 실시간 금융 대시보드 (React + Vite + Tailwind)

## 개요
- 금/주식/암호화폐/환율 위젯을 추가·배치·확대/축소할 수 있는 대시보드입니다.
- React (JSX), Vite, Tailwind CSS, shadcn-ui 기반이며 Supabase 연동 훅/유틸이 포함되어 있습니다.
- **Gemini AI Chat** 패널이 iframe으로 통합되어 있습니다.

## ⚡️ 빠른 시작

### 1. 일반 사용 (웹 앱만)
```sh
npm install
npm start   # http://localhost:5173
```

### 2. Gemini Chat 기능 사용 (Chrome 확장 프로그램 필요)

Gemini는 보안 정책(`X-Frame-Options`)으로 인해 iframe 삽입이 차단됩니다.  
**Chrome 확장 프로그램**을 통해 이 제한을 우회할 수 있습니다.

#### 설치 방법:
1. Chrome에서 `chrome://extensions/` 열기
2. 우측 상단 **"개발자 모드"** 활성화
3. **"압축해제된 확장 프로그램을 로드합니다"** 클릭
4. 프로젝트의 **`public`** 폴더 선택
5. 프로그램 실행: `npm start`
6. Chat 패널에서 녹색 **"활성"** 상태 확인

📖 **상세 가이드**: `친구용_설치가이드.md` 참고

## 주요 기능

### 📊 실시간 차트
- TradingView 위젯 통합
- 금/주식/암호화폐/환율 차트
- 드래그 앤 드롭으로 위젯 배치
- 확대/축소 가능

### 💬 AI 채팅 (Gemini)
- Google Gemini를 iframe으로 통합
- Chrome 확장 프로그램으로 X-Frame-Options 우회
- 실시간 AI 대화 기능

### 📰 뉴스 & 메모
- 뉴스 패널 (RSS 피드)
- 메모 패널 (로컬 저장)

## 프로젝트 구조
```
gold-stock-coin-live/
├── public/
│   ├── manifest.json      # Chrome Extension 설정
│   ├── background.js      # X-Frame-Options 우회 로직
│   └── rules.json         # declarativeNetRequest 규칙
├── src/
│   ├── main.jsx          # 앱 엔트리
│   ├── App.jsx           # 라우터
│   ├── pages/            # 페이지 컴포넌트
│   ├── components/
│   │   ├── Layout.jsx    # 메인 레이아웃
│   │   ├── Sidebar.jsx   # 내비게이션
│   │   └── panels/
│   │       ├── ChatPanel.jsx   # Gemini 채팅
│   │       ├── NewsPanel.jsx   # 뉴스
│   │       └── MemoPanel.jsx   # 메모
│   ├── hooks/            # 커스텀 훅
│   └── config/           # 설정 파일
├── 친구용_설치가이드.md    # Chrome 확장 프로그램 설치 가이드
├── GEMINI_IFRAME_GUIDE.md # Gemini iframe 연동 상세 가이드
└── SOLUTION_SUMMARY.md    # 문제 해결 요약
```

## 로컬 실행
```sh
npm install
npm start   # http://localhost:5173
npm run build # 프로덕션 빌드
```

## 기술 스택
- **Frontend**: React 18, Vite 5
- **UI**: Tailwind CSS, shadcn/ui
- **Charts**: TradingView Widgets
- **AI**: Google Gemini (iframe)
- **State**: React Hooks, TanStack Query
- **Extension**: Chrome Manifest V3

## 문제 해결

### Q: Chat 패널에서 "연결 거부" 에러가 발생합니다
**해결**: Chrome 확장 프로그램을 설치하세요.  
📖 상세 가이드: `친구용_설치가이드.md`

### Q: 확장 프로그램을 설치했는데도 작동하지 않습니다
**해결**:
1. Chrome을 완전히 종료하고 재시작
2. `chrome://extensions/`에서 "Gold Stock Coin Live" 활성화 확인
3. 브라우저 캐시 삭제 (Cmd/Ctrl + Shift + Delete)
4. 시크릿 모드에서 테스트

### Q: "활성" 상태가 표시되지 않습니다
**해결**:
1. `public/manifest.json` 파일 존재 확인
2. `public/background.js` 파일 존재 확인
3. `public/rules.json` 파일 존재 확인
4. F12 → Console 탭에서 에러 확인

## 보안 고려사항

⚠️ **중요**: Chrome 확장 프로그램 방식은 개발/테스트 환경에서만 사용하세요.

- ✅ **개발 환경**: 안전하게 사용 가능
- ⚠️ **프로덕션**: Gemini API 사용 권장
- ❌ **악의적 목적**: 절대 사용 금지

## 참고 자료
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [declarativeNetRequest API](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)
- [TradingView Widgets](https://www.tradingview.com/widget/)
- [shadcn/ui](https://ui.shadcn.com/)

## 라이선스
교육 목적 프로젝트. 상업적 사용 시 별도 라이선스 필요.

