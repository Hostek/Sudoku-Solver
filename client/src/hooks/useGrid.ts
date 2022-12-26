import { useState } from "react"
import { inputsFormat } from "../types"
import useLocalStorage from "./useLocalStorage"

function initialValue() {
    let initial_inputs: inputsFormat = []

    for (let i = 0; i < 9; i++) {
        initial_inputs.push([])
        for (let j = 0; j < 9; j++) {
            initial_inputs[i].push(0)
        }
    }

    return initial_inputs
}

export function useGrid() {
    const [inputs, setInputs] = useLocalStorage<inputsFormat>(
        "inputs",
        initialValue()
    )

    return {
        inputs,
        setInputs,
    }
}
