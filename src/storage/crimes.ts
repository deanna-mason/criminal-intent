import AsyncStorage from '@react-native-async-storage/async-storage';

export type Crime = {
    id: string;
    title: string;
    details: string;
    date: string;   //ISO 8601
    solved: boolean;
    photoUri?: string;
};

const KEY = 'criminal-intent:crimes';

export async function listCrimes(): Promise<Crime[]> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function getCrime(id: string): Promise<Crime | null> {
    const all = await listCrimes();
    return all.find((c) => c.id === id) ?? null;
}

export async function saveCrime(crime: Crime): Promise<void> {
    const all = await listCrimes();
    const idx = all.findIndex((c) => c.id === crime.id);
    if (idx >= 0) {
        all[idx] = crime;
    } else {
        all.push(crime);
    }
    await AsyncStorage.setItem(KEY, JSON.stringify(all));
}