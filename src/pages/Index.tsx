import { useState } from "react";
import { BarChart3, Info, MessageSquare } from "lucide-react";
import { WebsiteWidget } from "@/components/WebsiteWidget";
import { WidgetSelector } from "@/components/WidgetSelector";
import { PerplexityPanel } from "@/components/PerplexityPanel";
import { useWidgets } from "@/hooks/useWidgets";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { widgets, addWidget, removeWidget, addCustomWidget } = useWidgets();
  const [perplexityOpen, setPerplexityOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">실시간 금융 대시보드</h1>
                <p className="text-sm text-muted-foreground">
                  거래소, 증권사, 차트를 한눈에 관리하세요
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPerplexityOpen(true)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Perplexity AI
              </Button>
              <WidgetSelector onAddWidget={addWidget} onAddCustomWidget={addCustomWidget} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-6">
        {widgets.length === 0 ? (
          <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <Alert className="max-w-md">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <p className="font-semibold">시작하기</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  "위젯 추가" 버튼을 눌러 차트, 거래소, 증권사를 추가해보세요.
                  <br />
                  패널 사이의 구분선을 드래그하여 크기를 조절할 수 있습니다.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <ResizablePanelGroup
            direction={widgets.length === 1 ? "horizontal" : "horizontal"}
            className="min-h-[calc(100vh-180px)] gap-4"
          >
            {widgets.map((widget, index) => (
              <div key={widget.widgetId} className="contents">
                <ResizablePanel defaultSize={100 / widgets.length} minSize={20}>
                  <WebsiteWidget
                    widgetId={widget.widgetId}
                    name={widget.name}
                    url={widget.url}
                    icon={widget.icon}
                    category={widget.category}
                    onRemove={removeWidget}
                  />
                </ResizablePanel>
                {index < widgets.length - 1 && (
                  <ResizableHandle withHandle className="mx-2" />
                )}
              </div>
            ))}
          </ResizablePanelGroup>
        )}
      </main>

      <footer className="border-t border-border bg-card/30 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            드래그하여 패널 크기를 조절할 수 있습니다 | 레이아웃은 자동으로 저장됩니다
          </p>
        </div>
      </footer>

      <PerplexityPanel open={perplexityOpen} onOpenChange={setPerplexityOpen} />
    </div>
  );
};

export default Index;
