import React from "react"
import { Link } from "react-router-dom"
import { LocalInnerSquare } from "../LocalInnerSquare"
import NavBar from "../NavBar"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
    return (
        <>
            <NavBar />
            <main>
                <div className="game-container">
                    <div className="game">
                        <LocalInnerSquare no_border_left no_border_top />
                        <LocalInnerSquare no_border_top />
                        <LocalInnerSquare no_border_top no_border_right />

                        <LocalInnerSquare no_border_left />
                        <LocalInnerSquare />
                        <LocalInnerSquare no_border_right />

                        <LocalInnerSquare no_border_bottom no_border_left />
                        <LocalInnerSquare no_border_bottom />
                        <LocalInnerSquare no_border_bottom no_border_right />
                    </div>
                    <button className="btn">SOLVE!</button>
                </div>
            </main>
        </>
    )
}

export default HomePage
