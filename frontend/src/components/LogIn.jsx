import { ArrowBack, Login, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import "../styles/common.css";
import "../styles/profile.css";
import "../styles/form.css";
import Loader from "./Loader";
import Error from "./Error";

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-container">
            <div className="form-heading">
                <h1 className="login-title">Log In</h1>
                <Login style={{ fontSize: "2.4rem" }} className="form-icon" />
            </div>
            {error && <Error message={error} />}
            <form action="post" className="form-container" onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your Username"
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
            <ArrowBack style={{ fontSize: "2.4rem", cursor: "pointer", marginTop: "1.2rem" }} />
        </div>
    );
}

export default LogIn;
