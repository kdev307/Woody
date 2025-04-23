import { ArrowBack, Login, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/profile.css";
import "../styles/form.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { useLocation, useNavigate } from "react-router";
import { logIn } from "../actions/userActions";

function LogIn({ onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    // const navigate = useNavigate();
    // const location = useLocation();
    // const redirect = location.search ? location.search.split("=")[1] : "/profile";

    useEffect(() => {
        if (userInfo) {
            // navigate("/");
        }
    }, [userInfo]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logIn(email, password));
    };

    return (
        <div className="login-container">
            <div className="form-heading">
                <h1 className="login-title">Log In</h1>
                <Login style={{ fontSize: "2.4rem" }} className="form-icon" />
            </div>
            {error && <Message message={error} messageType={messageType} />}
            <form action="post" className="form-container" onSubmit={handleSubmit}>
                <div className="form-inputs">
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
                </div>

                {loading && <Loader />}
                <button className="form-btn log-btn log-in-btn" type="submit">
                    Log In
                </button>
            </form>
            <ArrowBack
                style={{ fontSize: "2.4rem", cursor: "pointer", marginTop: "1.2rem" }}
                onClick={onBack}
            />
        </div>
    );
}

export default LogIn;
