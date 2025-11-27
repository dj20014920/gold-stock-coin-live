import { useState } from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const ChatPanel = () => {
    const [iframeError, setIframeError] = useState(false);
    const CHATGPT_URL = "https://chatgpt.com";

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 relative">
            {iframeError ? (
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                    <Alert className="max-w-md border-destructive/50 bg-destructive/5">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <AlertTitle>Connection Refused</AlertTitle>
                        <AlertDescription className="space-y-4">
                            <p>
                                ChatGPT does not allow being embedded in other websites due to security policies (X-Frame-Options).
                            </p>
                            <Button
                                variant="default"
                                className="w-full gap-2"
                                onClick={() => window.open(CHATGPT_URL, '_blank')}
                            >
                                <ExternalLink className="h-4 w-4" />
                                Open ChatGPT in New Tab
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            ) : (
                <div className="flex-1 rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-white relative">
                    <iframe
                        src={CHATGPT_URL}
                        className="w-full h-full border-0"
                        title="ChatGPT"
                        onError={() => setIframeError(true)}
                    />
                </div>
            )}
        </div>
    );
};
