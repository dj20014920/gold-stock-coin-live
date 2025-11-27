import { useState } from 'react';
import { Search, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { searchNews } from '@/lib/newsApi';

const API_OPTIONS = [
    { key: 'google', label: 'Google' },
    { key: 'naver', label: 'Naver' },
];

export const NewsPanel = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiType, setApiType] = useState('google');
    const [error, setError] = useState('');
    const [lastQuery, setLastQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) {
            setError('검색어를 입력해 주세요.');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const news = await searchNews(trimmed, apiType);
            setResults(news);
            setLastQuery(trimmed);
            if (news.length === 0) {
                setError('검색 결과가 없습니다. 다른 키워드로 시도해 보세요.');
            }
        } catch (err) {
            setError(err?.message || '뉴스를 불러오지 못했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4 p-6 animate-in fade-in duration-500">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">뉴스</h1>
                <p className="text-muted-foreground">전 세계 최신 소식을 확인하세요.</p>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                <CardHeader className="pb-3">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="뉴스 검색... (예: 테슬라 주가, 반도체 전망)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-9 bg-background/50 border-border/50 focus-visible:ring-1"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "검색"}
                        </Button>
                    </form>
                    <div className="flex gap-2 mt-2">
                        {API_OPTIONS.map((option) => (
                            <Badge
                                key={option.key}
                                variant={apiType === option.key ? 'default' : 'outline'}
                                className="cursor-pointer"
                                onClick={() => setApiType(option.key)}
                            >
                                {option.label}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
            </Card>

            {error && (
                <Alert variant="destructive" className="border-border/60 bg-destructive/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>문제가 발생했습니다</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="grid gap-4 pb-6">
                    {!isLoading && results.length === 0 && !lastQuery && !error && (
                        <Card className="border-dashed border-border/50 bg-muted/30">
                            <CardContent className="p-6 text-sm text-muted-foreground">
                                관심 있는 주식, 섹터, 산업 키워드로 검색해 보세요.
                            </CardContent>
                        </Card>
                    )}

                    {results.map((item) => (
                        <Card key={item.id} className="group transition-all hover:bg-accent/50 hover:shadow-md border-border/50">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="font-medium text-primary">{item.source || 'News'}</span>
                                            <span className="text-muted-foreground/70">•</span>
                                            <span>{item.date || '날짜 정보 없음'}</span>
                                        </div>
                                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {item.snippet || '요약 정보를 불러오지 못했습니다.'}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}
                                        aria-label="새 창에서 열기"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {isLoading && (
                        <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>뉴스를 불러오는 중...</span>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};
