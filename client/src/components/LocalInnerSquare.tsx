import { useMemo } from "react"
import { anyObj } from "../types"

interface LocalProps {
    no_border_left?: boolean
    no_border_right?: boolean
    no_border_bottom?: boolean
    no_border_top?: boolean
}

export const LocalInnerSquare: React.FC<LocalProps> = ({
    no_border_bottom,
    no_border_left,
    no_border_right,
    no_border_top,
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
            obj["border-bottom-left-radius"] = border_radius.toString()
        }

        if (no_border_bottom && no_border_right) {
            obj["border-bottom-right-radius"] = border_radius.toString()
        }

        if (no_border_top && no_border_left) {
            obj["border-top-left-radius"] = border_radius.toString()
        }

        if (no_border_top && no_border_right) {
            obj["border-top-right-radius"] = border_radius.toString()
        }

        return obj as any
    }, [])

    return (
        <div className="inner-square" style={local_styles}>
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
        </div>
    )
}
