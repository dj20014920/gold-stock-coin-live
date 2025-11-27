import { useState, useEffect } from 'react';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// API 연동 전 빈 화면 방지를 위한 목 데이터
const MOCK_NEWS = [
    {
        id: 1,
        title: "애플의 새로운 AI 전략 공개",
        source: "TechCrunch",
        date: "2024-03-20",
        snippet: "애플이 아이폰에 구글의 Gemini AI 엔진을 탑재하기 위해 협상 중인 것으로 알려졌습니다.",
        url: "https://techcrunch.com"
    },
    {
        id: 2,
        title: "비트코인, 사상 최고가 돌파",
        source: "Bloomberg",
        date: "2024-03-19",
        snippet: "기관 투자자들의 채택이 증가하면서 암호화폐 시장이 랠리를 펼치고 있습니다.",
        url: "https://bloomberg.com"
    },
    {
        id: 3,
        title: "연준 소식에 글로벌 증시 상승",
        source: "Reuters",
        date: "2024-03-18",
        snippet: "최근 연방준비제도 회의록 발표 이후 주요 지수들이 사상 최고치를 기록했습니다.",
        url: "https://reuters.com"
    }
];

export const NewsPanel = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(MOCK_NEWS);
    const [isLoading, setIsLoading] = useState(false);
    const [apiType, setApiType] = useState('google'); // 'google' 또는 'naver'

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        // TODO: 실제 API 호출 구현
        // 현재는 검색 지연 시뮬레이션
        setTimeout(() => {
            setIsLoading(false);
            // 실제 앱에서는 여기서 결과를 업데이트
        }, 1000);
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
                                placeholder="뉴스 검색..."
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
                        <Badge
                            variant={apiType === 'google' ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => setApiType('google')}
                        >
                            Google
                        </Badge>
                        <Badge
                            variant={apiType === 'naver' ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => setApiType('naver')}
                        >
                            Naver
                        </Badge>
                    </div>
                </CardHeader>
            </Card>

            <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="grid gap-4 pb-6">
                    {results.map((item) => (
                        <Card key={item.id} className="group transition-all hover:bg-accent/50 hover:shadow-md border-border/50">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="font-medium text-primary">{item.source}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {item.snippet}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => window.open(item.url, '_blank')}>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
