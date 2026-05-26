import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
    checked: boolean;
    onChange: (next: boolean) => void;
    label: string;
};

export default function Checkbox({ checked, onChange, label }: Props) {
    const { theme } = useTheme();
    const scale = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(scale, {
            toValue: checked ? 1 : 0,
            useNativeDriver: true,
            friction: 5,
            tension: 120,
        }).start();
    }, [checked, scale]);

    return (
        <Pressable
            onPress={() => onChange(!checked)}
            style={styles.row}
            hitSlop={8}
        >
            <View
                style={[
                    styles.box,
                    { borderColor: theme.colors.border },
                    checked && { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
                ]}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Ionicons name="checkmark" size={16} color={theme.colors.accentText} />
                </Animated.View>
            </View>
            <Text
                style={[
                    styles.label,
                    { color: theme.colors.text, fontFamily: 'Manrope_500Medium' },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    box: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: { fontSize: 16 },
});
