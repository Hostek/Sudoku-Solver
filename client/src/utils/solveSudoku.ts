import { sudokuGrid } from "../types"
import { isNumber } from "./isNumber"

export function isLegalGrid(grid: sudokuGrid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            grid[i][j] = Math.abs(grid[i][j])
        }
    }

    // check rows
    for (let i = 0; i < 9; i++) {
        let arr: boolean[] = new Array(9).fill(false)

        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                continue
            }

            if (arr[grid[i][j]] === true) {
                return false
            } else {
                arr[grid[i][j]] = true
            }
        }
    }

    // check columns
    for (let j = 0; j < 9; j++) {
        let arr: boolean[] = new Array(9).fill(false)

        for (let i = 0; i < 9; i++) {
            if (grid[i][j] === 0) {
                continue
            }

            if (arr[grid[i][j]] === true) {
                return false
            } else {
                arr[grid[i][j]] = true
            }
        }
    }

    // check squares

    for (let i = 0; i < 9; i++) {
        let arr: boolean[] = new Array(9).fill(false)

        for (let j = 0; j < 9; j++) {
            let c1 = Math.floor(i / 3) * 3 + Math.floor(j / 3),
                c2 = (i % 3) * 3 + (j % 3)

            console.log({ c1 })

            if (grid[c1][c2] === 0) {
                continue
            }

            if (arr[grid[c1][c2]] === true) {
                return false
            } else {
                arr[grid[c1][c2]] = true
            }
        }
    }

    return true
}

export function isSudokuLegal(
    grid: sudokuGrid,
    row: number,
    col: number,
    num: number
) {
    const sizik = grid.length

    if (sizik > 9 || row > 8 || col > 8) {
        console.error("isLegal -> is not")
        return false
    }

    if (num > 9 || !isNumber(row) || !isNumber(col)) {
        return false
    }

    for (let x = 0; x < sizik; x++) {
        if (grid[row][x] == num) {
            return false
        }
    }

    for (let x = 0; x < sizik; x++) {
        if (grid[x][col] == num) {
            return false
        }
    }

    let startRow = row - (row % 3),
        startCol = col - (col % 3)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] == num) {
                return false
            }
        }
    }

    return true
}

/**
 *
 * @param grid
 * @param row
 * @param col
 * @returns if solution exists returns true; false otherwise
 */
export function solveSudoku(
    grid: sudokuGrid,
    row: number,
    col: number
): false | sudokuGrid {
    if (row == 9 - 1 && col == 9) {
        return grid
    }

    if (col == 9) {
        row++
        col = 0
    }

    if (grid[row][col] > 0) {
        return solveSudoku(grid, row, col + 1)
    }

    for (let num = 1; num <= 9; num++) {
        if (isSudokuLegal(grid, row, col, num)) {
            grid[row][col] = num

            if (!!solveSudoku(grid, row, col + 1)) {
                return grid
            }
        }

        grid[row][col] = 0
    }
    return false
}
