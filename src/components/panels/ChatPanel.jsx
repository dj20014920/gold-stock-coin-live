import { useState, useEffect } from 'react';
import { ExternalLink, AlertTriangle, Info, CheckCircle2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const ChatPanel = () => {
    const [iframeError, setIframeError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [extensionReady, setExtensionReady] = useState(false);
    const GEMINI_URL = "https://gemini.google.com/app";

    useEffect(() => {
        // iframe 로드 타임아웃 설정
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        // Extension 상태 체크
        const checkExtension = async () => {
            try {
                if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
                    // background.js에 메시지를 보내서 확장 프로그램 활성화 확인
                    chrome.runtime.sendMessage(
                        { type: 'checkExtension' },
                        (response) => {
                            if (chrome.runtime.lastError) {
                                console.log('Extension not active:', chrome.runtime.lastError);
                                setExtensionReady(false);
                            } else if (response && response.active) {
                                console.log('Extension active, version:', response.version);
                                setExtensionReady(true);
                            }
                        }
                    );
                } else {
                    setExtensionReady(false);
                }
            } catch (e) {
                console.log('Extension check error:', e);
                setExtensionReady(false);
            }
        };

        checkExtension();

        return () => clearTimeout(loadTimer);
    }, []);

    const handleIframeLoad = () => {
        setIsLoading(false);
        setIframeError(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setIframeError(true);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 relative">
            {iframeError ? (
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm z-50">
                    <Alert className="max-w-lg border-destructive/50 bg-destructive/5">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <AlertTitle className="text-base">Gemini 연결 실패</AlertTitle>
                        <AlertDescription className="space-y-4 mt-3">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    Gemini는 X-Frame-Options 보안 정책으로 인해 iframe 삽입이 차단됩니다.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    이 문제를 해결하려면 다음 방법 중 하나를 선택하세요:
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Download className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">방법 1: Chrome 확장 프로그램 설치 (권장)</p>
                                            <p className="text-xs text-muted-foreground">
                                                manifest.json과 background.js가 포함된 프로그램을 Chrome 확장 프로그램으로 설치하면 자동으로 해결됩니다.
                                            </p>
                                            <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-1 ml-2 mt-2">
                                                <li>Chrome 브라우저에서 <code className="bg-background px-1 rounded">chrome://extensions/</code> 열기</li>
                                                <li>우측 상단 "개발자 모드" 활성화</li>
                                                <li>"압축해제된 확장 프로그램을 로드합니다" 클릭</li>
                                                <li>프로젝트의 <code className="bg-background px-1 rounded">public</code> 폴더 선택</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/50 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                        <ExternalLink className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">방법 2: 새 탭에서 열기</p>
                                            <p className="text-xs text-muted-foreground">
                                                Gemini를 별도 탭에서 사용합니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                    {/* 상태 안내 바 */}
                    <div className="bg-muted/30 px-4 py-2 text-xs flex items-center justify-between border-b border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Info className="h-3 w-3 shrink-0" />
                            <span>
                                {extensionReady
                                    ? "확장 프로그램이 활성화되어 있습니다. Gemini를 iframe으로 사용할 수 있습니다."
                                    : "브라우저 보안 정책으로 인해 로그인 상태가 동기화되지 않을 수 있습니다."}
                            </span>
                        </div>
                        {extensionReady && (
                            <div className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle2 className="h-3 w-3" />
                                <span className="font-medium">활성</span>
                            </div>
                        )}
                    </div>

                    {/* 로딩 오버레이 */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-10">
                            <div className="flex flex-col items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                                <p className="text-sm text-muted-foreground">Gemini 로드 중...</p>
                            </div>
                        </div>
                    )}

                    <iframe
                        src={GEMINI_URL}
                        className="w-full h-full border-0"
                        title="Gemini"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        onLoad={handleIframeLoad}
                        onError={handleIframeError}
                    />
                </div>
            )}
        </div>
    );
};
