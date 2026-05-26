import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { Theme } from '../theme/types';

type Props = {
    themeOption: Theme;
    selected: boolean;
    onPress: () => void;
};

export default function ThemeCard({ themeOption, selected, onPress }: Props) {
    const { theme: currentTheme } = useTheme();
    const swatches = [
        themeOption.colors.headerBg,
        themeOption.colors.background,
        themeOption.colors.accent,
        themeOption.colors.surface,
    ];
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: selected ? currentTheme.colors.accent : currentTheme.colors.border,
                    borderWidth: selected ? 2 : 1,
                },
                pressed && { opacity: 0.85 },
            ]}
        >
            <View style={styles.headerRow}>
                <View style={styles.titleColumn}>
                    <Text
                        style={[
                            styles.name,
                            { color: currentTheme.colors.text, fontFamily: 'Fraunces_700Bold' },
                        ]}
                    >
                        {themeOption.name}
                    </Text>
                    <Text
                        style={[
                            styles.mode,
                            { color: currentTheme.colors.textMuted, fontFamily: 'Manrope_600SemiBold' },
                        ]}
                    >
                        {themeOption.mode.toUpperCase()}
                    </Text>
                </View>
                {selected && (
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={currentTheme.colors.accent}
                    />
                )}
            </View>
            <View style={styles.swatches}>
                {swatches.map((c, i) => (
                    <View
                        key={i}
                        style={[
                            styles.swatch,
                            { backgroundColor: c, borderColor: currentTheme.colors.border },
                        ]}
                    />
                ))}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        gap: 14,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleColumn: { gap: 2 },
    name: { fontSize: 18 },
    mode: { fontSize: 11, letterSpacing: 1 },
    swatches: { flexDirection: 'row', gap: 8 },
    swatch: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
    },
});
