import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import {
    AppRegistration,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { signUp } from "../../redux/actions/userActions";
import { toast } from "react-toastify";

function SignUp({ onSignUpSuccess }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [visibleField, setVisibleField] = useState("");

    const dispatch = useDispatch();

    const userSignUp = useSelector((state) => state.userSignUp);
    const { error, loading, userInfo } = userSignUp;

    useEffect(() => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMobileNumber("");
        setDateOfBirth("");
        setAddressLine1("");
        setAddressLine2("");
        setCity("");
        setState("");
        setCountry("");
        setPincode("");
        setProfilePicture(null);
    }, [userInfo, error, onSignUpSuccess]);

    const toggleVisibility = (field) => {
        setVisibleField((prevField) => (prevField === field ? "" : field));
    };

    const validEmail = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    const validPassword = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match !");
        } else if (!validEmail.test(email)) {
            toast.info("Invalid Email Address !");
        } else if (!validPassword.test(password)) {
            toast.info(
                "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
        } else {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("mobileNumber", mobileNumber);
            formData.append("dateOfBirth", dateOfBirth);
            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }
            formData.append("addressLine1", addressLine1);
            formData.append("addressLine2", addressLine2);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("country", country);
            formData.append("pincode", pincode);
            dispatch(signUp(formData));
            console.log("Sign Up Data: ", [...formData]);
        }
    };

    return (
        <>
            <div className="sign-up-container mt-32">
                <h1 className="signup-title flex items-center justify-center gap-16 -mt-8 text-7xl text-center text-[#014210] font-bold">
                    Sign Up
                    <AppRegistration
                        style={{ fontSize: "4.8rem", color: "#014210" }}
                        className="form-icon"
                    />
                </h1>
                <form
                    action="post"
                    className="form-container flex flex-col gap-12 items-center justify-center text-left rounded-2xl mt-4"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="form-inputs scrollbar w-full max-h-[45rem] overflow-y-auto my-6 mx-auto p-6">
                        {/* Basic Information */}
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex flex-col items-start justify-center">
                                <label
                                    htmlFor="firstName"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    placeholder="Enter your First Name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <label
                                    htmlFor="lastName"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    placeholder="Enter your Last Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="email"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email Address"
                                required
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="mobileNumber"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                id="mobileNumber"
                                className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                value={mobileNumber}
                                onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                }
                                placeholder="Enter your Mobile Number"
                                required
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="dateOfBirth"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="password"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Password
                            </label>
                            <div className="flex items-center justify-center gap-2 w-full">
                                <input
                                    type={
                                        visibleField === "password"
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    id="password"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="show-password-btn ease-linear duration-1000"
                                    onClick={() => toggleVisibility("password")}
                                    aria-label={
                                        visibleField === "password"
                                            ? "Hide Password"
                                            : "Show Password"
                                    }
                                >
                                    {visibleField === "password" ? (
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
                        {/* Confirm Password Field */}
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="confirmPassword"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Confirm Password
                            </label>
                            <div className="flex items-center justify-center gap-2 w-full">
                                <input
                                    type={
                                        visibleField === "confirmPassword"
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Re-enter your Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="show-password-btn ease-linear duration-1000"
                                    onClick={() =>
                                        toggleVisibility("confirmPassword")
                                    }
                                    aria-label={
                                        visibleField === "confirmPassword"
                                            ? "Hide Password"
                                            : "Show Password"
                                    }
                                >
                                    {visibleField === "confirmPassword" ? (
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

                        {/* Address Fields */}
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="addressLine1"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                name="addressLine1"
                                id="addressLine1"
                                className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                value={addressLine1}
                                onChange={(e) =>
                                    setAddressLine1(e.target.value)
                                }
                                placeholder="Address Line 1"
                                required
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label
                                htmlFor="addressLine2"
                                className="text-[1.8rem] font-semibold text-[#014210]"
                            >
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                name="addressLine2"
                                id="addressLine2"
                                className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                value={addressLine2}
                                onChange={(e) =>
                                    setAddressLine2(e.target.value)
                                }
                                placeholder="Address Line 2 (optional)"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center justify-center gap-2">
                            <div className="flex flex-col items-start justify-center">
                                <label
                                    htmlFor="city"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <label
                                    htmlFor="state"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="State"
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <label
                                    htmlFor="country"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Country"
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <label
                                    htmlFor="pincode"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    id="pincode"
                                    className="form-input w-full p-6 text-[1.8rem] my-4 mx-0 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    placeholder="Pincode"
                                    required
                                />
                            </div>
                        </div>
                        {/* Profile Picture */}
                        <label
                            htmlFor="profilePicture"
                            className="w-full p-6 -mb-2 mt-2 text-[1.8rem] text-[#014210] bg-[#f8f6f6] border border-[#ccc] rounded-md cursor-pointer block text-center"
                        >
                            {profilePicture && (
                                <img
                                    src={URL.createObjectURL(profilePicture)}
                                    alt="Product Preview"
                                    className="w-full"
                                />
                            )}
                            ChooseProfile Picture
                            <input
                                type="file"
                                accept="images/*"
                                name="profilePicture"
                                id="profilePicture"
                                className="form-input opacity-0 w-0 h-0"
                                onChange={(e) =>
                                    setProfilePicture(e.target.files[0])
                                }
                                required
                            />
                        </label>
                    </div>
                    {loading && <Loader />}
                    <button
                        className="form-btn log-btn sign-up-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignUp;
