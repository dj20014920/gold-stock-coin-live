import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { NewsPanel } from "@/components/panels/NewsPanel";
import { MemoPanel } from "@/components/panels/MemoPanel";
import { ChatPanel } from "@/components/panels/ChatPanel";
import Index from "@/pages/Index"; // 대시보드
import Settings from "@/pages/Settings";
import { cn } from "@/lib/utils";
import { X, ExternalLink, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Layout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelWidth, setPanelWidth] = useState(450);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    // 탭 변경 핸들러
    const handleTabChange = (tab) => {
        if (tab === "dashboard") {
            setIsPanelOpen(false);
            setActiveTab("dashboard");
        } else if (tab === "settings") {
            setActiveTab(tab);
            setIsPanelOpen(true);
        } else {
            if (activeTab === tab && isPanelOpen) {
                setIsPanelOpen(false);
                setActiveTab("dashboard");
            } else {
                setActiveTab(tab);
                setIsPanelOpen(true);
            }
        }
    };

    // 리사이즈 로직
    const startResizing = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e) => {
        if (isResizing) {
            // 새로운 너비 계산: 마우스 X 위치 - 사이드바 너비(80px)
            const newWidth = e.clientX - 80;
            if (newWidth >= 300 && newWidth <= 800) {
                setPanelWidth(newWidth);
            }
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        } else {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        }
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing]);

    return (
        <div className="flex min-h-screen w-full bg-background font-sans text-foreground overflow-hidden">
            {/* 1. 고정 내비게이션 레일 */}
            <Sidebar
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onSettingsClick={() => handleTabChange("settings")}
            />

            {/* 2. 사이드 패널 (슬라이딩 드로어) */}
            <div
                className={cn(
                    "fixed left-20 top-0 z-40 h-screen bg-card/80 backdrop-blur-xl border-r border-border/50 shadow-2xl transition-all ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isPanelOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0 overflow-hidden pointer-events-none",
                    isResizing ? "duration-0" : "duration-500" // 리사이즈 중에는 전환 비활성화
                )}
                style={{ width: isPanelOpen ? panelWidth : 0 }}
            >
                <div className="h-full flex flex-col w-full relative">
                    {/* 패널 헤더 */}
                    <div className="flex items-center justify-between p-4 border-b border-border/50 shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg capitalize">{activeTab}</span>
                            {activeTab === 'chat' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1 text-muted-foreground hover:text-primary"
                                    onClick={() => window.open("https://gemini.google.com/app", "_blank")}
                                    title="새 탭에서 열기"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsPanelOpen(false)} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* 패널 컨텐츠 - 숨김 렌더링을 통한 상태 보존 */}
                    <div className="flex-1 overflow-hidden relative">
                        <div className={cn("absolute inset-0 w-full h-full transition-opacity duration-300", activeTab === 'chat' ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none")}>
                            <ChatPanel />
                        </div>
                        <div className={cn("absolute inset-0 w-full h-full transition-opacity duration-300", activeTab === 'news' ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none")}>
                            <NewsPanel />
                        </div>
                        <div className={cn("absolute inset-0 w-full h-full transition-opacity duration-300", activeTab === 'memo' ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none")}>
                            <MemoPanel />
                        </div>
                        <div className={cn("absolute inset-0 w-full h-full transition-opacity duration-300", activeTab === 'settings' ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none")}>
                            <Settings />
                        </div>
                    </div>

                    {/* 리사이즈 핸들 */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary transition-colors z-50 flex items-center justify-center group"
                        onMouseDown={startResizing}
                    >
                        <div className="h-8 w-1 bg-border group-hover:bg-primary/50 rounded-full transition-colors" />
                    </div>
                </div>
            </div>

            {/* 3. 메인 컨텐츠 (대시보드) */}
            <main
                className={cn(
                    "flex-1 h-screen overflow-y-auto transition-all ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "pl-20",
                    isResizing ? "duration-0" : "duration-500"
                )}
                style={{ paddingLeft: isPanelOpen ? `calc(5rem + ${panelWidth}px)` : '5rem' }}
            >
                <div className="container mx-auto p-6 max-w-[1600px] h-full">
                    <Index />
                </div>
            </main>

            {/* 리사이즈 중 iframe 상호작용 방지를 위한 오버레이 */}
            {isResizing && <div className="fixed inset-0 z-[60] cursor-col-resize" />}
        </div>
    );
};
