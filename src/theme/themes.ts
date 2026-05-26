import type { Theme, ThemeName } from './types';

export const themes: Record<ThemeName, Theme> = {
    Ocean: {
        name: 'Ocean',
        mode: 'light',
        colors: {
            headerBg: '#0F4C5C',
            headerTint: '#FFFFFF',
            background: '#F4EFE6',
            surface: '#FFFFFF',
            text: '#0B2027',
            textMuted: '#5C6F75',
            border: '#E2D9C8',
            accent: '#2A9D8F',
            accentText: '#FFFFFF',
            danger: '#DC2626',
        },
    },
    Midnight: {
        name: 'Midnight',
        mode: 'dark',
        colors: {
            headerBg: '#0B0F1A',
            headerTint: '#FFFFFF',
            background: '#111827',
            surface: '#1F2937',
            text: '#F3F4F6',
            textMuted: '#9CA3AF',
            border: '#374151',
            accent: '#818CF8',
            accentText: '#0B0F1A',
            danger: '#F87171',
        },
    },
    Sunset: {
        name: 'Sunset',
        mode: 'light',
        colors: {
            headerBg: '#9A3412',
            headerTint: '#FFFFFF',
            background: '#FEF3E8',
            surface: '#FFFFFF',
            text: '#4A1D0A',
            textMuted: '#92563A',
            border: '#FCD9B6',
            accent: '#E76F51',
            accentText: '#FFFFFF',
            danger: '#DC2626',
        },
    },
    Forest: {
        name: 'Forest',
        mode: 'light',
        colors: {
            headerBg: '#2D4A22',
            headerTint: '#FFFFFF',
            background: '#F5F1E8',
            surface: '#FFFFFF',
            text: '#1A2B14',
            textMuted: '#6B7C5F',
            border: '#D7D0BD',
            accent: '#5A7A3A',
            accentText: '#FFFFFF',
            danger: '#DC2626',
        },
    },
    Slate: {
        name: 'Slate',
        mode: 'dark',
        colors: {
            headerBg: '#1E293B',
            headerTint: '#FFFFFF',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#E2E8F0',
            textMuted: '#94A3B8',
            border: '#334155',
            accent: '#38BDF8',
            accentText: '#0F172A',
            danger: '#F87171',
        },
    },
    Sepia: {
        name: 'Sepia',
        mode: 'light',
        colors: {
            headerBg: '#6B4423',
            headerTint: '#FFFFFF',
            background: '#F4ECD8',
            surface: '#FCF7E8',
            text: '#2A1A0E',
            textMuted: '#8B6F4E',
            border: '#E0D3B0',
            accent: '#A0522D',
            accentText: '#FFFFFF',
            danger: '#DC2626',
        },
    },
};

export const themeNames = Object.keys(themes) as ThemeName[];

export const defaultThemeName: ThemeName = 'Ocean';

