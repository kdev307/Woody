import React, { useState } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import { Person, ShoppingCart } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };
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
                            <NavLink to="" className="main-nav-link">
                                Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="" className="main-nav-link">
                                Products
                            </NavLink>
                        </li>
                        {/* <li>
                                <NavLink to="#" className="main-nav-link">
                                    Benefits
                                </NavLink>
                            </li> */}
                        <li>
                            <NavLink to="" className="main-nav-link">
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
                                <ShoppingCart
                                    style={{ fontSize: "2rem" }}
                                    onClick={handleCartToggle}
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            {isCartOpen && (
                <Cart handleCartToggle={handleCartToggle} className={isCartOpen ? "open" : ""} />
            )}
        </div>
    );
}

export default Navbar;
