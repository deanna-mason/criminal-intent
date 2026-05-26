import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = TextInputProps & {
    variant?: 'underline' | 'box';
};

export default function ThemedTextInput({
    variant = 'underline',
    style,
    ...rest
}: Props) {
    const { theme } = useTheme();

    const variantStyle =
        variant === 'underline'
            ? {
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
            }
            : {
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 12,
                padding: 12,
                minHeight: 100,
                textAlignVertical: 'top' as const,
            };

    return (
        <TextInput
            placeholderTextColor={theme.colors.textMuted}
            style={[
                styles.base,
                { color: theme.colors.text, fontFamily: 'Manrope_400Regular' },
                variantStyle,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    base: {
        fontSize: 16,
        paddingVertical: 8,
    },
});