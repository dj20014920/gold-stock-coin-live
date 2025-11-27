import { useEffect, useRef, useState, memo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { X, ExternalLink, ZoomIn, Maximize2, Minimize2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

const categoryColors = {
  crypto: "border-crypto/30 shadow-crypto/10",
  stock: "border-stock/30 shadow-stock/10",
  gold: "border-gold/30 shadow-gold/10",
  forex: "border-primary/30 shadow-primary/10",
  custom: "border-accent/30 shadow-accent/10",
};

const categoryIconBg = {
  crypto: "bg-crypto/10 text-crypto",
  stock: "bg-stock/10 text-stock",
  gold: "bg-gold/10 text-gold",
  forex: "bg-primary/10 text-primary",
  custom: "bg-accent/10 text-accent",
};

const DEFAULT_CONFIG = {};

export const TradingViewWidget = memo(({ widgetId, name, symbol, icon, category, zoom = 100, isFullscreen = false, scriptConfig = DEFAULT_CONFIG, onRemove, onZoomChange, onToggleFullscreen, }) => {
  const containerRef = useRef(null);
  const [zoomInput, setZoomInput] = useState(zoom.toString());
  const IconComponent = LucideIcons[icon] || LucideIcons.Globe;
  const colorClass = categoryColors[category] || categoryColors.custom;
  const iconBgClass = categoryIconBg[category] || categoryIconBg.custom;

  const handleZoomChange = (value) => {
    setZoomInput(value.toString());
    onZoomChange(widgetId, value);
  };

  const handleZoomInputChange = (e) => {
    const value = e.target.value;
    setZoomInput(value);
    // 보안: 숫자 입력만 허용
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onZoomChange(widgetId, numValue);
    }
  };

  useEffect(() => {
    if (!containerRef.current)
      return;
    // 이전 컨텐츠 제거
    containerRef.current.innerHTML = "";
    // TradingView 컨테이너 생성
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container h-full";
    const chartContainer = document.createElement("div");
    chartContainer.className = "tradingview-widget-container__widget h-full";
    chartContainer.id = `tradingview_${widgetId}`;
    widgetContainer.appendChild(chartContainer);
    containerRef.current.appendChild(widgetContainer);
    // TradingView 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Asia/Seoul",
          theme: "light",
          style: "1",
          locale: "ko",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          backgroundColor: "#ffffff",
          gridColor: "#f0f0f0",
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: `tradingview_${widgetId}`,
          ...scriptConfig,
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      // 정리
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [widgetId, symbol, scriptConfig]);

  return (
    <Card className={`flex h-full flex-col overflow-hidden border shadow-sm rounded-2xl transition-all hover:shadow-md ${colorClass}`}>
      <div className="flex flex-col border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-2 ${iconBgClass}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onToggleFullscreen(isFullscreen ? null : widgetId)} title={isFullscreen ? "원래 크기로" : "전체화면"}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => window.open(`https://kr.tradingview.com/chart/?symbol=${symbol}`, "_blank")} title="새 탭에서 열기">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onRemove(widgetId)} title="위젯 제거">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 pb-3">
          <ZoomIn className="h-4 w-4 text-muted-foreground" />
          <Slider value={[zoom]} onValueChange={(value) => handleZoomChange(value[0])} min={25} max={200} step={5} className="flex-1" />
          <Input type="text" value={zoomInput} onChange={handleZoomInputChange} className="w-16 h-8 text-center rounded-lg" />
          <span className="text-sm text-muted-foreground">%</span>
        </div>
      </div>
      <div ref={containerRef} className="relative flex-1 bg-background" style={{
        zoom: `${zoom}%`,
      }} />
    </Card>
  );
});
