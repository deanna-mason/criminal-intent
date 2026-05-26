import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Crime } from '../storage/crimes';
import { useTheme } from '../theme/ThemeContext';

type Props = {
    crime: Crime;
    onPress: () => void;
};

function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function CrimeListItem({ crime, onPress }: Props) {
    const { theme } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.row,
                { borderBottomColor: theme.colors.border },
                pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
            ]}
        >
            {crime.photoUri ? (
                <Image source={{ uri: crime.photoUri }} style={styles.thumb} />
            ) : (
                <View
                    style={[
                        styles.thumb,
                        styles.placeholder,
                        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                    ]}
                >
                    <Ionicons
                        name="document-text-outline"
                        size={22}
                        color={theme.colors.textMuted}
                    />
                </View>
            )}
            <View style={styles.text}>
                <Text
                    numberOfLines={1}
                    style={[
                        styles.title,
                        { color: theme.colors.text, fontFamily: 'Fraunces_700Bold' },
                    ]}
                >
                    {crime.title || 'Untitled'}
                </Text>
                <Text
                    style={[
                        styles.date,
                        { color: theme.colors.textMuted, fontFamily: 'Manrope_500Medium' },
                    ]}
                >
                    {formatDate(crime.date)}
                </Text>
            </View>
            {crime.solved && (
                <MaterialCommunityIcons
                    name="handcuffs"
                    size={24}
                    color={theme.colors.text}
                />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        minHeight: 72,
    },
    thumb: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },
    placeholder: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    text: {
        flex: 1,
        gap: 2,
    },
    title: { fontSize: 17 },
    date: { fontSize: 13 },
});
