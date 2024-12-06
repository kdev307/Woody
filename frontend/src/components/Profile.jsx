import {
    Edit,
    History,
    Person,
    Logout,
    Reviews,
    LocationOn,
    Email,
    PhoneAndroid,
    Cake,
} from "@mui/icons-material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/userActions";

function Profile({ user }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logOut());
    };
    return (
        <div className="profile-container mt-20">
            <div className="profile-heading flex items-center justify-evenly -mt-8">
                <h1 className="profile-title text-4xl text-center text-[#014210] font-bold">
                    My Profile
                </h1>
                <Person style={{ fontSize: "2.4rem", color: "#014210" }} />
            </div>
            <Edit
                className="edit-btn mt-4 font-semibold absolute"
                style={{
                    fontSize: "2rem",
                    color: "#560000",
                    transform: "translateX(28rem)",
                }}
            />
            {/* <button className="profile-btn edit-btn">
                Edit Profile <Edit />
                </button> */}
            <div className="info-container flex flex-col justify-center items-center gap-0 p-4">
                <div className="basic-info flex items-center justify-between mt-8 gap-8">
                    <img
                        src="/images/testimonials/customer-5.jpg"
                        alt={`${user.name}"'s image"`}
                        className="profile-img border-4 border-[#014210] shadow-[2px_2px_5px_#014210] w-40 rounded-[50%]"
                    />
                    <div className="main-info flex flex-col items-start justify-start gap-2 mt-4 -mb-4">
                        <h2 className="name text-left text-3xl font-extrabold w-80 break-words text-[#560000]">
                            {user.name}
                            {/* Hubert Blaine Wolfeschlegelsteinhausenbergerdroff
                            Sr. */}
                        </h2>
                        <h3 className="mobile text-left my-4 mx-0 text-2xl font-bold text-[#560000] flex items-center justify-center gap-4">
                            <PhoneAndroid
                                style={{ fontSize: "2rem", color: "#014210" }}
                            />{" "}
                            +91-9874563210
                        </h3>
                    </div>
                </div>
                <h3 className="mail text-left my-4 mx-0 text-xl font-semibold text-[#560000] flex items-center justify-center gap-4">
                    <Email style={{ fontSize: "2rem", color: "#014210" }} />{" "}
                    {user.email}
                </h3>
                <p className="endLine text-xl my-4 mx-0">
                    <hr
                        style={{
                            width: "25rem",
                            margin: "auto",
                            border: "0.15rem solid #014210",
                            borderRadius: "100rem",
                        }}
                    />
                </p>
                <div className="additional-info flex flex-col items-start justify-center text-left">
                    <h4 className="res-addr my-4 mx-0 text-lg font-medium text-[#560000] flex items-center justify-center gap-4">
                        <LocationOn
                            style={{ fontSize: "2.4rem", color: "#014210" }}
                        />{" "}
                        65C, Downtown, Manhattan, New York, United States of
                        America - 10013
                        {/* ##### */}
                    </h4>
                    <h4 className="dob my-4 mx-0 text-xl font-semibold text-[#560000] flex items-center justify-center gap-4">
                        <Cake style={{ fontSize: "2rem", color: "#014210" }} />{" "}
                        <Cake style={{ fontSize: "2rem", color: "#014210" }} />{" "}
                        September 30, 2000
                        <Cake
                            style={{ fontSize: "2rem", color: "#014210" }}
                        />{" "}
                        <Cake style={{ fontSize: "2rem", color: "#014210" }} />{" "}
                    </h4>
                </div>
                {/* <p className="endLine">
                    <hr
                    style={{
                        width: "100%",
                        margin: "auto",
                        border: "0.1rem solid #014210",
                        borderRadius: "100rem",
                        }}
                        />
                        </p> */}
            </div>
            <div className="profile-btns flex flex-col items-center justify-center gap-4 py-auto px-0 mx-0 my-2">
                <button className="profile-btn history-btn flex items-center justify-center gap-4 rounded-md w-full font-semibold text-xl text-center border-[3px] border-[#014210] text-[#014210] hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                    My Orders
                    <History />
                </button>
                <button className="profile-btn reviews-btn flex items-center justify-center gap-4 rounded-md w-full font-semibold text-xl text-center border-[3px] border-[#014210] text-[#014210] hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                    My Reviews
                    <Reviews />
                </button>
                <button
                    className="profile-btn logout-btn flex items-center justify-center gap-4 rounded-md w-full font-semibold text-xl text-center border-[3px] border-[#560000] text-[#560000] hover:bg-[#560000] hover:text-white transition-all ease-linear duration-1000"
                    onClick={handleLogOut}
                >
                    Log Out <Logout />
                </button>
            </div>
        </div>
    );
}

export default Profile;
