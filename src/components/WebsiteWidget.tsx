import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface WebsiteWidgetProps {
  widgetId: string;
  name: string;
  url: string;
  icon: string;
  category: string;
  onRemove: (widgetId: string) => void;
}

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

export const WebsiteWidget = ({ widgetId, name, url, icon, category, onRemove }: WebsiteWidgetProps) => {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Globe;
  const colorClass = categoryColors[category as keyof typeof categoryColors] || categoryColors.custom;
  const iconBgClass = categoryIconBg[category as keyof typeof categoryIconBg] || categoryIconBg.custom;

  return (
    <Card className={`flex h-full flex-col overflow-hidden border-2 shadow-lg ${colorClass}`}>
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${iconBgClass}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => window.open(url, "_blank")}
            title="새 탭에서 열기"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(widgetId)}
            title="위젯 제거"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-card/30">
        <iframe
          src={url}
          className="h-full w-full border-0"
          title={name}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </Card>
  );
};
