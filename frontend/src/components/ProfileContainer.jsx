import React, { useState } from "react";
import { AccountCircle, AppRegistration, Close, Login } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/profile.css";
import Profile from "./Profile";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function ProfileContainer({ handleProfileToggle, className, logInStatus }) {
    const [currentView, setCurrentView] = useState(null);
    const handleLogInClick = () => setCurrentView("login");
    const handleRegisterClick = () => setCurrentView("signup");
    return (
        <>
            <div className={`profile-container ${className}`}>
                <Close
                    className="profile-close-btn"
                    style={{ fontSize: "2.4rem" }}
                    onClick={handleProfileToggle}
                />
                {logInStatus === true ? (
                    <Profile />
                ) : (
                    <>
                        {currentView === "login" && <LogIn />}
                        {currentView === "signup" && <SignUp />}
                        {!currentView && (
                            <div className="log-btns">
                                <AccountCircle style={{ fontSize: "14.4rem", color: "#014210" }} />
                                <button className="log-btn log-in-btn" onClick={handleLogInClick}>
                                    Log In
                                    <Login />
                                </button>
                                <button
                                    className="log-btn sign-up-btn"
                                    onClick={handleRegisterClick}
                                >
                                    Sign Up
                                    <AppRegistration />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default ProfileContainer;
