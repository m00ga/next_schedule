import { useEffect, useState } from "react";

const useLocalStorage = <T = string>(
    key: string
): [T | undefined, (value: T | undefined) => void] => {
    const [value, setValue] = useState<T | undefined>();

    useEffect(() => {
        const val = localStorage.getItem(key);

        if (val !== null) {
            try {
                const jsonVal = JSON.parse(val);
                setValue(jsonVal);
            } catch (e: unknown) {
                setValue(val as T);
            }
        }
    }, [key]);

    const setNewValue = (value: T | undefined) => {
        if (value) {
            if (typeof value === "object") {
                localStorage.setItem(key, JSON.stringify(value));
            } else if (typeof value === "string") {
                localStorage.setItem(key, value);
            }
        } else {
            localStorage.removeItem(key);
        }
        setValue(value);
    };

    return [value, setNewValue];
};

export default useLocalStorage;
