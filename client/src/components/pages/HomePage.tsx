import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../NavBar"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
    return (
        <>
            <NavBar />
            <main>
                <div className="game-container">
                    <div className="game"></div>
                    <button className="btn">SOLVE!</button>
                </div>
            </main>
        </>
    )
}

export default HomePage
