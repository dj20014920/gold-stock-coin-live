import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check initial theme
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
    }, []);

    const toggleTheme = (checked) => {
        setIsDarkMode(checked);
        if (checked) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">설정</h1>
                <p className="text-muted-foreground mt-1">애플리케이션 환경을 설정합니다.</p>
            </div>

            <div className="space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                    <CardHeader>
                        <CardTitle>일반</CardTitle>
                        <CardDescription>화면 표시 방법을 설정합니다.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">다크 모드</Label>
                                <p className="text-sm text-muted-foreground">어두운 테마를 적용하여 눈의 피로를 줄입니다.</p>
                            </div>
                            <Switch
                                checked={isDarkMode}
                                onCheckedChange={toggleTheme}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
