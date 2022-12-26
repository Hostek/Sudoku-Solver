import { useCallback, useMemo, useState } from "react"
import { getSquare, inputsFormat, sudokuGrid, updateSquare } from "../types"
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

    const updateSquare: updateSquare = useCallback(
        (squareNum: number) => {
            return (newVal: number, rowNum: number, colNum: number) => {
                setInputs((prev) => {
                    let new_arr = [...prev]

                    new_arr[squareNum][rowNum * 3 + colNum] = newVal

                    return new_arr
                })
            }
        },
        [setInputs]
    )

    const getSquare: getSquare = useCallback(
        (squareNum: number) => {
            // console.log({ squareNum })
            return (rowNum: number, colNum: number) => {
                return inputs[squareNum][rowNum * 3 + colNum]
            }
        },
        [inputs]
    )

    const grid: sudokuGrid = useMemo(() => {
        let local_grid: sudokuGrid = []

        for (let i = 0; i < 9; i++) {
            local_grid.push([])
            let square_row = Math.floor(i / 3)
            for (let j = 0; j < 9; j++) {
                let square_col = Math.floor(j / 3)

                const res = getSquare(square_row * 3 + square_col)(i % 3, j % 3)

                local_grid[i].push(res)
            }
        }

        return local_grid
    }, [getSquare])

    console.log({ grid })

    return {
        inputs,
        setInputs,
        updateSquare,
        getSquare,
        grid,
    }
}
