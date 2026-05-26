import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
    uri?: string;
    onChange: (uri: string) => void;
};

export default function PhotoField({ uri, onChange }: Props) {
    const { theme } = useTheme();

    async function pick() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 0.7,
        });
        if (!result.canceled && result.assets.length > 0) {
            onChange(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.column}>
            <View
                style={[
                    styles.photo,
                    {
                        backgroundColor: theme.colors.surface,
                        borderColor: uri ? theme.colors.border : theme.colors.textMuted,
                        borderStyle: uri ? 'solid' : 'dashed',
                    },
                ]}
            >
                {uri && <Image source={{ uri }} style={styles.image} />}
            </View>
            <Pressable
                onPress={pick}
                style={({ pressed }) => [
                    styles.camera,
                    { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                    pressed && { opacity: 0.7 },
                ]}
                accessibilityLabel="Choose photo"
            >
                <Ionicons name="camera-outline" size={22} color={theme.colors.text} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    column: { gap: 8, alignItems: 'center' },
    photo: {
        width: 88,
        height: 112,
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
    },
    image: { width: '100%', height: '100%' },
    camera: {
        width: 56,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
