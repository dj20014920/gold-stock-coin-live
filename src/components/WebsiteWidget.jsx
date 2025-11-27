import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { X, ExternalLink, AlertCircle, ZoomIn, Maximize2, Minimize2 } from "lucide-react";
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
export const WebsiteWidget = ({ widgetId, name, url, icon, category, zoom = 100, isFullscreen = false, onRemove, onZoomChange, onToggleFullscreen }) => {
    const [iframeError, setIframeError] = useState(false);
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
        // Security: Only allow numeric input
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
            onZoomChange(widgetId, numValue);
        }
    };
    const handleIframeError = () => {
        setIframeError(true);
    };
    // Iframe only supports URLs with proper embedding permissions
    if (!url) {
        return null;
    }
    return (<Card className={`flex h-full flex-col overflow-hidden border-2 shadow-lg ${colorClass}`}>
      <div className="flex flex-col border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${iconBgClass}`}>
              <IconComponent className="h-5 w-5"/>
            </div>
            <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onToggleFullscreen(isFullscreen ? null : widgetId)} title={isFullscreen ? "원래 크기로" : "전체화면"}>
              {isFullscreen ? <Minimize2 className="h-4 w-4"/> : <Maximize2 className="h-4 w-4"/>}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => window.open(url, "_blank")} title="새 탭에서 열기">
              <ExternalLink className="h-4 w-4"/>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onRemove(widgetId)} title="위젯 제거">
              <X className="h-4 w-4"/>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 pb-3">
          <ZoomIn className="h-4 w-4 text-muted-foreground"/>
          <Slider value={[zoom]} onValueChange={(value) => handleZoomChange(value[0])} min={25} max={200} step={5} className="flex-1"/>
          <Input type="text" value={zoomInput} onChange={handleZoomInputChange} className="w-16 h-8 text-center"/>
          <span className="text-sm text-muted-foreground">%</span>
        </div>
      </div>
      <div className="relative flex-1 bg-card/30">
        {iframeError ? (<div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-8 w-8 text-destructive"/>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">사이트 로드 실패</h3>
              <p className="text-sm text-muted-foreground">
                {name}에서 보안 정책으로 인해 임베딩을 차단했습니다.
              </p>
            </div>
            <Button variant="default" size="sm" onClick={() => window.open(url, "_blank")} className="gap-2">
              <ExternalLink className="h-4 w-4"/>
              새 탭에서 열기
            </Button>
          </div>) : (<iframe src={url} className="h-full w-full border-0" title={name} sandbox="allow-same-origin allow-scripts allow-popups allow-forms" onError={handleIframeError} style={{
                colorScheme: 'light',
                backgroundColor: '#ffffff',
                zoom: `${zoom}%`,
            }}/>)}
      </div>
    </Card>);
};
