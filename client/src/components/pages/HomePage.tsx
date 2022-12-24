import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../NavBar"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
    return (
        <div>
            <NavBar />
            <div>Home Page!</div>
            <div>
                Link to test page: <Link to="/test">Test</Link>
            </div>
            <div>lorem*100</div>
        </div>
    )
}

export default HomePage
