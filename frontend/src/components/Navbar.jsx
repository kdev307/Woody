import React from "react";

function Navbar() {
    let isHome = true;
    return (
        <div>
            <header className="head">
                <a href="#" className="logo">
                    <h2>space resrved for Logo</h2>
                </a>
                {isHome && (
                    <nav className="main-nav">
                        <ul className="main-nav-list">
                            <li>
                                <a href="" className="main-nav-link">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="" className="main-nav-link">
                                    About
                                </a>
                            </li>
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
                            <li>
                                <a href="" className="main-nav-link">
                                    Benefits
                                </a>
                            </li>
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
                                Profile Button Icon
                            </button>
                        </li>
                        <li>
                            <button className="main-nav-link profile-btn">Cart Button Icon</button>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
