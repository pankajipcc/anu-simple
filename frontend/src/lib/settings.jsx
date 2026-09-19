import { createContext, useContext, useEffect, useState } from "react";
import { fetchSettings } from "@/lib/api";

const SettingsCtx = createContext({ settings: null, refresh: () => {} });

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(null);
    const refresh = async () => {
        try {
            const s = await fetchSettings();
            setSettings(s);
        } catch (e) {
            console.error("settings load", e);
        }
    };
    useEffect(() => {
        refresh();
    }, []);
    return <SettingsCtx.Provider value={{ settings, refresh }}>{children}</SettingsCtx.Provider>;
}

export const useSettings = () => useContext(SettingsCtx);
