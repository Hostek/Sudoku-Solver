export interface anyObj {
    [key: string]: any
}

export type sudokuGrid = number[][]

export type inputsFormat = number[][]

export type getSquare = (
    squareNum: number
) => (rowNum: number, colNum: number) => number

export type updateSquare = (
    squareNum: number
) => (newVal: number, rowNum: number, colNum: number) => void
