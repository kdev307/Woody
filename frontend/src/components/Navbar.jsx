import React from "react";

function Navbar() {
    return (
        <div>
            <header className="head">
                <a href="youtube.com">
                    <img src="#" alt="Woody Logo" />
                </a>
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
