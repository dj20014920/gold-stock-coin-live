import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface WidgetCardProps {
  title: string;
  icon: ReactNode;
  accentColor: "gold" | "stock" | "crypto";
  children: ReactNode;
}

const accentStyles = {
  gold: "border-gold/30 shadow-gold/10",
  stock: "border-stock/30 shadow-stock/10",
  crypto: "border-crypto/30 shadow-crypto/10",
};

const iconBgStyles = {
  gold: "bg-gold/10 text-gold",
  stock: "bg-stock/10 text-stock",
  crypto: "bg-crypto/10 text-crypto",
};

export const WidgetCard = ({ title, icon, accentColor, children }: WidgetCardProps) => {
  return (
    <Card className={`overflow-hidden border-2 shadow-lg transition-all hover:shadow-xl ${accentStyles[accentColor]}`}>
      <div className="flex items-center gap-3 border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
        <div className={`rounded-lg p-2 ${iconBgStyles[accentColor]}`}>
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="h-[400px] w-full bg-card/30">
        {children}
      </div>
    </Card>
  );
};
