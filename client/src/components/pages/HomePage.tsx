import React from "react"
import { Link } from "react-router-dom"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
    return (
        <div>
            <div>Home Page!</div>
            <div>
                Link to test page: <Link to="/test">Test</Link>
            </div>
        </div>
    )
}

export default HomePage
