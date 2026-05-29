import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Checkbox from '../../components/Checkbox';
import HeaderIconButton from '../../components/HeaderIconButton';
import PhotoField from '../../components/PhotoField';
import SaveToast from '../../components/SaveToast';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import { useCrimeDraft } from '../../hooks/useCrimeDraft';
import { useDatePicker } from '../../hooks/useDatePicker';
import { useTheme } from '../../theme/ThemeContext';


function formatDate(iso: string): string {
    return new Date(iso)
        .toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        .toUpperCase();
}

export default function CrimeDetail() {
    const { theme } = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams<{ id: string }>();

    const { draft, update, save, toastVisible, hideToast } = useCrimeDraft(params.id);
    const datePicker = useDatePicker({
        value: new Date(draft.date),
        onChange: (date) => update({ date: date.toISOString() }),
    });


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Criminal Intent',
                    headerRight: () => (
                        <HeaderIconButton
                            icon="settings-outline"
                            accessibilityLabel="Settings"
                            onPress={() => router.push('/settings')}
                        />
                    ),
                }}
            />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.topRow}>
                        <PhotoField
                            uri={draft.photoUri}
                            onChange={(uri) => update({ photoUri: uri })}
                        />
                        <View style={styles.titleColumn}>
                            <Text style={[styles.label, { color: theme.colors.text, fontFamily: 'Fraunces_700Bold' }]}>
                                Title
                            </Text>
                            <ThemedTextInput
                                value={draft.title}
                                onChangeText={(t) => update({ title: t })}
                                placeholder="Title"
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.label, { color: theme.colors.text, fontFamily: 'Fraunces_700Bold' }]}>
                            Details
                        </Text>
                        <ThemedTextInput
                            variant="box"
                            value={draft.details}
                            onChangeText={(t) => update({ details: t })}
                            placeholder="What happened?"
                            multiline
                        />
                    </View>

                    <ThemedButton
                        label={formatDate(draft.date)}
                        onPress={datePicker.open}
                    />

                    <Checkbox
                        checked={draft.solved}
                        onChange={(v) => update({ solved: v })}
                        label="Solved"
                    />

                    <ThemedButton label="Save" onPress={save} />
                </ScrollView>

                {datePicker.picker}

                <SaveToast visible={toastVisible} onHide={hideToast} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 20, gap: 20 },
    topRow: { flexDirection: 'row', gap: 16 },
    titleColumn: { flex: 1, gap: 6, justifyContent: 'center' },
    section: { gap: 6 },
    label: { fontSize: 18 },
});

