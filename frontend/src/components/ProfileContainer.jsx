import React, { useState, useEffect } from "react";
import {
    AccountCircle,
    AppRegistration,
    ArrowBack,
    Close,
    Login,
} from "@mui/icons-material";
import Profile from "./Profile";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const VIEW_NONE = "none";
const VIEW_LOGIN = "login";
const VIEW_SIGNUP = "signup";

function ProfileContainer({ handleProfileToggle, isOpen }) {
    const [currentView, setCurrentView] = useState(VIEW_NONE);
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const viewParam = searchParams.get("view");
        if (viewParam === VIEW_LOGIN) {
            setCurrentView(VIEW_LOGIN);
        } else if (viewParam === VIEW_SIGNUP) {
            setCurrentView(VIEW_SIGNUP);
        } else {
            setCurrentView(VIEW_NONE);
        }
    }, [location.search]);

    const handleLogInClick = () => setCurrentView(VIEW_LOGIN);
    const handleRegisterClick = () => setCurrentView(VIEW_SIGNUP);
    const handleBackClick = () => setCurrentView(VIEW_NONE);

    return (
        <>
            <div
                className={`profile-container fixed top-0 right-0 w-[50rem] h-full p-4 bg-[#e4efe4] shadow-[rgba(0,0,0,0.5)_-2px_0_5px] z-[1000] transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                // style={{
                //     transform: isOpen ? "translateX(0)" : "translateX(100%)",
                //     transition: "transform 0.3s ease-in-out",
                // }}
            >
                <div
                    className={`pt-12 flex items-center ${
                        !userInfo && currentView !== VIEW_NONE
                            ? "justify-between px-8"
                            : "justify-end mr-12"
                    } `}
                >
                    {!userInfo && currentView !== VIEW_NONE && (
                        <ArrowBack
                            className="text-[#014210] cursor-pointer"
                            style={{ fontSize: "3.6rem" }}
                            onClick={handleBackClick}
                        />
                    )}
                    {/* {currentView === VIEW_LOGIN ||
                    currentView === VIEW_SIGNUP ? (
                        <ArrowBack
                            style={{
                                fontSize: "2.8rem",
                                cursor: "pointer",
                                // marginTop: "-60rem",
                                // marginLeft: "1rem",
                            }}
                            onClick={handleBackClick}
                        />
                    ) : null} */}
                    <Close
                        className="profile-close-btn cursor-pointer text-[#014210] text-4xl "
                        onClick={handleProfileToggle}
                        style={{ fontSize: "3.6rem" }}
                    />
                </div>
                {userInfo ? (
                    <Profile user={userInfo} />
                ) : (
                    <>
                        {currentView === VIEW_LOGIN && (
                            <LogIn onBack={handleBackClick} />
                        )}
                        {currentView === VIEW_SIGNUP && (
                            <SignUp
                                onBack={handleBackClick}
                                onSignUpSuccess={() =>
                                    setCurrentView(VIEW_LOGIN)
                                }
                            />
                        )}
                        {currentView === VIEW_NONE && (
                            <div className="log-btns flex flex-col items-center justify-center gap-12 mt-12">
                                <AccountCircle
                                    style={{
                                        fontSize: "30rem",
                                        color: "#014210",
                                    }}
                                />
                                <button
                                    className="log-btn log-in-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-4xl font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                                    onClick={handleLogInClick}
                                >
                                    Log In
                                    <Login style={{ fontSize: "3.2rem" }} />
                                </button>
                                <button
                                    className="log-btn sign-up-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-4xl font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                                    onClick={handleRegisterClick}
                                >
                                    Sign Up
                                    <AppRegistration
                                        style={{ fontSize: "3.2rem" }}
                                    />
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
