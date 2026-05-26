import * as Crypto from 'expo-crypto';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Checkbox from '../../components/Checkbox';
import HeaderIconButton from '../../components/HeaderIconButton';
import PhotoField from '../../components/PhotoField';
import SaveToast from '../../components/SaveToast';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import { getCrime, saveCrime, type Crime } from '../../storage/crimes';
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
    const isNew = params.id === 'new';

    const [draft, setDraft] = useState<Crime>({
        id: '',
        title: '',
        details: '',
        date: new Date().toISOString(),
        solved: false,
    });
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        if (isNew) return;
        getCrime(params.id).then((found) => {
            if (found) setDraft(found);
            else router.back();
        });
    }, [params.id, isNew, router]);


    async function handleSave() {
        let toSave = draft;
        if (!toSave.id) {
            const newId = Crypto.randomUUID();
            toSave = { ...toSave, id: newId };
            setDraft(toSave);
        }
        await saveCrime(toSave);
        if (params.id === 'new') {
            router.setParams({ id: toSave.id });
        }
        setToastVisible(true);
    }


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
                            onChange={(uri) => setDraft({ ...draft, photoUri: uri })}
                        />
                        <View style={styles.titleColumn}>
                            <Text style={[styles.label, { color: theme.colors.text, fontFamily: 'Fraunces_700Bold' }]}>
                                Title
                            </Text>
                            <ThemedTextInput
                                value={draft.title}
                                onChangeText={(t) => setDraft({ ...draft, title: t })}
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
                            onChangeText={(t) => setDraft({ ...draft, details: t })}
                            placeholder="What happened?"
                            multiline
                        />
                    </View>

                    <ThemedButton
                        label={formatDate(draft.date)}
                        onPress={() => setDatePickerOpen(true)}
                    />

                    <Checkbox
                        checked={draft.solved}
                        onChange={(v) => setDraft({ ...draft, solved: v })}
                        label="Solved"
                    />

                    <ThemedButton label="Save" onPress={handleSave} />
                </ScrollView>

                <DateTimePickerModal
                    isVisible={datePickerOpen}
                    mode="date"
                    date={new Date(draft.date)}
                    onConfirm={(d) => {
                        setDatePickerOpen(false);
                        setDraft({ ...draft, date: d.toISOString() });
                    }}
                    onCancel={() => setDatePickerOpen(false)}
                />

                <SaveToast visible={toastVisible} onHide={() => setToastVisible(false)} />
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

