import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getCrime, saveCrime, type Crime } from '../storage/crimes';

export function useCrimeDraft(id: string) {
    const router = useRouter();
    const isNew = id === 'new';

    const [draft, setDraft] = useState<Crime>({
        id: '',
        title: '',
        details: '',
        date: new Date().toISOString(),
        solved: false,
    });
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        if (isNew) return;
        getCrime(id).then((found) => {
            if (found) setDraft(found);
            else router.back();
        });
    }, [id, isNew, router]);

    function update(changes: Partial<Crime>) {
        setDraft((prev) => ({ ...prev, ...changes }));
    }

    async function save() {
        let toSave = draft;
        if (!toSave.id) {
            toSave = { ...toSave, id: Crypto.randomUUID() };
            setDraft(toSave);
        }
        await saveCrime(toSave);
        if (isNew) {
            router.setParams({ id: toSave.id });
        }
        setToastVisible(true);
    }

    return {
        draft,
        update,
        save,
        toastVisible,
        hideToast: () => setToastVisible(false),
    };
}