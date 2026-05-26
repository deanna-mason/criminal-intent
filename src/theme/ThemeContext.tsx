import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { defaultThemeName, themes } from './themes';
import type { Theme, ThemeName } from './types';

const STORAGE_KEY = 'criminal-intent:theme';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (name: ThemeName) => void;
    ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeName, setThemeName] = useState<ThemeName>(defaultThemeName);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
            if (stored && stored in themes) {
                setThemeName(stored as ThemeName);
            }
            setReady(true);
        });
    }, []);

    function setTheme(name: ThemeName) {
        setThemeName(name);
        AsyncStorage.setItem(STORAGE_KEY, name);
    }

    return (
        <ThemeContext.Provider
            value={{ theme: themes[themeName], setTheme, ready }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must e used inside ThemeProvider');
    }
    return ctx;
}
