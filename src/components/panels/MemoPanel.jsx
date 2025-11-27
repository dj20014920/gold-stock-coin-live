import { useState, useEffect } from 'react';
import { Save, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const MemoPanel = () => {
    const [memos, setMemos] = useState(() => {
        const saved = localStorage.getItem('memos');
        return saved ? JSON.parse(saved) : [{ id: Date.now(), content: '', updatedAt: new Date().toISOString() }];
    });
    const [activeMemoId, setActiveMemoId] = useState(() => {
        const saved = localStorage.getItem('memos');
        const parsed = saved ? JSON.parse(saved) : null;
        return parsed && parsed.length > 0 ? parsed[0].id : null;
    });

    useEffect(() => {
        localStorage.setItem('memos', JSON.stringify(memos));
    }, [memos]);

    const activeMemo = memos.find(m => m.id === activeMemoId) || memos[0];

    const handleUpdate = (content) => {
        setMemos(prev => prev.map(memo =>
            memo.id === activeMemoId
                ? { ...memo, content, updatedAt: new Date().toISOString() }
                : memo
        ));
    };

    const handleNew = () => {
        const newMemo = { id: Date.now(), content: '', updatedAt: new Date().toISOString() };
        setMemos(prev => [newMemo, ...prev]);
        setActiveMemoId(newMemo.id);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (memos.length === 1) {
            handleUpdate('');
            return;
        }
        const newMemos = memos.filter(m => m.id !== id);
        setMemos(newMemos);
        if (activeMemoId === id) {
            setActiveMemoId(newMemos[0].id);
        }
        toast.success("메모가 삭제되었습니다");
    };

    return (
        <div className="h-full flex flex-col p-4 animate-in fade-in duration-500 relative">
            {/* 헤더 액션 */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold tracking-tight">메모</h2>
                <Button onClick={handleNew} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> 새 메모
                </Button>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <ScrollArea className="flex-1 -mx-2 px-2">
                    <div className="space-y-2 pb-4">
                        {memos.map((memo) => (
                            <Card
                                key={memo.id}
                                onClick={() => setActiveMemoId(memo.id)}
                                className={cn(
                                    "p-3 cursor-pointer transition-all hover:bg-accent/50 border-border/50 group relative",
                                    activeMemoId === memo.id ? "bg-accent border-primary/20 shadow-sm ring-1 ring-primary/20" : "bg-card/50"
                                )}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <p className="text-sm font-medium line-clamp-2 flex-1 break-all">
                                        {memo.content.trim() || "새 메모"}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                        onClick={(e) => handleDelete(memo.id, e)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {new Date(memo.updatedAt).toLocaleString('ko-KR')}
                                </p>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>

                {/* 에디터 영역 (하단 고정) */}
                <div className="h-[50%] flex flex-col bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm overflow-hidden shrink-0">
                    <Textarea
                        value={activeMemo?.content || ''}
                        onChange={(e) => handleUpdate(e.target.value)}
                        placeholder="메모를 선택하여 편집하세요..."
                        className="w-full h-full resize-none border-0 p-4 text-base leading-relaxed bg-transparent focus-visible:ring-0"
                    />
                </div>
            </div>
        </div>
    );
};
