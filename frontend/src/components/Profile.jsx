import { Edit, History, Person, Logout, Reviews } from "@mui/icons-material";
import React from "react";
import "../styles/common.css";
import "../styles/profile.css";

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
        <div className={`profile-section`}>
            <div className="profile-heading">
                <h1 className="profile-title">My Profile</h1>
                <Person style={{ fontSize: "2.4rem", color: "#014210" }} />
            </div>
            {/* <Edit className="edit-btn" style={{ fontSize: "1.8rem" }} /> */}
            <button className="profile-btn edit-btn">
                Edit Profile <Edit />
            </button>
            <div className="info-container">
                <div className="basic-info">
                    <img src="" alt="Ethan Hunt" className="profile-img" />
                    <div className="main-info">
                        <h2 className="name">{user.name}</h2>
                        <h3 className="mobile">####</h3>
                        <h3 className="mail">{user.email}</h3>
                    </div>
                </div>
                <p className="endLine">
                    <hr
                        style={{
                            width: "15rem",
                            margin: "auto",
                            border: "0.1rem solid #014210",
                            borderRadius: "100rem",
                        }}
                    />
                </p>
                <div className="additional-info">
                    <div>
                        <h4 className="username">Username : ####</h4>
                        <h4 className="gender">Gender : ####</h4>
                    </div>
                    <h4 className="dob">Birthday 🎂 : ####</h4>
                    <h4 className="res-addr">
                        {/* Address : 65C, Downtown, Manhattan, New York, United States of America -
                        10013 */}
                        #####
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
            <div className="profile-btns">
                <button className="profile-btn history-btn">
                    My Orders
                    <History />
                </button>
                <button className="profile-btn reviews-btn">
                    My Reviews
                    <Reviews />
                </button>
                <button className="profile-btn logout-btn" onClick={handleLogOut}>
                    Log Out <Logout />
                </button>
            </div>
        </div>
    );
}

export default Profile;
