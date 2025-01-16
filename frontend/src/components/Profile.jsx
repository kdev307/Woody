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
    LocalShipping,
    AdminPanelSettings,
} from "@mui/icons-material";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/userActions";
import { AddressModal, EditModal } from "./ProfileModals";
import { Link } from "react-router-dom";

function Profile({ user }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logOut());
    };

    const [activeModal, setActiveModal] = useState(null);
    const handleActiveModal = (modal) => {
        setActiveModal((prev) => (prev === modal ? null : modal));
    };

    return (
        <div className="profile-container mt-20 sm_desk:mt-0 sm_desk:scale-90">
            {userInfo.isAdmin ? (
                <h1 className="profile-title flex items-center justify-center gap-16 -mt-8 text-7xl text-center text-[#014210] font-bold">
                    Admin Profile
                    <AdminPanelSettings
                        style={{ fontSize: "4.8rem", color: "#014210" }}
                    />
                </h1>
            ) : (
                <h1 className="profile-title flex items-center justify-center gap-16 -mt-8 text-7xl text-center text-[#014210] font-bold">
                    My Profile
                    <Person style={{ fontSize: "4.8rem", color: "#014210" }} />
                </h1>
            )}
            <div
                className={`info-container flex flex-col ${
                    userInfo.isAdmin
                        ? "items-center justify-center gap-10"
                        : "items-start justify-start gap-4"
                } p-4`}
            >
                <div
                    className={`basic-info flex items-center justify-between ${
                        userInfo.isAdmin && "flex-col justify-center"
                    } mt-8 gap-8 w-[50%]`}
                >
                    <img
                        src={userInfo.profile_picture}
                        alt={`${userInfo.name}"'s image"`}
                        className="profile-img border-4 border-[#014210] shadow-[2px_2px_5px_#014210] w-full rounded-[50%]"
                    />
                    <div
                        className={`main-info flex flex-col ${
                            userInfo.isAdmin
                                ? "items-center justify-center"
                                : "items-start justify-start"
                        } gap-4 mt-4 -mb-4`}
                    >
                        {!userInfo.isAdmin && (
                            <h3 className="mobile text-left my-4 mx-0 text-4xl font-bold text-[#560000] flex items-center justify-center gap-4">
                                <PhoneAndroid
                                    style={{
                                        fontSize: "3.2rem",
                                        color: "#014210",
                                    }}
                                />{" "}
                                {userInfo.mobile_number}
                            </h3>
                        )}
                    </div>
                </div>

                <div className="additional-info w-full flex flex-col items-center justify-center text-center mx-auto">
                    <h2
                        className={`name text-6xl font-bold text-center w-full break-words
                        text-[#560000] ${
                            user.name.length > 25 ? "p-2" : "p-4"
                        }`}
                    >
                        {user.name}
                        {/* Hubert Blaine Wolfeschlegelsteinhausenbergerdroff Sr. */}
                    </h2>
                    <h3 className="mail text-left self-center my-4 mx-0 text-4xl font-semibold text-[#560000] flex items-center justify-center gap-4">
                        <Email
                            style={{ fontSize: "3.6rem", color: "#014210" }}
                        />{" "}
                        {user.email}
                    </h3>
                    {/* <p className="endLine  self-center text-xl m-0">
                        <hr
                            style={{
                                width: "42rem",
                                margin: "auto",
                                border: "0.19rem solid #014210",
                                borderRadius: "100rem",
                            }}
                        />
                    </p> */}
                    {!userInfo.isAdmin && (
                        <h4 className="dob my-4 mx-0 text-4xl font-bold text-[#560000] flex items-center justify-center gap-4">
                            <Cake
                                style={{
                                    fontSize: "3.6rem",
                                    color: "#014210",
                                }}
                            />{" "}
                            <Cake
                                style={{
                                    fontSize: "3.6rem",
                                    color: "#014210",
                                }}
                            />{" "}
                            {new Date(userInfo.date_of_birth).toLocaleString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                            <Cake
                                style={{
                                    fontSize: "3.6rem",
                                    color: "#014210",
                                }}
                            />{" "}
                            <Cake
                                style={{
                                    fontSize: "3.6rem",
                                    color: "#014210",
                                }}
                            />{" "}
                        </h4>
                    )}
                </div>

                {/* <p className="endLine  self-center text-xl m-0">
                    <hr
                        style={{
                            width: "42rem",
                            margin: "auto",
                            border: "0.19rem solid #014210",
                            borderRadius: "100rem",
                        }}
                    />
                </p> */}
            </div>
            <div className="profile-btns flex flex-col items-center justify-center gap-6 py-auto px-0 m-0">
                {!userInfo.isAdmin ? (
                    <div className="grid grid-cols-2 items-center justify-center gap-4 gap-y-6 w-full">
                        <button
                            className="profile-btn edit-btn flex items-center justify-center gap-6 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                            onClick={() => handleActiveModal("edit")}
                        >
                            Edit Profile
                            <Edit style={{ fontSize: "3.2rem" }} />
                        </button>
                        <button
                            className="profile-btn reviews-btn flex items-center justify-center gap-6 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                            onClick={() => handleActiveModal("address")}
                        >
                            My Addresses
                            <LocationOn style={{ fontSize: "3.2rem" }} />
                        </button>
                        <Link to="/order-history">
                            <button className="profile-btn history-btn flex items-center justify-center gap-6 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                                My Orders
                                <History style={{ fontSize: "3.2rem" }} />
                            </button>
                        </Link>
                        <Link to="/reviews">
                            <button className="profile-btn reviews-btn flex items-center justify-center gap-6 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                                My Reviews
                                <Reviews style={{ fontSize: "3.2rem" }} />
                            </button>
                        </Link>
                        {activeModal === "edit" && (
                            <EditModal
                                closeModal={() => setActiveModal(null)}
                            />
                        )}
                        {activeModal === "address" && (
                            <AddressModal
                                closeModal={() => setActiveModal(null)}
                            />
                        )}
                    </div>
                ) : (
                    <Link to="/admin/order-dispatch" className="w-full">
                        <button className="profile-btn dispatch-btn flex items-center justify-center gap-8 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                            View & Dispatch Orders
                            <LocalShipping style={{ fontSize: "3.2rem" }} />
                        </button>
                    </Link>
                )}
                <button
                    className="profile-btn logout-btn flex items-center justify-center gap-8 w-full p-3 border-[3px] border-[#560000] rounded-md text-[#560000] text-[2.4rem] font-semibold hover:bg-[#560000] hover:text-white transition-all ease-linear duration-1000"
                    onClick={handleLogOut}
                >
                    Log Out <Logout style={{ fontSize: "3.2rem" }} />
                </button>
            </div>
        </div>
    );
}

export default Profile;
