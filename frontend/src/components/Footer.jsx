import React from "react";
import Logo from "./Logo";
import {
    Facebook,
    Instagram,
    LinkedIn,
    YouTube,
    Twitter,
} from "@mui/icons-material";
import { LocationOn, Mail, Smartphone } from "@mui/icons-material";
// import "../styles/footer.css";

function Footer() {
    return (
        <>
            <footer className="footer bg-[#738678] text-white p-4 pb-10">
                <div
                    style={{
                        gridTemplateAreas: `
                            "main-info main-info account-links category-links info-links help-links"
                            "main-info main-info account-links category-links info-links help-links"
                            "main-info main-info newsletter newsletter credit credit"
                            "main-info main-info newsletter newsletter copyright copyright"`,
                    }}
                    className="footer-info grid grid-cols-6 grid-rows-2 items-start justify-start"
                >
                    <div
                        className="main-info flex flex-col justify-center items-center text-center py-0 px-4 gap-4"
                        style={{ gridArea: "main-info" }}
                    >
                        <a href="#" className="logo-col">
                            <Logo />
                        </a>
                        <ul className="social-links flex justify-center items-center gap-8 p-4 pl-0">
                            <li className="social-links-item">
                                <Facebook style={{ fontSize: "2.4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <Instagram style={{ fontSize: "2.4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <LinkedIn style={{ fontSize: "2.4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <Twitter style={{ fontSize: "2.4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <YouTube style={{ fontSize: "2.4rem" }} />
                            </li>
                        </ul>
                        <ul className="contacts flex justify-center items-center text-center gap-4 text-base">
                            <li className="contacts-item flex items-center justify-center text-center gap-2 text-base">
                                <LocationOn style={{ fontSize: "1.8rem" }} />
                                39, Sector 4, HSR Layout, Bengaluru, Karnataka
                                560102
                            </li>
                            <li className="contacts-item flex items-center justify-center text-center gap-2 text-base">
                                <Mail style={{ fontSize: "1.8rem" }} />
                                help@woody.com, hello@woody.com
                            </li>
                            <li className="contacts-item flex items-center justify-center text-center gap-2 text-base">
                                <Smartphone style={{ fontSize: "1.8rem" }} />
                                044-78945236, 044-78945237
                            </li>
                        </ul>
                        <br />
                    </div>
                    <nav
                        className="nav-col p-5 account-links"
                        style={{ gridArea: "account-links" }}
                    >
                        <p className="footer-heading text-xl font-semibold text-center">
                            My Account
                        </p>
                        <ul className="footer-nav flex flex-col text-center items-center justify-center gap-6 pt-2">
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Sign In
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Register
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Order History
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="footer-link text-white transition-colors duration-300 hover:text-black">
                                    Edit Profile
                                </a>
                            </li> */}
                        </ul>
                    </nav>
                    <nav
                        className="nav-col p-5 category-links "
                        style={{ gridArea: "category-links" }}
                    >
                        <p className="footer-heading text-xl font-semibold text-center">
                            Top Categories
                        </p>
                        <ul className="footer-nav flex flex-col text-center items-center justify-center pl-0 gap-6 pt-2">
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Bedroom
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="footer-link text-white transition-colors duration-300 hover:text-black">
                                    Dining
                                </a>
                            </li> */}
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Living
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Office
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav
                        className="nav-col p-5 info-links"
                        style={{ gridArea: "info-links" }}
                    >
                        <p className="footer-heading text-xl font-semibold text-center">
                            Information
                        </p>
                        <ul className="footer-nav flex flex-col text-center items-center justify-center pl-0 gap-6 pt-2">
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="footer-link text-white transition-colors duration-300 hover:text-black"></a>
                            </li> */}
                        </ul>
                    </nav>
                    <nav
                        className="nav-col p-5 help-links"
                        style={{ gridArea: "help-links" }}
                    >
                        <p className="footer-heading text-xl font-semibold text-center">
                            Need Help ?
                        </p>
                        <ul className="footer-nav flex flex-col text-center items-center justify-center pl-0 gap-6 pt-2">
                            {/* <li>
                                <a href="" className="footer-link text-white transition-colors duration-300 hover:text-black"></a>
                            </li> */}
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Policies
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Order Track
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="footer-link text-white transition-colors duration-300 hover:text-black"
                                >
                                    Shipping & Devlivery
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div
                        className="newsletter"
                        style={{ gridArea: "newsletter" }}
                    >
                        <h3 className="footer-heading text-xl font-semibold text-center">
                            Subscribe to our Newsletter
                        </h3>
                        <form
                            action="#"
                            className="newsletter-form flex items-center justify-center gap-4 pt-4"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="p-[0.72rem] rounded-full text-base border-none bg-white/85 text-black border border-black"
                            />
                            <button className="footer-btn bg-white text-[#738678] font-bold border-2 border-white shadow-[5px_5px_10px_rgba(180,180,180,0.4)] transition duration-300 hover:bg-[#738678] hover:text-white">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div
                        className="credit text-3xl font-merriweather font-semibold p-5 tracking-wider text-center"
                        style={{ gridArea: "credit" }}
                    >
                        Crafted by KD
                    </div>
                    <p
                        className="copyright mt-4 mb-4 px-5 text-center tracking-wider"
                        style={{ gridArea: "copyright" }}
                    >
                        {/* Copyright © 2024 by Woody. All rights are reserved. */}
                        © {new Date().getFullYear()} <strong>Woody</strong>
                        .All Rights Reserved
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
