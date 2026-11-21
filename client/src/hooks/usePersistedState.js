import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { errorMessages } from "../utils/constants/global";

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
                console.error(errorMessages.SECURE_STORE_GET, error);
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }, [key]);

    useEffect(() => {
        if (!isLoaded) return;

        SecureStore.setItemAsync(key, JSON.stringify(value))
            .catch((error) => {
                console.error(errorMessages.SECURE_STORE_SET, error);
            });
    }, [key, value, isLoaded]);

    return [value, setValue, isLoaded];
}