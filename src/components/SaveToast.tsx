import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
    visible: boolean;
    onHide: () => void;
};

export default function SaveToast({ visible, onHide }: Props) {
    const { theme } = useTheme();
    const slide = useRef(new Animated.Value(60)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.85)).current;

    useEffect(() => {
        if (!visible) return;
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 0,
                duration: 280,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 280,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                friction: 6,
                tension: 140,
            }),
        ]).start();

        const t = setTimeout(() => {
            Animated.parallel([
                Animated.timing(slide, {
                    toValue: 60,
                    duration: 280,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 280,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0.85,
                    duration: 280,
                    useNativeDriver: true,
                }),
            ]).start(() => onHide());
        }, 2000);

        return () => clearTimeout(t);
    }, [visible, slide, opacity, scale, onHide]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.toast,
                {
                    backgroundColor: theme.colors.accent,
                    transform: [{ translateY: slide }, { scale }],
                    opacity,
                },
            ]}
            pointerEvents="none"
        >
            <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.accentText}
            />
            <Text
                style={[
                    styles.label,
                    { color: theme.colors.accentText, fontFamily: 'Manrope_600SemiBold' },
                ]}
            >
                Saved
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 56,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 999,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
    },
    label: { fontSize: 17 },
});