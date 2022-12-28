import { useCallback, useMemo, useState } from "react"
import { getSquare, inputsFormat, sudokuGrid, updateSquare } from "../types"
import { isLegalGrid, isSudokuLegal, solveSudoku } from "../utils/solveSudoku"
import useLocalStorage from "./useLocalStorage"

import WorkerBuilder from "../workers/worker-builder"
import Worker from "../workers/sudokuSolver.worker"
import { isNumber } from "../utils/isNumber"

const instance = new WorkerBuilder(Worker)

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

                const res = Math.abs(
                    getSquare(square_row * 3 + square_col)(i % 3, j % 3)
                )

                local_grid[i].push(res)
            }
        }

        return local_grid
    }, [getSquare])

    const solveSudokuFunc = useCallback(async () => {
        return new Promise<false | sudokuGrid>((resolve) => {
            if (!isLegalGrid(grid)) {
                resolve(false)
                return
            }

            // const res = solveSudoku(grid, 0, 0)

            let to_string = ""
            to_string += isNumber.toString().replaceAll("\n", "")
            to_string += " ; "
            to_string += isSudokuLegal.toString().replaceAll("\n", "")
            to_string += " ; "
            to_string += solveSudoku.toString().replaceAll("\n", "")
            to_string += ` ; return ${solveSudoku.name}(grid, row, col)`

            // console.log({ to_string })

            instance.postMessage({
                grid,
                solveSudoku: to_string,
            })

            instance.onmessage = (message) => {
                const res = message.data

                // console.log({ res })

                if (typeof res === "boolean") {
                    resolve(res as any)
                    return
                }

                for (let i = 0; i < 9; i++) {
                    let square_row = Math.floor(i / 3)
                    for (let j = 0; j < 9; j++) {
                        let square_col = Math.floor(j / 3)

                        const square_num = square_row * 3 + square_col

                        const mn =
                            getSquare(square_num)(i % 3, j % 3) === 0 ? -1 : 1

                        updateSquare(square_num)(mn * res[i][j], i % 3, j % 3)
                    }
                }

                resolve(res)
            }
        })
    }, [updateSquare, getSquare, grid])

    // console.log({ grid })

    const clearAllInputs = useCallback(() => {
        setInputs(initialValue())
    }, [])

    const unsolveSudoku = useCallback(() => {
        setInputs((prev) => {
            let newArr = [...prev]

            newArr = newArr.map((arr) => {
                return arr.map((val) => {
                    if (val < 0) {
                        return 0
                    } else {
                        return val
                    }
                })
            })

            return newArr
        })
    }, [])

    return {
        inputs,
        setInputs,
        updateSquare,
        getSquare,
        grid,
        solveSudokuFunc,
        clearAllInputs,
        unsolveSudoku,
    }
}
