import React, { useState } from "react";
import { AccountCircle, AppRegistration, Close, Login } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/profile.css";
import Profile from "./Profile";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";

const VIEW_NONE = "none";
const VIEW_LOGIN = "login";
const VIEW_SIGNUP = "signup";

function ProfileContainer({ handleProfileToggle, className, logInStatus }) {
    const [currentView, setCurrentView] = useState(VIEW_NONE);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleLogInClick = () => setCurrentView(VIEW_LOGIN);
    const handleRegisterClick = () => setCurrentView(VIEW_SIGNUP);
    const handleBackClick = () => setCurrentView(VIEW_NONE);
    return (
        <>
            <div className={`profile-container ${className}`}>
                <Close
                    className="profile-close-btn"
                    style={{ fontSize: "2.4rem" }}
                    onClick={handleProfileToggle}
                />
                {userInfo ? (
                    <Profile user={userInfo} />
                ) : (
                    <>
                        {currentView === VIEW_LOGIN && <LogIn onBack={handleBackClick} />}
                        {currentView === VIEW_SIGNUP && (
                            <SignUp
                                onBack={handleBackClick}
                                onSignUpSuccess={() => setCurrentView(VIEW_LOGIN)}
                            />
                        )}
                        {currentView === VIEW_NONE && (
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
