type sudokuGrid = number[][]

export function isSudokuLegal(
    grid: sudokuGrid,
    row: number,
    col: number,
    num: number
) {
    const sizik = grid.length

    if (sizik > 8 || row > 8 || col > 8) {
        console.error("isLegal -> is not")
        return false
    }

    if (num > 9) {
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
): boolean {
    if (row == 9 - 1 && col == 9) {
        return true
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

            if (solveSudoku(grid, row, col + 1)) {
                return true
            }
        }

        grid[row][col] = 0
    }
    return false
}
