import { useState, useEffect } from "react";
const STORAGE_KEY = "financial-dashboard-widgets";
export const useWidgets = () => {
    const [widgets, setWidgets] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            }
            catch {
                return [];
            }
        }
        return [];
    });
    const [fullscreenWidgetId, setFullscreenWidgetId] = useState(null);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
    }, [widgets]);
    const addWidget = (preset) => {
        const newWidget = {
            ...preset,
            widgetId: `${preset.id}-${Date.now()}`,
        };
        setWidgets((prev) => [...prev, newWidget]);
    };
    const removeWidget = (widgetId) => {
        setWidgets((prev) => prev.filter((w) => w.widgetId !== widgetId));
    };
    const addCustomWidget = (url, name) => {
        const newWidget = {
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
    const updateWidgetZoom = (widgetId, zoom) => {
        // 보안: 줌 값을 25~200 사이로 검증 및 제한
        const sanitizedZoom = Math.max(25, Math.min(200, Math.floor(zoom)));
        setWidgets((prev) => prev.map((w) => (w.widgetId === widgetId ? { ...w, zoom: sanitizedZoom } : w)));
    };
    const toggleFullscreen = (widgetId) => {
        setFullscreenWidgetId(widgetId);
    };
    return {
        widgets,
        addWidget,
        removeWidget,
        addCustomWidget,
        updateWidgetZoom,
        fullscreenWidgetId,
        toggleFullscreen,
    };
};
