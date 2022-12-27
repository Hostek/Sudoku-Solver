import { useCallback, useMemo } from "react"
import { anyObj, getSquare, updateSquare } from "../types"
import { isNumber } from "../utils/isNumber"

interface LocalProps {
    no_border_left?: boolean
    no_border_right?: boolean
    no_border_bottom?: boolean
    no_border_top?: boolean
    updateValue: ReturnType<updateSquare>
    getValue: ReturnType<getSquare>
}

export const LocalInnerSquare: React.FC<LocalProps> = ({
    no_border_bottom,
    no_border_left,
    no_border_right,
    no_border_top,
    getValue,
    updateValue,
}) => {
    const local_styles = useMemo(() => {
        let obj: anyObj = {}

        // if (no_border_bottom) {
        //     obj["--border-bottom"] = "0"
        // }

        // if (no_border_left) {
        //     obj["--border-left"] = "0"
        // }

        // if (no_border_right) {
        //     obj["--border-right"] = "0"
        // }

        // if (no_border_top) {
        //     obj["--border-top"] = "0"
        // }

        const border_radius = "calc(var(--ii_border_radius) / 3)"

        if (no_border_bottom && no_border_left) {
            obj["borderBottomLeftRadius"] = border_radius.toString()
        }

        if (no_border_bottom && no_border_right) {
            obj["borderBottomRightRadius"] = border_radius.toString()
        }

        if (no_border_top && no_border_left) {
            obj["borderTopLeftRadius"] = border_radius.toString()
        }

        if (no_border_top && no_border_right) {
            obj["borderTopRightRadius"] = border_radius.toString()
        }

        return obj as any
    }, [])

    const localUpdate = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement>,
            rowNum: number,
            colNum: number
        ) => {
            // console.log({ g: e.currentTarget.value, rowNum, colNum })
            //|| isNaNe.currentTarget.value
            if (e.currentTarget.value == "") {
                return updateValue(0, rowNum, colNum)
            }

            const val = parseInt(e.currentTarget.value)

            if (!isNumber(val) || val < 0 || val > 9) {
                return
            }

            updateValue(val, rowNum, colNum)
        },
        [updateValue]
    )

    const localGetValue = useCallback(
        (rowNum: number, colNum: number) => {
            const val = getValue(rowNum, colNum)

            return Math.abs(val) || ""
        },
        [getValue]
    )

    return (
        <div className="inner-square" style={local_styles}>
            <input
                // type="number"
                value={localGetValue(0, 0)}
                onChange={(e) => localUpdate(e, 0, 0)}
                data-color={getValue(0, 0) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(0, 1)}
                onChange={(e) => localUpdate(e, 0, 1)}
                data-color={getValue(0, 1) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(0, 2)}
                onChange={(e) => localUpdate(e, 0, 2)}
                data-color={getValue(0, 2) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(1, 0)}
                onChange={(e) => localUpdate(e, 1, 0)}
                data-color={getValue(1, 0) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(1, 1)}
                onChange={(e) => localUpdate(e, 1, 1)}
                data-color={getValue(1, 1) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(1, 2)}
                onChange={(e) => localUpdate(e, 1, 2)}
                data-color={getValue(1, 2) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(2, 0)}
                onChange={(e) => localUpdate(e, 2, 0)}
                data-color={getValue(2, 0) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(2, 1)}
                onChange={(e) => localUpdate(e, 2, 1)}
                data-color={getValue(2, 1) < 0 ? "blue" : "black"}
            />
            <input
                // type="number"
                value={localGetValue(2, 2)}
                onChange={(e) => localUpdate(e, 2, 2)}
                data-color={getValue(2, 2) < 0 ? "blue" : "black"}
            />
        </div>
    )
}
