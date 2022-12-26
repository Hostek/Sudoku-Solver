import { Dispatch, SetStateAction, useEffect, useState } from "react"

const PREFIX = "sudoku-solver"

export default function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const prefixedKey = PREFIX + "-" + key

    const [value, setValue] = useState<T>(() => {
        if (typeof localStorage !== "undefined") {
            const jsonValue = localStorage.getItem(prefixedKey)
            if (jsonValue != null) return JSON.parse(jsonValue)
        }

        if (typeof initialValue === "function") {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
