import { useState } from 'react';
import { ExternalLink, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const ChatPanel = () => {
    const [iframeError, setIframeError] = useState(false);
    const GEMINI_URL = "https://gemini.google.com/app";

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 relative">
            {iframeError ? (
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                    <Alert className="max-w-md border-destructive/50 bg-destructive/5">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <AlertTitle>연결 거부됨</AlertTitle>
                        <AlertDescription className="space-y-4">
                            <p>
                                Gemini는 보안 정책(X-Frame-Options)으로 인해 다른 웹사이트에 임베드될 수 없습니다.
                            </p>
                            <Button
                                variant="default"
                                className="w-full gap-2"
                                onClick={() => window.open(GEMINI_URL, '_blank')}
                            >
                                <ExternalLink className="h-4 w-4" />
                                새 탭에서 Gemini 열기
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            ) : (
                <div className="flex-1 rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-white relative flex flex-col">
                    {/* 로그인 동기화 안내 */}
                    <div className="bg-muted/30 px-4 py-2 text-xs text-muted-foreground flex items-center gap-2 border-b border-border/50">
                        <Info className="h-3 w-3 shrink-0" />
                        <span>
                            브라우저 보안 정책으로 인해 로그인 상태가 동기화되지 않을 수 있습니다. 전체 기능을 사용하려면 "새 탭에서 열기"를 이용하세요.
                        </span>
                    </div>

                    <iframe
                        src={GEMINI_URL}
                        className="w-full h-full border-0"
                        title="Gemini"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        onError={() => setIframeError(true)}
                    />
                </div>
            )}
        </div>
    );
};
