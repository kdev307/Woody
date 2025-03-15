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

function Footer() {
    return (
        <>
            <footer className="footer bg-[#738678] text-white p-8 pb-0">
                <div
                    style={{
                        gridTemplateAreas: `
                            "main-info endline endline"
                            "main-info links-info links-info"
                            "addr-info newsletter credit-copyright"
                            `,
                    }}
                    className="footer-info grid grid-cols-3 grid-rows-2 tab:flex tab:flex-col items-center justify-start"
                >
                    <div
                        className="main-info flex flex-col justify-center items-start text-center py-0 px-4 gap-4"
                        style={{ gridArea: "main-info" }}
                    >
                        <a href="#" className="logo-col">
                            <Logo />
                        </a>
                        <ul className="social-links flex justify-center items-center gap-8 p-4 pl-0">
                            <li className="social-links-item">
                                <Facebook style={{ fontSize: "4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <Instagram style={{ fontSize: "4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <LinkedIn style={{ fontSize: "4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <Twitter style={{ fontSize: "4rem" }} />
                            </li>
                            <li className="social-links-item">
                                <YouTube style={{ fontSize: "4rem" }} />
                            </li>
                        </ul>
                    </div>
                    <div
                        className="main-info flex flex-col justify-center items-start text-center py-0 px-4 gap-4"
                        style={{ gridArea: "addr-info" }}
                    >
                        <ul className="contacts flex flex-col justify-start items-start text-center font-semibold gap-8 text-3xl mob:text-[1.8rem]">
                            <li className="contacts-item flex items-center justify-center text-center gap-2">
                                <LocationOn style={{ fontSize: "3.6rem" }} />
                                <>
                                    39, Sector 4, HSR Layout,
                                    <br className="hidden mob:block" />
                                    Bengaluru, Karnataka, India - 560102
                                </>
                            </li>
                            <li className="contacts-item flex items-center justify-center text-center gap-2">
                                <>
                                    <Mail style={{ fontSize: "3.6rem" }} />
                                    help@woody.com, hello@woody.com
                                </>
                            </li>
                            <li className="contacts-item flex items-center justify-center text-center gap-2">
                                <>
                                    <Smartphone
                                        style={{ fontSize: "3.6rem" }}
                                    />
                                    044-78945236, 044-78945237
                                </>
                            </li>
                        </ul>
                        <br />
                    </div>
                    <p style={{ gridArea: "endline" }}>
                        <hr
                            style={{
                                width: "90%",
                                margin: "auto",
                                border: "0.1rem solid #fff",
                                borderRadius: "100rem",
                                marginTop: "-4rem",
                            }}
                        />
                    </p>
                    <div
                        className=" flex justify-evenly items-center text-center p-4 -mt-32 tab:mt-0 tab:gap-20 mob:grid mob:grid-cols-2 mob:gap-y-4"
                        style={{ gridArea: "links-info" }}
                    >
                        <nav className="nav-col p-5 account-links">
                            <p className="footer-heading text-4xl font-bold text-center lg_tab:text-[2rem]">
                                My Account
                            </p>
                            <ul className="footer-nav flex flex-col text-center items-center justify-center gap-4 pt-4 text-3xl lg_tab:text-[1.8rem] font-medium">
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
                        <nav className="nav-col p-5 category-links ">
                            <p className="footer-heading text-4xl font-bold text-center lg_tab:text-[2rem]">
                                Top Categories
                            </p>
                            <ul className="footer-nav flex flex-col text-center items-center justify-center pl-0 gap-4 pt-4 text-3xl lg_tab:text-[1.8rem] font-medium">
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
                        <nav className="nav-col p-5 info-links">
                            <p className="footer-heading text-4xl font-bold text-center lg_tab:text-[2rem]">
                                Information
                            </p>
                            <ul className="footer-nav flex flex-col text-center items-center justify-center pl-0 gap-4 pt-4 text-3xl lg_tab:text-[1.8rem] font-medium">
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
                        <nav className="nav-col p-5 help-links">
                            <p className="footer-heading text-4xl font-bold text-center lg_tab:text-[2rem]">
                                Need Help ?
                            </p>
                            <ul className="footer-nav flex flex-col text-center items-center justify-center pl-0 gap-4 pt-4 text-3xl lg_tab:text-[1.8rem] font-medium">
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
                    </div>
                    <div
                        className="newsletter p-4"
                        style={{ gridArea: "newsletter" }}
                    >
                        <h3 className="footer-heading text-4xl font-semibold text-center">
                            Subscribe to our Newsletter
                        </h3>
                        <form
                            action="#"
                            className="newsletter-form flex items-center justify-center gap-4 pt-4"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="p-4 rounded-full text-2xl border-none bg-white/85 text-black border border-black"
                            />
                            <button className="footer-btn bg-white text-[#738678] text-2xl font-bold border-2 border-white shadow-[5px_5px_10px_rgba(180,180,180,0.4)] transition duration-300 hover:bg-[#738678] hover:text-white">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div
                        className="flex flex-col items-center justify-center "
                        style={{ gridArea: "credit-copyright" }}
                    >
                        <h3 className="credit text-5xl font-merriweather font-semibold p-5 tracking-wider text-center">
                            Crafted by KD
                        </h3>
                        <p className="copyright text-[1.8rem]">
                            {/* Copyright © 2024 by Woody. All rights are reserved. */}
                            © {new Date().getFullYear()} <strong>Woody</strong>
                            .All Rights Reserved
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
