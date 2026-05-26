import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CrimeListItem from '../components/CrimeListItem';
import EmptyState from '../components/EmptyState';
import HeaderIconButton from '../components/HeaderIconButton';
import { listCrimes, type Crime } from '../storage/crimes';
import { useTheme } from '../theme/ThemeContext';

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();
  const [crimes, setCrimes] = useState<Crime[]>([]);

  useFocusEffect(
    useCallback(() => {
      listCrimes().then((loaded) => {
        const sorted = [...loaded].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setCrimes(sorted);
      });
    }, [])
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Criminal Intent',
          headerRight: () => (
            <View style={styles.headerRight}>
              <HeaderIconButton
                icon="add"
                accessibilityLabel="Add crime"
                onPress={() => router.push('/crime/new')}
              />
              <HeaderIconButton
                icon="settings-outline"
                accessibilityLabel="Settings"
                onPress={() => router.push('/settings')}
              />
            </View>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {crimes.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={crimes}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => (
              <CrimeListItem
                crime={item}
                onPress={() => router.push(`/crime/${item.id}`)}
              />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRight: { flexDirection: 'row', gap: 4 },
});
