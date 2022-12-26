export function isNumber(input: any) {
    return (
        typeof input === "number" && !isNaN(input) && isFinite(input)
        // && Object.prototype.toString.apply(input) === "[object Number]"
    )
}
