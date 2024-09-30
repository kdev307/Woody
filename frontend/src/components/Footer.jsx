import React from "react";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="main-info">
                    <a href="#" className="logo">
                        <h2>space resrved for Logo</h2>
                    </a>
                    <div className="social-media">
                        <ul className="social-media-list">
                            <li className="social-media-platform">Meta</li>
                            <li className="social-media-platform">Instagram</li>
                            <li className="social-media-platform">LinkedIn</li>
                            <li className="social-media-platform">X</li>
                            <li className="social-media-platform">Youtube</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <ul className="contact-list">
                            <li className="contact-list-item">Mobile No.</li>
                            <li className="contact-list-item">Mail</li>
                            <li className="contact-list-item">Address</li>
                        </ul>
                    </div>
                </div>
                <div className="other-info">
                    <h3>Other informations</h3>
                </div>
            </footer>
        </>
    );
}

export default Footer;
