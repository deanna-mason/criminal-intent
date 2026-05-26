import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
    label: string;
    onPress: () => void;
    uppercase?: boolean;
};

export default function ThemedButton({
    label,
    onPress,
    uppercase = true,
}: Props) {
    const { theme } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: theme.colors.accent },
                pressed && { transform: [{ scale: 0.96 }] },
            ]}
        >
            <Text
                style={[
                    styles.label,
                    {
                        color: theme.colors.accentText,
                        fontFamily: 'Manrope_600SemiBold',
                    },
                ]}
            >
                {uppercase ? label.toUpperCase() : label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        letterSpacing: 1.5,
    },
});
