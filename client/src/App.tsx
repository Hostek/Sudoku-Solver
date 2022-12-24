import { Route, Routes } from "react-router-dom"
import HomePage from "./components/pages/HomePage"
import TestPage from "./components/pages/TestPage"

function App() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    )
}

export default App
