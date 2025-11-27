import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your application preferences.</p>
            </div>

            <div className="space-y-6">
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>Configure general application behavior.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Enable dark mode for the interface.</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive notifications about model updates.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>Manage your API keys for different providers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>OpenAI API Key</Label>
                            <Input type="password" placeholder="sk-..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Anthropic API Key</Label>
                            <Input type="password" placeholder="sk-ant-..." />
                        </div>
                        <div className="pt-2">
                            <Button>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
