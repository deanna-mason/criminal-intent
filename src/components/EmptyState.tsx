import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function EmptyState() {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <Ionicons
                name="document-text-outline"
                size={56}
                color={theme.colors.textMuted}
            />
            <Text
                style={[
                    styles.title,
                    { color: theme.colors.text, fontFamily: 'Fraunces_700Bold' },
                ]}
            >
                No reports yet.
            </Text>
            <Text
                style={[
                    styles.subtitle,
                    { color: theme.colors.textMuted, fontFamily: 'Manrope_400Regular' },
                ]}
            >
                Tap + to add one.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 40,
    },
    title: { fontSize: 22 },
    subtitle: { fontSize: 15 },
});
