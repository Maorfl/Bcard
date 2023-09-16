import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import User from "../interfaces/User";

interface EndOfNavbarProps {
    user: User | null
    darkMode: boolean
    setDarkMode: Function
}


const EndOfNavbar: FunctionComponent<EndOfNavbarProps> = ({ user, darkMode, setDarkMode }) => {

    return (
        <>
            {user == null ? (
                <ul className="nav justify-content-end">
                    <div className="me-5 fs-2" onClick={() => {
                        setDarkMode(!darkMode);
                        localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                    }}>
                        {darkMode ? (<i className="fa-solid fa-moon"></i>) : (<i className="fa-solid fa-sun"></i>)}
                    </div>
                    <li className="nav-item">
                        <NavLink to={"/register"}><button type="button" className="btn btn-lg btn-outline-warning">Sign Up</button></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/login"}><button type="button" className="btn btn-lg btn-outline-light ms-3">Login</button></NavLink>
                    </li>
                </ul>
            ) : (
                <ul className="nav justify-content-end">
                    <div className="me-5 fs-2" onClick={() => {
                        setDarkMode(!darkMode);
                        localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                    }}>
                        {darkMode ? (<i className="fa-solid fa-moon"></i>) : (<i className="fa-solid fa-sun"></i>)}
                    </div>
                    <li className="nav-item">
                        <NavLink to={"/profile"}><img src={user.image?.url ? user.image?.url : user.gender == "Male" ? "male-profile.jpg" : "female-profile.jpg"} height={"54px"} width={"54px"}
                            alt={user.image?.alt} className="rounded-circle" /></NavLink>
                    </li>
                </ul>
            )}
        </>
    );
}

export default EndOfNavbar;