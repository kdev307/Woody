import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
// import "../styles/navbar.css"
import ProfileContainer from "./ProfileContainer";
import { Person, ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";

function Navbar() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);
    const totalQuantity = cartItemsList.reduce(
        (acc, item) => acc + item.qty,
        0
    );

    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const handleProfileToggle = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`flex items-center justify-evenly bg-[#b8d6c0] brightness-175 py-4 top-0 left-0 w-full z-50 transition-all ease-in-out duration-300 ${
                    scrolled
                        ? "fixed bg-transparent backdrop-blur-md shadow-[5px_5px_10px_#b8d6c0] h-36"
                        : "bg-[#b8d6c0]"
                }`}
            >
                {/* <header className="flex items-center justify-start bg-transparent brightness-175 py-4 px-52 gap-56"> */}

                <NavLink to="/">
                    <Logo />
                </NavLink>

                <nav className="font-medium text-black text-xl">
                    <ul className="flex gap-7 items-center justify-center py-4">
                        <li>
                            <Link
                                to="hero"
                                smooth={true}
                                duration={500}
                                className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="categories"
                                smooth={true}
                                duration={500}
                                className="cursor-pointer"
                            >
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="popularProducts"
                                smooth={true}
                                duration={500}
                                className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="testimonials"
                                smooth={true}
                                duration={500}
                                className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                            >
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <NavLink
                                to="/store"
                                className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                            >
                                Store
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <nav>
                    <ul className="flex gap-7 items-center">
                        <li>
                            <button
                                className="text-black text-xl hover:text-[#006000] transition-colors"
                                onClick={handleProfileToggle}
                            >
                                {userInfo ? (
                                    <strong className="font-merriweather text-2xl">
                                        {userInfo.name}
                                    </strong>
                                ) : (
                                    <Person style={{ fontSize: "2rem" }} />
                                )}
                            </button>
                        </li>
                        <li>
                            <button
                                className="relative text-black hover:text-[#006000] transition-colors "
                                onClick={handleCartToggle}
                            >
                                <ShoppingCart style={{ fontSize: "2rem" }} />
                                <p className="absolute -top-1 left-[60%] text-black hover:text-[#006000] transition-colors duration-200 text-xl font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {userInfo ? totalQuantity : ""}
                                </p>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            {isCartOpen && (
                <Cart handleCartToggle={handleCartToggle} isOpen={isCartOpen} />
            )}
            {isProfileOpen && (
                <ProfileContainer
                    handleProfileToggle={handleProfileToggle}
                    // className={isProfileOpen ? "open" : ""}
                    isOpen={isProfileOpen}
                    logInStatus={false}
                />
            )}
        </>
    );
}

export default Navbar;
