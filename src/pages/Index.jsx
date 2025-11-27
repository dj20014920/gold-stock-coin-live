import { useState, memo } from "react";
import { Info } from "lucide-react";
import { WebsiteWidget } from "@/components/WebsiteWidget";
import { TradingViewWidget } from "@/components/TradingViewWidget";
import { WidgetSelector } from "@/components/WidgetSelector";
import { useWidgets } from "@/hooks/useWidgets";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = memo(() => {
  const { widgets, addWidget, removeWidget, addCustomWidget, updateWidgetZoom, fullscreenWidgetId, toggleFullscreen } = useWidgets();

  // 전체화면 모드인 경우 위젯 필터링
  const displayWidgets = fullscreenWidgetId
    ? widgets.filter(w => w.widgetId === fullscreenWidgetId)
    : widgets;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground mt-2">
            실시간 금융 모니터링 및 분석
          </p>
        </div>
        <WidgetSelector onAddWidget={addWidget} onAddCustomWidget={addCustomWidget} />
      </div>

      {widgets.length === 0 ? (
        <div className="flex h-[60vh] items-center justify-center">
          <Alert className="max-w-md bg-card/50 backdrop-blur-sm border-border/50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold">시작하기</p>
              <p className="mt-1 text-sm text-muted-foreground">
                "위젯 추가" 버튼을 클릭하여 차트, 거래소, 사이트를 추가하세요.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div
          className={fullscreenWidgetId ? "h-[calc(100vh-12rem)]" : "grid gap-6 min-h-[calc(100vh-12rem)]"}
          style={!fullscreenWidgetId ? { gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))" } : undefined}
        >
          {displayWidgets.map((widget) => {
            if (widget.type === "tradingview" && widget.symbol) {
              return (
                <TradingViewWidget
                  key={widget.widgetId}
                  widgetId={widget.widgetId}
                  name={widget.name}
                  symbol={widget.symbol}
                  icon={widget.icon}
                  category={widget.category}
                  zoom={widget.zoom || 100}
                  isFullscreen={fullscreenWidgetId === widget.widgetId}
                  scriptConfig={widget.scriptConfig}
                  onRemove={removeWidget}
                  onZoomChange={updateWidgetZoom}
                  onToggleFullscreen={toggleFullscreen}
                />
              );
            } else if (widget.url) {
              return (
                <WebsiteWidget
                  key={widget.widgetId}
                  widgetId={widget.widgetId}
                  name={widget.name}
                  url={widget.url}
                  icon={widget.icon}
                  category={widget.category}
                  zoom={widget.zoom || 100}
                  isFullscreen={fullscreenWidgetId === widget.widgetId}
                  onRemove={removeWidget}
                  onZoomChange={updateWidgetZoom}
                  onToggleFullscreen={toggleFullscreen}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
});

export default Index;
