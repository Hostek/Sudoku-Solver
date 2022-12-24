import React from "react"
import { Link } from "react-router-dom"

interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = ({}) => {
    return (
        <div>
            <div>Test Page!</div>
            <div>
                Link to home page: <Link to="/">Home</Link>
            </div>
        </div>
    )
}

export default TestPage
