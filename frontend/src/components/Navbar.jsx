import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import ProfileContainer from "./ProfileContainer";
import {
    Person,
    ShoppingCart,
    Close,
    Menu,
    Home,
    AdminPanelSettings,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
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
        // setIsMenuOpen(!isMenuOpen);
    };

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const handleProfileToggle = () => {
        setIsProfileOpen((prev) => !prev);
        // setIsMenuOpen(!isMenuOpen);
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const location = useLocation();
    const currentPage = location.pathname === "/" ? "home" : "others";
    return (
        <>
            <header
                className={`flex items-center px-12 h-fit sm_tab:pr-12 ${
                    currentPage !== "home"
                        ? "justify-between px-40"
                        : "justify-evenly"
                } lg_tab:justify-between lg_tab:px-16 sm_tab:px-0  brightness-175 pt-8 top-0 left-0 w-full z-50 transition-all ease-in-out duration-300 ${
                    scrolled
                        ? "fixed bg-transparent backdrop-blur-md shadow-[5px_5px_10px_#b8d6c0] h-[8.8rem]"
                        : " bg-[#e4efe4]"
                } ${
                    isMenuOpen
                        ? "fixed lg_tab:h-full lg_tab:flex-col shadow-none bg-[#fff2] backdrop-blur-md backdrop-brightness-75 items-end justify-center  pb-12"
                        : ""
                }`}
            >
                {/* <header className="flex items-center justify-start bg-transparent brightness-175 py-4 px-52 gap-56"> */}

                <NavLink
                    to="/"
                    className={` ${
                        !isMenuOpen
                            ? "sm_tab:hidden"
                            : "block order-2 self-center"
                    } `}
                >
                    <Logo />
                </NavLink>
                {currentPage === "home" && (
                    <nav
                        className={`${
                            !isMenuOpen
                                ? "lg_tab:hidden"
                                : "order-3 self-center"
                        } font-medium text-black text-4xl`}
                    >
                        <ul className="flex lg_tab:flex-col gap-16 sm_desk:gap-12 items-center justify-center py-4">
                            <li>
                                <Link
                                    to="hero"
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                                    activeClass="text-[#006000] lg_tab:bg-[#560000] lg_tab:text-white lg_tab:px-8 lg_tab:py-4 lg_tab:rounded-xl font-bold"
                                    spy={true}
                                    exact="true"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="categories"
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer hover:text-[#006000] hover:underline transition-colors active:text-[#006000]"
                                    activeClass="text-[#006000] lg_tab:bg-[#560000] lg_tab:text-white lg_tab:px-8 lg_tab:py-4 lg_tab:rounded-xl font-bold"
                                    spy={true}
                                    exact="true"
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
                                    activeClass="text-[#006000] lg_tab:bg-[#560000] lg_tab:text-white lg_tab:px-8 lg_tab:py-4 lg_tab:rounded-xl font-bold"
                                    spy={true}
                                    exact="true"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="testimonials"
                                    smooth={true}
                                    duration={500}
                                    offset={-100}
                                    className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                                    activeClass="text-[#006000] lg_tab:bg-[#560000] lg_tab:text-white lg_tab:px-8 lg_tab:py-4 lg_tab:rounded-xl font-bold"
                                    spy={true}
                                    exact="true"
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
                )}
                <nav
                    className={`${
                        !isMenuOpen
                            ? "lg_tab:hidden"
                            : "order-4 self-center pr-8"
                    }`}
                >
                    <ul className="flex gap-12 sm_desk:gap-8 items-center">
                        {currentPage !== "home" && (
                            <li>
                                <NavLink
                                    to="/"
                                    className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                                >
                                    <Home style={{ fontSize: "3.2rem" }} />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <button
                                className="text-black text-xl hover:text-[#006000] transition-colors"
                                onClick={handleProfileToggle}
                            >
                                {userInfo ? (
                                    userInfo.isAdmin ? (
                                        <AdminPanelSettings
                                            style={{ fontSize: "3.2rem" }}
                                        />
                                    ) : (
                                        <img
                                            src={userInfo.profile_picture}
                                            alt={`${userInfo.name}"'s image"`}
                                            className="profile-img border border-[#014210] shadow-[2px_2px_5px_#014210] w-20 rounded-[50%]"
                                        />
                                    )
                                ) : (
                                    <Person
                                        className="icon"
                                        style={{ fontSize: "3.2rem" }}
                                    />
                                )}
                            </button>
                        </li>
                        <li>
                            <button
                                className="relative text-black hover:text-[#006000] transition-colors "
                                onClick={handleCartToggle}
                            >
                                <ShoppingCart
                                    className="icon"
                                    style={{ fontSize: "3.2rem" }}
                                />
                                <p className="absolute -top-1 left-[60%] text-black hover:text-[#006000] transition-colors duration-200 text-xl font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {userInfo ? totalQuantity : ""}
                                </p>
                            </button>
                        </li>
                    </ul>
                </nav>
                <button
                    className="relative justify-end lg_tab:ml-auto  text-black hover:text-[#006000] transition-colors hidden lg_tab:flex"
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? (
                        <Close
                            className="icon order-1 self-end"
                            style={{ fontSize: "3.2rem" }}
                        />
                    ) : (
                        <Menu className="icon" style={{ fontSize: "3.2rem" }} />
                    )}
                </button>
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
