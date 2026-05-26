export type ThemeMode = "light" | "dark";

export type ThemeColors = {
    headerBg: string;
    headerTint: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentText: string;
    danger: string;
};

export type ThemeName =
    | 'Ocean'
    | 'Midnight'
    | 'Sunset'
    | 'Forest'
    | 'Slate'
    | 'Sepia';

export type Theme = {
    name: ThemeName;
    mode: ThemeMode;
    colors: ThemeColors;
};