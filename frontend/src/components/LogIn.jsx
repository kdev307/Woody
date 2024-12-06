import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
// import { useLocation, useNavigate } from "react-router";
import { logIn } from "../actions/userActions";

function LogIn({ onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [message, setMessage] = useState("");
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
        <div className="login-container mt-20">
            <div className="form-heading flex items-center justify-evenly -mt-8">
                <h1 className="login-title text-4xl text-center text-[#014210] font-bold">
                    Log In
                </h1>
                <Login
                    style={{ fontSize: "2.4rem", color: "#014210" }}
                    className="form-icon"
                />
            </div>
            {error && <Message message={error} messageType={messageType} />}
            <form
                action="post"
                className="form-container flex flex-col items-center justify-center text-left rounded-xl"
                onSubmit={handleSubmit}
            >
                <div className="form-inputs scrollbar w-full max-h-72 my-6 mx-auto p-6">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-input w-full p-4 my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6 "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email Address"
                        required
                    />
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="form-input w-full p-4 my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6 "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your Password"
                            required
                        />
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={togglePasswordVisibility}
                            aria-label={
                                showPassword ? "Hide Password" : "Show Password"
                            }
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
                <button
                    className="form-btn log-btn log-in-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-2xl font-semibold hover:bg-[#014210] hover:text-white transition-all"
                    type="submit"
                >
                    Log In
                </button>
            </form>
            {/* <ArrowBack
                style={{
                    fontSize: "2.4rem",
                    cursor: "pointer",
                    marginTop: "-52rem",
                    marginLeft: "1rem",
                }}
                onClick={onBack}
            /> */}
        </div>
    );
}

export default LogIn;
