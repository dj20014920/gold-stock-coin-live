import {
    LayoutDashboard,
    MessageSquare,
    Newspaper,
    StickyNote,
    Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NavItem = ({ icon: Icon, label, active, onClick }) => {
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClick}
                    className={cn(
                        "h-12 w-12 rounded-2xl transition-all duration-300",
                        active
                            ? "bg-primary text-primary-foreground shadow-md scale-105"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{label}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
                {label}
            </TooltipContent>
        </Tooltip>
    );
};

export const Sidebar = ({ activeTab, onTabChange, onSettingsClick }) => {
    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-20 border-r border-border/50 bg-background/80 backdrop-blur-xl flex flex-col items-center py-6 gap-6 shadow-sm">
            {/* Logo / Home Button */}
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => onTabChange('dashboard')}
                        className={cn(
                            "h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg mb-2 transition-transform hover:scale-105 active:scale-95",
                            activeTab === 'dashboard' ? "ring-2 ring-primary ring-offset-2" : ""
                        )}
                    >
                        <LayoutDashboard className="h-6 w-6 text-white" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                    Dashboard
                </TooltipContent>
            </Tooltip>

            {/* Navigation */}
            <div className="flex-1 flex flex-col gap-4 w-full items-center">
                {/* Dashboard item removed as requested, merged into Logo above */}

                <NavItem
                    icon={MessageSquare}
                    label="Chat"
                    active={activeTab === 'chat'}
                    onClick={() => onTabChange('chat')}
                />
                <NavItem
                    icon={Newspaper}
                    label="News"
                    active={activeTab === 'news'}
                    onClick={() => onTabChange('news')}
                />
                <NavItem
                    icon={StickyNote}
                    label="Memo"
                    active={activeTab === 'memo'}
                    onClick={() => onTabChange('memo')}
                />
            </div>

            {/* Footer */}
            <div className="mt-auto">
                <NavItem
                    icon={Settings}
                    label="Settings"
                    active={activeTab === 'settings'}
                    onClick={onSettingsClick}
                />
            </div>
        </aside>
    );
};
