import { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import EndOfNavbar from "./EndOfNavbar";
import User from "../interfaces/User";

interface NavbarProps {
    user: User | null
    darkMode: boolean
    setDarkMode: Function
}

const Navbar: FunctionComponent<NavbarProps> = ({ user, darkMode, setDarkMode }) => {

    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to={"/"} style={{ fontSize: "25px" }}>
                        <img src="Joker-Looking-White.jpg" alt="Logo" width="50" height="50" className="d-inline-block align-text-center rounded" />
                        BCard
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {user ?
                            user.userType == "regular" ? (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/about"}>About</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/favorites"}>Favorites</NavLink>
                                    </li>
                                </ul>
                            ) : user.userType == "business" ? (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/about"}>About</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/favorites"}>Favorites</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/my-cards"}>My Cards</NavLink>
                                    </li>
                                </ul>
                            ) : user.userType == "admin" && (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/about"}>About</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/favorites"}>Favorites</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/my-cards"}>My Cards</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/sandbox"}>Sandbox</NavLink>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/about"}>About</NavLink>
                                    </li>
                                </ul>
                            )}
                    </div>
                    <EndOfNavbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;