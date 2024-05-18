import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


function useDeBounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue
}

export default useDeBounce;