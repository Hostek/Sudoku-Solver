import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../NavBar"

interface HomePageProps {}

const LocalInnerSquare: React.FC = () => {
    return (
        <div className="inner-square">
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

const HomePage: React.FC<HomePageProps> = ({}) => {
    return (
        <>
            <NavBar />
            <main>
                <div className="game-container">
                    <div className="game">
                        <LocalInnerSquare />
                        <LocalInnerSquare />
                        <LocalInnerSquare />

                        <LocalInnerSquare />
                        <LocalInnerSquare />
                        <LocalInnerSquare />

                        <LocalInnerSquare />
                        <LocalInnerSquare />
                        <LocalInnerSquare />
                    </div>
                    <button className="btn">SOLVE!</button>
                </div>
            </main>
        </>
    )
}

export default HomePage
