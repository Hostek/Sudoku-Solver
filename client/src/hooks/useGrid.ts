import { useCallback, useState } from "react"
import { getSquare, inputsFormat, updateSquare } from "../types"
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

    console.log({ inputs })

    const updateSquare: updateSquare = useCallback((squareNum: number) => {
        return (newVal: number, rowNum: number, colNum: number) => {
            setInputs((prev) => {
                let new_arr = [...prev]

                new_arr[squareNum][rowNum * 3 + colNum] = newVal

                return new_arr
            })
        }
    }, [])

    const getSquare: getSquare = useCallback(
        (squareNum: number) => {
            return (rowNum: number, colNum: number) => {
                return inputs[squareNum][rowNum * 3 + colNum]
            }
        },
        [inputs]
    )

    return {
        inputs,
        setInputs,
        updateSquare,
        getSquare,
    }
}
