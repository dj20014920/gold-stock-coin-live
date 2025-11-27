import { useState } from "react";
import { Info } from "lucide-react";
import { WebsiteWidget } from "@/components/WebsiteWidget";
import { TradingViewWidget } from "@/components/TradingViewWidget";
import { WidgetSelector } from "@/components/WidgetSelector";
import { useWidgets } from "@/hooks/useWidgets";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const { widgets, addWidget, removeWidget, addCustomWidget, updateWidgetZoom, fullscreenWidgetId, toggleFullscreen } = useWidgets();

  // Filter widgets if in fullscreen mode
  const displayWidgets = fullscreenWidgetId
    ? widgets.filter(w => w.widgetId === fullscreenWidgetId)
    : widgets;

  // Calculate grid layout based on widget count
  const getGridLayout = (count) => {
    if (count === 0) return "";
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 lg:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (count === 4) return "grid-cols-1 md:grid-cols-2";
    if (count <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (count <= 9) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time financial monitoring and analysis.
          </p>
        </div>
        <WidgetSelector onAddWidget={addWidget} onAddCustomWidget={addCustomWidget} />
      </div>

      {widgets.length === 0 ? (
        <div className="flex h-[60vh] items-center justify-center">
          <Alert className="max-w-md bg-card/50 backdrop-blur-sm border-border/50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold">Get Started</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Click "Add Widget" to add charts, exchanges, or custom sites.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className={fullscreenWidgetId ? "h-[calc(100vh-12rem)]" : `grid ${getGridLayout(widgets.length)} gap-6 min-h-[calc(100vh-12rem)]`}>
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
};

export default Index;
