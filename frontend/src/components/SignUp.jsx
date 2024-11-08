import React, { useState, useEffect } from "react";
import "../styles/common.css";
import "../styles/profile.css";
import "../styles/form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { AppRegistration, ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp } from "../actions/userActions";

function SignUp({ onBack, onSignUpSuccess }) {
    // const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/signUp";

    const userSignUp = useSelector((state) => state.userSignUp);
    const { error, loading, userInfo } = userSignUp;

    useEffect(() => {
        if (userInfo) {
            onSignUpSuccess();
            // navigate("/");
            // navigate(redirect);
        }
        // }, [userInfo, redirect, onSignUpSuccess]);
    }, [userInfo, onSignUpSuccess]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    const validPassword = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match !");
            setMessageType("fail");
            // navigate();
        } else if (!validEmail.test(email)) {
            setMessage("Invalid Email Address !");
            setMessageType("fail");
        } else if (!validPassword.test(password)) {
            setMessage(
                "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
            setMessageType("fail");
        } else {
            dispatch(signUp(firstName, lastName, email, password));
            // setMessage("SignUp is Success !");
            // setMessageType("success");
            // onSignUpSuccess();
        }
    };

    return (
        <>
            <div className="sign-up-container">
                <div className="form-heading">
                    <h1 className="signup-title">Sign Up</h1>
                    <AppRegistration style={{ fontSize: "2.4rem" }} className="form-icon" />
                </div>
                {message && <Message message={message} messageType={messageType} />}

                <form action="post" className="form-container" onSubmit={handleSubmit}>
                    <div className="form-inputs">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-input"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your First Name"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="form-input"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your Last Name"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email Address"
                            required
                        />
                        <div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your Password"
                                required
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide Password" : "Show Password"}
                            >
                                {showPassword ? (
                                    <Visibility style={{ color: "#014210" }} />
                                ) : (
                                    <VisibilityOff style={{ color: "#014210" }} />
                                )}
                            </button>
                        </div>
                        {/* <small style={{ textAlign: "left" }}>
                            <b>*</b>Password must have a <b>minimum length of 8</b> and include{" "}
                            <b>[1-9][a-z][A-Z][_$@!#%^&*]</b>
                        </small> */}
                        <div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your Password"
                                required
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={toggleConfirmPasswordVisibility}
                                aria-label={showConfirmPassword ? "Hide Password" : "Show Password"}
                            >
                                {showConfirmPassword ? (
                                    <Visibility style={{ color: "#014210" }} />
                                ) : (
                                    <VisibilityOff style={{ color: "#014210" }} />
                                )}
                            </button>
                        </div>
                    </div>
                    {loading && <Loader />}
                    <button className="form-btn log-btn sign-up-btn" type="submit">
                        Sign Up
                    </button>
                </form>
                <ArrowBack
                    style={{ fontSize: "2.4rem", cursor: "pointer", marginTop: "1.2rem" }}
                    onClick={onBack}
                />
            </div>
        </>
    );
}

export default SignUp;
