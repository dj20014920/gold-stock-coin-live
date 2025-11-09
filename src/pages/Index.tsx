import { GoldWidget } from "@/components/GoldWidget";
import { StockWidget } from "@/components/StockWidget";
import { CryptoWidget } from "@/components/CryptoWidget";
import { BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">실시간 금융 대시보드</h1>
              <p className="text-sm text-muted-foreground">금값, 주식, 비트코인을 한눈에</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GoldWidget />
          <StockWidget />
          <CryptoWidget />
        </div>
      </main>

      <footer className="border-t border-border bg-card/30 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            실시간 데이터는 TradingView 제공 | 투자 결정에 참고용으로만 활용하세요
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
