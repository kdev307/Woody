import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import ProfileContainer from "./ProfileContainer";
import { Person, ShoppingCart, Close, Menu } from "@mui/icons-material";
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header
                className={`flex flex-col lg:flex-row items-end lg:items-center px-12 h-fit lg:justify-evenly lg:px-0 bg-[#b8d6c0] lg:h-[9.6rem]  brightness-175 py-4 top-0 left-0 w-full z-50 transition-all ease-in-out duration-300 ${
                    scrolled
                        ? "fixed lg:fixed bg-transparent backdrop-blur-md shadow-[5px_5px_10px_#b8d6c0] lg:h-[8.8rem]"
                        : "bg-[#b8d6c0]"
                } ${
                    isMenuOpen
                        ? "fixed h-full shadow-none bg-[#fff2] backdrop-blur-md items-end justify-between"
                        : ""
                }`}
            >
                {/* <header className="flex items-center justify-start bg-transparent brightness-175 py-4 px-52 gap-56"> */}

                <NavLink
                    to="/"
                    className={`${
                        !isMenuOpen ? "hidden" : "order-2 self-center"
                    } lg:block`}
                >
                    <Logo />
                </NavLink>

                <nav
                    className={`${
                        !isMenuOpen ? "hidden" : "order-3 self-center"
                    } lg:block font-medium text-black text-xl`}
                >
                    <ul className="flex flex-col lg:flex-row gap-7 items-center justify-center py-4">
                        <li>
                            <Link
                                to="hero"
                                smooth={true}
                                duration={500}
                                className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                                activeClass="text-[#006000] font-bold"
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
                                activeClass="text-[#006000] font-bold"
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
                                activeClass="text-[#006000] font-bold"
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
                                className="cursor-pointer hover:text-[#006000] hover:underline transition-colors"
                                activeClass="text-[#006000] font-bold"
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

                <nav
                    className={`${
                        !isMenuOpen ? "hidden" : "order-4 self-center pr-8"
                    } lg:block`}
                >
                    <ul className="flex gap-7 items-center 2xl:text-2xl">
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
                                    <Person
                                        className="icon"
                                        style={{ fontSize: "2.4rem" }}
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
                                    style={{ fontSize: "2.4rem" }}
                                />
                                <p className="absolute -top-1 left-[60%] text-black hover:text-[#006000] transition-colors duration-200 text-xl font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {userInfo ? totalQuantity : ""}
                                </p>
                            </button>
                        </li>
                    </ul>
                </nav>
                <button
                    className="relative flex justify-end text-black hover:text-[#006000] transition-colors lg:hidden"
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? (
                        <Close
                            className="icon order-1 self-end"
                            style={{ fontSize: "2.4rem" }}
                        />
                    ) : (
                        <Menu className="icon" style={{ fontSize: "2.4rem" }} />
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
