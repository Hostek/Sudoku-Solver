import React from "react"
import { Link } from "react-router-dom"
import { useGrid } from "../../hooks/useGrid"
import { LocalInnerSquare } from "../LocalInnerSquare"
import NavBar from "../NavBar"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
    const { getSquare, updateSquare, solveSudokuFunc } = useGrid()

    return (
        <>
            <NavBar />
            <main>
                <div className="game-container">
                    <div className="game">
                        <LocalInnerSquare
                            no_border_left
                            no_border_top
                            getValue={getSquare(0)}
                            updateValue={updateSquare(0)}
                        />
                        <LocalInnerSquare
                            no_border_top
                            getValue={getSquare(1)}
                            updateValue={updateSquare(1)}
                        />
                        <LocalInnerSquare
                            no_border_top
                            no_border_right
                            getValue={getSquare(2)}
                            updateValue={updateSquare(2)}
                        />

                        <LocalInnerSquare
                            no_border_left
                            getValue={getSquare(3)}
                            updateValue={updateSquare(3)}
                        />
                        <LocalInnerSquare
                            getValue={getSquare(4)}
                            updateValue={updateSquare(4)}
                        />
                        <LocalInnerSquare
                            no_border_right
                            getValue={getSquare(5)}
                            updateValue={updateSquare(5)}
                        />

                        <LocalInnerSquare
                            no_border_bottom
                            no_border_left
                            getValue={getSquare(6)}
                            updateValue={updateSquare(6)}
                        />
                        <LocalInnerSquare
                            no_border_bottom
                            getValue={getSquare(7)}
                            updateValue={updateSquare(7)}
                        />
                        <LocalInnerSquare
                            no_border_bottom
                            no_border_right
                            getValue={getSquare(8)}
                            updateValue={updateSquare(8)}
                        />
                    </div>
                    <button
                        className="btn"
                        onClick={() => {
                            solveSudokuFunc()
                        }}
                    >
                        SOLVE!
                    </button>
                    <button className="btn red">CLEAR ALL!</button>
                </div>
            </main>
        </>
    )
}

export default HomePage
