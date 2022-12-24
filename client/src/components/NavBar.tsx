import React from "react"
import { Link } from "react-router-dom"

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
    return (
        <nav className="menu">
            <Link to="/" aria-label="Sudoku Solver">
                <div className="nv_a_container">
                    <span className="red-color">S</span>
                    <span>udoku</span>
                </div>
                <div className="nv_a_container">
                    <span className="red-color">S</span>
                    <span>olver</span>
                </div>
            </Link>
        </nav>
    )
}

export default NavBar
