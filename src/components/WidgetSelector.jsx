import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { WIDGET_PRESETS } from "@/config/presets";
import { toast } from "sonner";

export const WidgetSelector = ({ onAddWidget, onAddCustomWidget }) => {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const categories = {
    all: "전체",
    crypto: "암호화폐",
    stock: "주식",
    gold: "금",
    forex: "환율",
  };

  const handleAddCustom = () => {
    if (!customUrl.trim()) {
      toast.error("URL을 입력해주세요");
      return;
    }
    if (!customName.trim()) {
      toast.error("위젯 이름을 입력해주세요");
      return;
    }
    try {
      new URL(customUrl);
      onAddCustomWidget(customUrl, customName);
      setCustomUrl("");
      setCustomName("");
      setOpen(false);
      toast.success("위젯이 추가되었습니다");
    }
    catch {
      toast.error("올바른 URL을 입력해주세요");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 rounded-xl shadow-sm">
          <Plus className="h-5 w-5" />
          위젯 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>위젯 추가하기</DialogTitle>
          <DialogDescription>
            프리셋에서 선택하거나 직접 URL을 입력하여 위젯을 추가하세요
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 rounded-xl bg-muted/50 p-1">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="rounded-lg">
                {label}
              </TabsTrigger>
            ))}
            <TabsTrigger value="custom" className="rounded-lg">직접 추가</TabsTrigger>
          </TabsList>

          {Object.keys(categories).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {WIDGET_PRESETS.filter((preset) => category === "all" || preset.category === category).map((preset) => {
                  const IconComponent = LucideIcons[preset.icon] || LucideIcons.Globe;
                  return (
                    <Card key={preset.id} className="cursor-pointer border p-4 transition-all hover:bg-accent/50 hover:shadow-md rounded-xl" onClick={() => {
                      onAddWidget(preset);
                      setOpen(false);
                      toast.success(`${preset.name} 위젯이 추가되었습니다`);
                    }}>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{preset.name}</h3>
                          <p className="text-sm text-muted-foreground">{preset.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-name">위젯 이름</Label>
                <Input id="custom-name" placeholder="예: 내 증권사" value={customName} onChange={(e) => setCustomName(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-url">웹사이트 URL</Label>
                <Input id="custom-url" placeholder="https://example.com" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} className="rounded-xl" />
              </div>
              <Button onClick={handleAddCustom} className="w-full rounded-xl">
                위젯 추가
              </Button>
              <p className="text-sm text-muted-foreground">
                * 일부 웹사이트는 보안 정책으로 인해 iframe에서 표시되지 않을 수 있습니다.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
