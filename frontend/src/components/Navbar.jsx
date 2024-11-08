import React, { useState } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import ProfileContainer from "./ProfileContainer";
import { Person, ShoppingCart } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const handleProfileToggle = () => {
        setIsProfileOpen((prev) => !prev);
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
                                {userInfo ? (
                                    <strong onClick={handleProfileToggle}>{userInfo.name}</strong>
                                ) : (
                                    <Person
                                        style={{ fontSize: "2rem" }}
                                        onClick={handleProfileToggle}
                                    />
                                )}
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
            {isProfileOpen && (
                <ProfileContainer
                    handleProfileToggle={handleProfileToggle}
                    className={isProfileOpen ? "open" : ""}
                    logInStatus={false}
                />
            )}
        </div>
    );
}

export default Navbar;
