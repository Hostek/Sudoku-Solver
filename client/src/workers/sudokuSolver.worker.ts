export default () => {
    self.onmessage = (message) => {
        let { grid, solveSudoku } = message.data

        // solveSudoku = new Function("return ", solveSudoku)
        solveSudoku = new Function("grid", "row", "col", solveSudoku)

        const result = solveSudoku(grid, 0, 0)

        postMessage(result)
    }
}
