import React from "react";
import Logo from "./Logo";
import { Facebook, Instagram, LinkedIn, YouTube, Twitter } from "@mui/icons-material";
import { LocationOn, Mail, Smartphone } from "@mui/icons-material";
import "../styles/footer.css";
import "../styles/common.css";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-info">
                    <div className="main-info">
                        <a href="#" className="logo-col">
                            <Logo />
                        </a>
                        <ul className="social-links">
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
                        <ul className="contacts">
                            <li className="contacts-item">
                                <LocationOn style={{ fontSize: "1.6rem" }} />
                                39, Sector 4, HSR Layout, Bengaluru, Karnataka 560102
                            </li>
                            <li className="contacts-item">
                                <Mail style={{ fontSize: "1.6rem" }} />
                                help@woody.com, hello@woody.com
                            </li>
                            <li className="contacts-item">
                                <Smartphone style={{ fontSize: "1.6rem" }} />
                                044-78945236, 044-78945237
                            </li>
                        </ul>
                        <br />
                    </div>
                    <nav className="nav-col account-links">
                        <p className="footer-heading">My Account</p>
                        <ul className="footer-nav">
                            <li>
                                <a href="" className="footer-link">
                                    Sign In
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Register
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Order History
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="footer-link">
                                    Edit Profile
                                </a>
                            </li> */}
                        </ul>
                    </nav>
                    <nav className="nav-col category-links">
                        <p className="footer-heading">Top Categories</p>
                        <ul className="footer-nav">
                            <li>
                                <a href="" className="footer-link">
                                    Bedroom
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="footer-link">
                                    Dining
                                </a>
                            </li> */}
                            <li>
                                <a href="" className="footer-link">
                                    Living
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Office
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="nav-col info-links">
                        <p className="footer-heading">Information</p>
                        <ul className="footer-nav">
                            <li>
                                <a href="" className="footer-link">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Privacy Policy
                                </a>
                            </li>
                            {/* <li>
                                <a href="" className="footer-link"></a>
                            </li> */}
                        </ul>
                    </nav>
                    <nav className="nav-col help-links">
                        <p className="footer-heading">Need Help ?</p>
                        <ul className="footer-nav">
                            {/* <li>
                                <a href="" className="footer-link"></a>
                            </li> */}
                            <li>
                                <a href="" className="footer-link">
                                    Policies
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Order Track
                                </a>
                            </li>
                            <li>
                                <a href="" className="footer-link">
                                    Shipping & Devlivery
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="newsletter">
                        <h3 className="footer-heading">Subscribe to our Newsletter</h3>
                        <form action="#" className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" />
                            <button className="footer-btn">Subscribe</button>
                        </form>
                    </div>
                    <div className="credit">Crafted by KD</div>
                    <p className="copyright">
                        {/* Copyright © 2024 by Woody. All rights are reserved. */}©{" "}
                        {new Date().getFullYear()} <strong>Woody</strong>
                        .All Rights Reserved
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
