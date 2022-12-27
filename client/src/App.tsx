import { Route, Routes } from "react-router-dom"
import HomePage from "./components/pages/HomePage"

function App() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            {/* <Route path="/test" element={<TestPage />} /> */}
        </Routes>
    )
}

export default App
