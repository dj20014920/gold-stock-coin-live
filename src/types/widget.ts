export type WidgetCategory = "crypto" | "stock" | "gold" | "forex" | "custom";
export type WidgetType = "iframe" | "tradingview" | "script";

export interface WidgetPreset {
  id: string;
  name: string;
  url?: string; // Optional for script-based widgets
  category: WidgetCategory;
  icon: string;
  description?: string;
  type: WidgetType; // Widget rendering type
  symbol?: string; // For TradingView widgets
  scriptConfig?: Record<string, any>; // Configuration for script-based widgets
}

export interface Widget extends WidgetPreset {
  widgetId: string; // unique instance id
}
