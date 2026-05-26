import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel: string;
};

export default function headerIconButton({
    icon,
    onPress,
    accessibilityLabel,
}: Props) {
    const { theme } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            hitSlop={12}
        >
            <Ionicons name={icon} size={24} color={theme.colors.headerTint} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 6,
        marginHorizontal: 4,
    },
    pressed: { opacity: 0.6 },
});