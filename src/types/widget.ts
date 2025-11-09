export type WidgetCategory = "crypto" | "stock" | "gold" | "forex" | "custom";

export interface WidgetPreset {
  id: string;
  name: string;
  url: string;
  category: WidgetCategory;
  icon: string;
  description?: string;
}

export interface Widget extends WidgetPreset {
  widgetId: string; // unique instance id
}
