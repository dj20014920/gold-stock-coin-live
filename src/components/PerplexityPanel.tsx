import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Send, Trash2, Loader2 } from 'lucide-react';
import { usePerplexity } from '@/hooks/usePerplexity';
import { cn } from '@/lib/utils';

interface PerplexityPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PerplexityPanel = ({ open, onOpenChange }: PerplexityPanelProps) => {
  const { messages, isLoading, apiKey, sendMessage, saveApiKey, clearHistory } = usePerplexity();
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input.trim());
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      saveApiKey(tempApiKey.trim());
      setTempApiKey('');
      setShowSettings(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[500px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Perplexity AI</SheetTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHistory}
                disabled={messages.length === 0}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {showSettings ? (
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Perplexity API Key</label>
              <Input
                type="password"
                placeholder="pplx-..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                API 키는 브라우저 로컬스토리지에 저장됩니다
              </p>
            </div>
            <Button onClick={handleSaveApiKey} className="w-full">
              저장
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>대화를 시작해보세요</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-lg px-4 py-2',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t">
              {!apiKey && (
                <div className="mb-2 text-xs text-muted-foreground text-center">
                  설정에서 API 키를 먼저 입력해주세요
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder="메시지를 입력하세요..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || !apiKey}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || !apiKey}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
