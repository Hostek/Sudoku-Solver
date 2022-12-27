import { useCallback, useMemo, useState } from "react"
import { getSquare, inputsFormat, sudokuGrid, updateSquare } from "../types"
import { solveSudoku } from "../utils/solveSudoku"
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

    const solveSudokuFunc = useCallback(() => {
        const res = solveSudoku(grid, 0, 0)

        console.log({ res })

        if (typeof res === "boolean") {
            return res
        }

        for (let i = 0; i < 9; i++) {
            let square_row = Math.floor(i / 3)
            for (let j = 0; j < 9; j++) {
                let square_col = Math.floor(j / 3)

                // const res = getSquare(square_row * 3 + square_col)(i % 3, j % 3)
                updateSquare(square_row * 3 + square_col)(
                    res[i][j],
                    i % 3,
                    j % 3
                )
            }
        }

        return res
    }, [])

    // console.log({ grid })

    const clearAllInputs = useCallback(() => {
        setInputs(initialValue())
    }, [])

    return {
        inputs,
        setInputs,
        updateSquare,
        getSquare,
        grid,
        solveSudokuFunc,
        clearAllInputs,
    }
}
