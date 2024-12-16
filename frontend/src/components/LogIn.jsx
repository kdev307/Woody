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
        <div className="login-container mt-32">
            <h1 className="login-title flex items-center justify-center gap-16 -mt-8 text-7xl text-center text-[#014210] font-bold">
                Log In
                <Login
                    style={{ fontSize: "4.8rem", color: "#014210" }}
                    className="form-icon"
                />
            </h1>
            {error && <Message message={error} messageType={messageType} />}
            <form
                action="post"
                className="form-container flex flex-col gap-12 items-center justify-center text-left rounded-2xl"
                onSubmit={handleSubmit}
            >
                <div className="form-inputs scrollbar w-full max-h-72 my-6 mx-auto p-6">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-input w-full p-6 text-[1.8rem] my-8 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6 "
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
                            className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6] "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your Password"
                            required
                        />
                        <button
                            type="button"
                            className="show-password-btn ease-linear duration-1000"
                            onClick={togglePasswordVisibility}
                            aria-label={
                                showPassword ? "Hide Password" : "Show Password"
                            }
                        >
                            {showPassword ? (
                                <Visibility
                                    style={{
                                        color: "#014210",
                                        fontSize: "3.2rem",
                                    }}
                                />
                            ) : (
                                <VisibilityOff
                                    style={{
                                        color: "#014210",
                                        fontSize: "3.2rem",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                </div>

                {loading && <Loader />}
                <button
                    className="form-btn log-btn log-in-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                    type="submit"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LogIn;
