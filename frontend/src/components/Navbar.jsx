import React from "react";
import Logo from "./Logo";
import { Person, Store } from "@mui/icons-material";
import "../styles/navbar.css";
import "../styles/common.css";

function Navbar() {
    let isHome = true;
    return (
        <div>
            <header className="head">
                <Logo />
                {isHome && (
                    <nav className="main-nav">
                        <ul className="main-nav-list">
                            <li>
                                <a href="" className="main-nav-link">
                                    Home
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="main-nav-link">
                                    About
                                </a>
                            </li> */}
                            <li>
                                <a href="" className="main-nav-link">
                                    Category
                                </a>
                            </li>
                            <li>
                                <a href="" className="main-nav-link">
                                    Products
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="main-nav-link">
                                    Benefits
                                </a>
                            </li> */}
                            <li>
                                <a href="" className="main-nav-link">
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a href="" className="main-nav-link">
                                    Store
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
                <nav className="user-nav">
                    <ul className="user-nav-list">
                        <li>
                            <button className="main-nav-link profile-btn">
                                <Person style={{ fontSize: "2rem" }} />
                            </button>
                        </li>
                        <li>
                            <button className="main-nav-link profile-btn">
                                <Store style={{ fontSize: "2rem" }} />
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
