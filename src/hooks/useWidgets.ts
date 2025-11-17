import { useState, useEffect } from "react";
import { Widget, WidgetPreset } from "@/types/widget";

const STORAGE_KEY = "financial-dashboard-widgets";

export const useWidgets = () => {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (preset: WidgetPreset) => {
    const newWidget: Widget = {
      ...preset,
      widgetId: `${preset.id}-${Date.now()}`,
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.widgetId !== widgetId));
  };

  const addCustomWidget = (url: string, name: string) => {
    const newWidget: Widget = {
      id: "custom",
      widgetId: `custom-${Date.now()}`,
      name,
      url,
      category: "custom",
      icon: "Globe",
      description: "사용자 정의 위젯",
      type: "iframe",
      zoom: 100,
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const updateWidgetZoom = (widgetId: string, zoom: number) => {
    // Security: Validate and clamp zoom value between 25 and 200
    const sanitizedZoom = Math.max(25, Math.min(200, Math.floor(zoom)));
    setWidgets((prev) =>
      prev.map((w) => (w.widgetId === widgetId ? { ...w, zoom: sanitizedZoom } : w))
    );
  };

  return {
    widgets,
    addWidget,
    removeWidget,
    addCustomWidget,
    updateWidgetZoom,
  };
};
