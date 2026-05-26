import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import ThemeCard from '../components/ThemeCard';
import { useTheme } from '../theme/ThemeContext';
import { themeNames, themes } from '../theme/themes';

export default function Settings() {
    const { theme, setTheme } = useTheme();
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Settings',
                    headerRight: () => null,
                }}
            />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    {themeNames.map((name) => (
                        <ThemeCard
                            key={name}
                            themeOption={themes[name]}
                            selected={theme.name === name}
                            onPress={() => setTheme(name)}
                        />
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 20, gap: 12 },
});
