import React from "react";
import Logo from "./Logo";
import { Person, ShoppingCart } from "@mui/icons-material";
import "../styles/navbar.css";
import "../styles/common.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <header className="head">
                <NavLink to="/">
                    <Logo />
                </NavLink>
                <nav className="main-nav">
                    <ul className="main-nav-list">
                        <li>
                            <NavLink to="/" className="main-nav-link">
                                Home
                            </NavLink>
                        </li>
                        {/* <li>
                                <NavLink to="#" className="main-nav-link">
                                    About
                                </NavLink>
                            </li> */}
                        <li>
                            <NavLink to="#c" className="main-nav-link">
                                Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#p" className="main-nav-link">
                                Products
                            </NavLink>
                        </li>
                        {/* <li>
                                <NavLink to="#" className="main-nav-link">
                                    Benefits
                                </NavLink>
                            </li> */}
                        <li>
                            <NavLink to="/#t" className="main-nav-link">
                                Testimonials
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/store" className="main-nav-link">
                                Store
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className="user-nav">
                    <ul className="user-nav-list">
                        <li>
                            <button className="main-nav-link profile-btn">
                                <Person style={{ fontSize: "2rem" }} />
                            </button>
                        </li>
                        <li>
                            <button className="main-nav-link profile-btn">
                                <ShoppingCart style={{ fontSize: "2rem" }} />
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
