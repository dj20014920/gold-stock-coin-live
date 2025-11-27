import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { NewsPanel } from "@/components/panels/NewsPanel";
import { MemoPanel } from "@/components/panels/MemoPanel";
import { ChatPanel } from "@/components/panels/ChatPanel";
import Index from "@/pages/Index"; // Dashboard
import Settings from "@/pages/Settings";
import { cn } from "@/lib/utils";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Layout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Handle tab changes
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

    const renderPanelContent = () => {
        switch (activeTab) {
            case "chat":
                return <ChatPanel />;
            case "news":
                return <NewsPanel />;
            case "memo":
                return <MemoPanel />;
            case "settings":
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-background font-sans text-foreground overflow-hidden">
            {/* 1. Fixed Navigation Rail */}
            <Sidebar
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onSettingsClick={() => handleTabChange("settings")}
            />

            {/* 2. Side Panel (Sliding Drawer) */}
            <div
                className={cn(
                    "fixed left-20 top-0 z-40 h-screen bg-card/80 backdrop-blur-xl border-r border-border/50 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isPanelOpen ? "w-[450px] translate-x-0 opacity-100" : "w-0 -translate-x-10 opacity-0 overflow-hidden"
                )}
            >
                <div className="h-full flex flex-col min-w-[450px]">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg capitalize">{activeTab}</span>
                            {activeTab === 'chat' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1 text-muted-foreground hover:text-primary"
                                    onClick={() => window.open("https://chatgpt.com", "_blank")}
                                    title="Open in new tab"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsPanelOpen(false)} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Panel Content */}
                    <div className="flex-1 overflow-hidden">
                        {renderPanelContent()}
                    </div>
                </div>
            </div>

            {/* 3. Main Content (Dashboard) */}
            <main
                className={cn(
                    "flex-1 h-screen overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "pl-20",
                    isPanelOpen ? "pl-[calc(5rem+450px)]" : "pl-20"
                )}
            >
                <div className="container mx-auto p-6 max-w-[1600px] h-full">
                    <Index />
                </div>
            </main>
        </div>
    );
};
