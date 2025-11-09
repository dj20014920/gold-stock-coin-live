import { WidgetPreset } from "@/types/widget";

export const WIDGET_PRESETS: WidgetPreset[] = [
  // 암호화폐 거래소
  {
    id: "bithumb",
    name: "빗썸",
    url: "https://www.bithumb.com/",
    category: "crypto",
    icon: "Bitcoin",
    description: "빗썸 암호화폐 거래소",
  },
  {
    id: "upbit",
    name: "업비트",
    url: "https://upbit.com/",
    category: "crypto",
    icon: "Bitcoin",
    description: "업비트 암호화폐 거래소",
  },
  {
    id: "coinone",
    name: "코인원",
    url: "https://coinone.co.kr/",
    category: "crypto",
    icon: "Bitcoin",
    description: "코인원 암호화폐 거래소",
  },
  {
    id: "crypto-chart-btc",
    name: "비트코인 차트",
    url: "https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=UPBIT%3ABTCKRW&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr",
    category: "crypto",
    icon: "TrendingUp",
    description: "비트코인 실시간 차트",
  },
  {
    id: "crypto-chart-eth",
    name: "이더리움 차트",
    url: "https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=UPBIT%3AETHKRW&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr",
    category: "crypto",
    icon: "TrendingUp",
    description: "이더리움 실시간 차트",
  },

  // 증권사
  {
    id: "kiwoom",
    name: "키움증권",
    url: "https://www.kiwoom.com/",
    category: "stock",
    icon: "TrendingUp",
    description: "키움증권 홈트레이딩",
  },
  {
    id: "mirae",
    name: "미래에셋증권",
    url: "https://securities.miraeasset.com/",
    category: "stock",
    icon: "TrendingUp",
    description: "미래에셋증권",
  },
  {
    id: "samsung",
    name: "삼성증권",
    url: "https://www.samsungpop.com/",
    category: "stock",
    icon: "TrendingUp",
    description: "삼성증권",
  },
  {
    id: "kb",
    name: "KB증권",
    url: "https://www.kbsec.com/",
    category: "stock",
    icon: "TrendingUp",
    description: "KB증권",
  },
  {
    id: "naver-finance",
    name: "네이버 증권",
    url: "https://finance.naver.com/",
    category: "stock",
    icon: "BarChart3",
    description: "네이버 금융 - 주식 정보",
  },
  {
    id: "stock-chart-kospi",
    name: "코스피 차트",
    url: "https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=KRX%3AKOSPI&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr",
    category: "stock",
    icon: "TrendingUp",
    description: "코스피 실시간 차트",
  },
  {
    id: "stock-chart-kosdaq",
    name: "코스닥 차트",
    url: "https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=KRX%3AKOSDAQ&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr",
    category: "stock",
    icon: "TrendingUp",
    description: "코스닥 실시간 차트",
  },

  // 금
  {
    id: "gold-chart",
    name: "금 시세",
    url: "https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=TVC%3AGOLD&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr",
    category: "gold",
    icon: "Coins",
    description: "금 실시간 차트",
  },

  // 환율
  {
    id: "forex-usd",
    name: "달러/원 환율",
    url: "https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=FX_IDC%3AKRWUSD&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr",
    category: "forex",
    icon: "DollarSign",
    description: "달러/원 환율 차트",
  },
];
