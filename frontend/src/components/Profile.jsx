import { Edit, Close, History, Person } from "@mui/icons-material";
import React from "react";
import "../styles/common.css";
import "../styles/profile.css";

function Profile({ handleProfileToggle, className }) {
    return (
        <div className={`profile-section ${className}`}>
            <Close
                className="profile-close-btn"
                style={{ fontSize: "2.4rem" }}
                onClick={handleProfileToggle}
            />
            <div className="profile-heading">
                <h1 className="profile-title">My Profile</h1>
                <Person style={{ fontSize: "2.4rem", color: "#014210" }} />
            </div>

            <div className="basic-info">
                <img src="" alt="Ethan Hunt" className="profile-img" />
                <div className="main-info">
                    <h2 className="name">Ethan Hunt</h2>
                    <h3 className="mobile">787-456-3698</h3>
                    <h3 className="mail">ethan.hunt@imf.us</h3>
                </div>
            </div>
            <p className="endLine">
                <hr
                    style={{
                        width: "100%",
                        margin: "auto",
                        border: "0.1rem solid #014210",
                        borderRadius: "100rem",
                    }}
                />
            </p>
            <div className="additional-info">
                <div>
                    <h4 className="username">Username : Bravo Echo 11</h4>
                    <h4 className="gender">Gender : Male</h4>
                </div>
                <h4 className="dob">Birthday 🎂 : August 18, 1964</h4>
                <h4 className="res-addr">
                    Address : 65C, Downtown, Manhattan, New York, United States of America - 10013
                </h4>
            </div>
            <p className="endLine">
                <hr
                    style={{
                        width: "100%",
                        margin: "auto",
                        border: "0.1rem solid #014210",
                        borderRadius: "100rem",
                    }}
                />
            </p>
            <div className="profile-btns">
                <button className="profile-btn edit-btn">
                    Edit Profile <Edit />
                </button>
                <button className="profile-btn history-btn">
                    Order History <History />
                </button>
            </div>
        </div>
    );
}

export default Profile;
