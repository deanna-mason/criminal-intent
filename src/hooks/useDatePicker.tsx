import DateTimePicker, {
    DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type UseDatePickerArgs = {
    value: Date;
    onChange: (date: Date) => void;
};

export function useDatePicker({ value, onChange }: UseDatePickerArgs) {
    const { theme } = useTheme();
    const [visible, setVisible] = useState(false);
    const [temp, setTemp] = useState(value);

    function open() {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value,
                mode: 'date',
                onValueChange: (_event, date) => {
                    if (date) onChange(date);
                },
            });
            return;
        }
        setTemp(value);
        setVisible(true);
    }

    function confirm() {
        onChange(temp);
        setVisible(false);
    }

    const picker =
        Platform.OS === 'ios' ? (
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
                <View style={[styles.sheet, { backgroundColor: theme.colors.surface }]}>
                    <View style={[styles.bar, { borderBottomColor: theme.colors.border }]}>
                        <Pressable onPress={() => setVisible(false)} hitSlop={8}>
                            <Text style={[styles.action, { color: theme.colors.textMuted }]}>
                                Cancel
                            </Text>
                        </Pressable>
                        <Pressable onPress={confirm} hitSlop={8}>
                            <Text style={[styles.action, { color: theme.colors.accent, fontWeight: '600' }]}>
                                Confirm
                            </Text>
                        </Pressable>
                    </View>
                    <DateTimePicker
                        value={temp}
                        mode="date"
                        display="spinner"
                        themeVariant={theme.mode}
                        textColor={theme.colors.text}
                        onValueChange={(_event, date) => {
                            if (date) setTemp(date);
                        }}
                    />
                </View>
            </Modal>
        ) : null;

    return { open, picker };
}

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: { paddingBottom: 24 },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    action: { fontSize: 16 },
});