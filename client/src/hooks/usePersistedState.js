import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function usePersistedState(key, initialValue) {
    const [value, setValue] = useState(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        SecureStore.getItemAsync(key)
            .then((storedValue) => {
                if (storedValue !== null) {
                    setValue(JSON.parse(storedValue));
                }
            })
            .catch((error) => {
                // todo add constant
                console.error("Failed to load value from SecureStore", error);
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }, [key]);

    useEffect(() => {
        if (!isLoaded) return;

        SecureStore.setItemAsync(key, JSON.stringify(value))
            .catch((error) => {
                console.error("Failed to save value to SecureStore", error);
            });
    }, [key, value, isLoaded]);

    return [value, setValue, isLoaded];
}