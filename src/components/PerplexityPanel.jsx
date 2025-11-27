import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Trash2, Loader2, X } from 'lucide-react';
import { usePerplexity } from '@/hooks/usePerplexity';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, } from '@/components/ui/sidebar';
export const PerplexityPanel = ({ open, onOpenChange }) => {
    const { messages, isLoading, sendMessage, clearHistory } = usePerplexity();
    const [input, setInput] = useState('');
    const handleSend = async () => {
        if (!input.trim() || isLoading)
            return;
        await sendMessage(input.trim());
        setInput('');
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    if (!open)
        return null;
    return (<Sidebar className="w-[400px] border-l" collapsible="none">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Perplexity AI</h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={clearHistory} disabled={messages.length === 0}>
              <Trash2 className="h-4 w-4"/>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4"/>
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (<div className="flex items-center justify-center h-full text-muted-foreground">
              <p>대화를 시작해보세요</p>
            </div>) : (<div className="space-y-4">
              {messages.map((message) => (<div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[80%] rounded-lg px-4 py-2', message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted')}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>))}
              {isLoading && (<div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                  </div>
                </div>)}
            </div>)}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex gap-2">
          <Input placeholder="메시지를 입력하세요..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading}/>
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4"/>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>);
};
