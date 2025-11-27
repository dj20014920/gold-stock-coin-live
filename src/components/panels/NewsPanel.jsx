import { useState, useEffect } from 'react';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Mock data for initial display to avoid empty states before API integration
const MOCK_NEWS = [
    {
        id: 1,
        title: "Apple's New AI Strategy Revealed",
        source: "TechCrunch",
        date: "2024-03-20",
        snippet: "Apple is reportedly in talks with Google to build Gemini AI engine into iPhone.",
        url: "https://techcrunch.com"
    },
    {
        id: 2,
        title: "Bitcoin Surges Past All-Time High",
        source: "Bloomberg",
        date: "2024-03-19",
        snippet: "Cryptocurrency markets rally as institutional adoption grows.",
        url: "https://bloomberg.com"
    },
    {
        id: 3,
        title: "Global Stock Markets Rally on Fed News",
        source: "Reuters",
        date: "2024-03-18",
        snippet: "Major indices hit record highs following the latest Federal Reserve meeting minutes.",
        url: "https://reuters.com"
    }
];

export const NewsPanel = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(MOCK_NEWS);
    const [isLoading, setIsLoading] = useState(false);
    const [apiType, setApiType] = useState('google'); // 'google' or 'naver'

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        // TODO: Implement actual API calls here
        // For now, we simulate a search delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, this would update 'results' with fetched data
        }, 1000);
    };

    return (
        <div className="h-full flex flex-col space-y-4 p-6 animate-in fade-in duration-500">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">News</h1>
                <p className="text-muted-foreground">Latest updates from around the world.</p>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                <CardHeader className="pb-3">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search news..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-9 bg-background/50 border-border/50 focus-visible:ring-1"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
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
