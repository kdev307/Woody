import {
    Add,
    Close,
    Delete,
    // Edit
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
    addAddress,
    deleteAddress,
    // editAddress,
    fetchAddresses,
    updateProfile,
} from "../../redux/actions/userActions";
import Loader from "./Loader";

export const EditModal = ({ closeModal }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [mobileNumber, setMobileNumber] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibleField, setVisibleField] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // State for checkboxes (whether the user wants to update mobile number and/or password)
    const [updateMobile, setUpdateMobile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const { profileData, loading, error } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        if (profileData && profileData.details) {
            setMessage(profileData.details);
            setMessageType("success");
        }

        if (error) {
            setMessage(error);
            setMessageType("fail");
        }
    }, [profileData, error]);

    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {};

        // If updateMobile is checked, include the mobile number in the submitted data
        if (updateMobile) {
            if (/^[0-9\- ]+$/.test(mobileNumber))
                updatedData.mobileNumber = mobileNumber;
            else {
                setMessage("Invalid Input, not a Mobile Number.");
                setMessageType("fail");
                return;
            }
        }

        // If updatePassword is checked, include the password details
        if (updatePassword) {
            if (!oldPassword || !newPassword || !confirmPassword) {
                setMessage("All password fields are required.");
                setMessageType("fail");
                return;
            }
            if (newPassword !== confirmPassword) {
                setMessage("New password and confirm password do not match.");
                setMessageType("fail");
                return;
            }
            updatedData.oldPassword = oldPassword;
            updatedData.newPassword = newPassword;
            updatedData.confirmPassword = confirmPassword;
        }

        // Here, you can call your API or handle the submission with updatedData
        console.log("Form submitted with data:", updatedData);
        dispatch(updateProfile(updatedData));
        // .then(() => {
        //     setMessage(profileData.details);
        //     setMessageType("success");
        setMobileNumber("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        //     console.log("Update Profile Success: ", profileData.details);
        // })
        // .catch(() => {
        //     setMessage(error);
        //     setMessageType("fail");
        //     console.log("Update Profile Error: ", error);
        // });
        // Close the modal after submission
    };

    return (
        <div
            className="absolute w-[120vw] h-[130vh] top-[50%] -translate-x-[70%] -translate-y-[50%] inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={closeModal}
        >
            <div
                className="relative w-[70%] bg-[#e4efe4] rounded-lg p-8 overflow-auto border-2 border-[#014210]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="update-profile-form-container p-6">
                    <div className="pt-12 flex items-center justify-end">
                        <Close
                            className="cart-close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                            style={{ fontSize: "3.6rem" }}
                            onClick={closeModal}
                        />
                    </div>

                    <h1 className="edit-form-title flex items-center justify-center gap-4 text-7xl text-center text-[#014210] font-bold">
                        Update Profile
                    </h1>
                    {message && (
                        <Message message={message} messageType={messageType} />
                    )}
                    {loading && <Loader />}
                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        {/* Mobile Number Section */}
                        <div className="flex items-center justify-evenly gap-8 w-full">
                            <div className="flex flex-col w-full items-center justify-center gap-8">
                                <div className="flex justify-center items-center gap-4 w-full">
                                    <input
                                        type="checkbox"
                                        id="updateMobile"
                                        checked={updateMobile}
                                        onChange={() =>
                                            setUpdateMobile(!updateMobile)
                                        }
                                        className="text-[#014210] w-10 h-10 border border-[#014210] rounded-full checked:bg-[#027a1c] checked:border-[#027a1c] focus:ring-2 focus:ring-[#027a1c] appearance-none"
                                    />
                                    <label
                                        htmlFor="updateMobile"
                                        className="text-3xl w-full font-semibold text-[#014210]"
                                    >
                                        Update Mobile Number
                                    </label>
                                </div>

                                {updateMobile && (
                                    <div className="space-y-4 w-full">
                                        <input
                                            type="tel"
                                            value={mobileNumber}
                                            onChange={(e) =>
                                                setMobileNumber(e.target.value)
                                            }
                                            placeholder="Enter new mobile number"
                                            className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Password Section */}
                            <div className="flex flex-col items-center justify-center gap-8 w-full">
                                <div className="flex items-center space-x-4 w-full">
                                    <input
                                        type="checkbox"
                                        id="updatePassword"
                                        checked={updatePassword}
                                        onChange={() =>
                                            setUpdatePassword(!updatePassword)
                                        }
                                        className="text-[#014210] w-10 h-10 border border-[#014210] rounded-full checked:bg-[#027a1c] checked:border-[#027a1c] focus:ring-2 focus:ring-[#027a1c] appearance-none"
                                    />
                                    <label
                                        htmlFor="updatePassword"
                                        className="text-3xl font-semibold w-full text-[#014210]"
                                    >
                                        Update Password
                                    </label>
                                </div>

                                {updatePassword && (
                                    <div className="space-y-4 w-full">
                                        {/* Old Password Field */}
                                        <div className="flex flex-col items-start justify-center">
                                            <label
                                                htmlFor="oldPassword"
                                                className="text-[1.8rem] font-semibold text-[#014210]"
                                            >
                                                Old Password
                                            </label>
                                            <div className="flex items-center justify-center gap-2 w-full">
                                                <input
                                                    type={
                                                        visibleField ===
                                                        "oldPassword"
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name="oldPassword"
                                                    id="oldPassword"
                                                    value={oldPassword}
                                                    onChange={(e) =>
                                                        setOldPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter old password"
                                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                                />
                                                <button
                                                    type="button"
                                                    className="show-password-btn ease-linear duration-1000"
                                                    onClick={() =>
                                                        setVisibleField(
                                                            (prevField) =>
                                                                prevField ===
                                                                "oldPassword"
                                                                    ? ""
                                                                    : "oldPassword"
                                                        )
                                                    }
                                                    aria-label={
                                                        visibleField ===
                                                        "oldPassword"
                                                            ? "Hide Password"
                                                            : "Show Password"
                                                    }
                                                >
                                                    {visibleField ===
                                                    "oldPassword" ? (
                                                        <Visibility
                                                            style={{
                                                                color: "#014210",
                                                                fontSize:
                                                                    "3.2rem",
                                                            }}
                                                        />
                                                    ) : (
                                                        <VisibilityOff
                                                            style={{
                                                                color: "#014210",
                                                                fontSize:
                                                                    "3.2rem",
                                                            }}
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* New Password Field */}
                                        <div className="flex flex-col items-start justify-center">
                                            <label
                                                htmlFor="newPassword"
                                                className="text-[1.8rem] font-semibold text-[#014210]"
                                            >
                                                New Password
                                            </label>
                                            <div className="flex items-center justify-center gap-2 w-full">
                                                <input
                                                    type={
                                                        visibleField ===
                                                        "newPassword"
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name="newPassword"
                                                    id="newPassword"
                                                    value={newPassword}
                                                    onChange={(e) =>
                                                        setNewPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter new password"
                                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                                />
                                                <button
                                                    type="button"
                                                    className="show-password-btn ease-linear duration-1000"
                                                    onClick={() =>
                                                        setVisibleField(
                                                            (prevField) =>
                                                                prevField ===
                                                                "newPassword"
                                                                    ? ""
                                                                    : "newPassword"
                                                        )
                                                    }
                                                    aria-label={
                                                        visibleField ===
                                                        "newPassword"
                                                            ? "Hide Password"
                                                            : "Show Password"
                                                    }
                                                >
                                                    {visibleField ===
                                                    "newPassword" ? (
                                                        <Visibility
                                                            style={{
                                                                color: "#014210",
                                                                fontSize:
                                                                    "3.2rem",
                                                            }}
                                                        />
                                                    ) : (
                                                        <VisibilityOff
                                                            style={{
                                                                color: "#014210",
                                                                fontSize:
                                                                    "3.2rem",
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
                                                        visibleField ===
                                                        "confirmPassword"
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Confirm new password"
                                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                                />
                                                <button
                                                    type="button"
                                                    className="show-password-btn ease-linear duration-1000"
                                                    onClick={() =>
                                                        setVisibleField(
                                                            (prevField) =>
                                                                prevField ===
                                                                "confirmPassword"
                                                                    ? ""
                                                                    : "confirmPassword"
                                                        )
                                                    }
                                                    aria-label={
                                                        visibleField ===
                                                        "confirmPassword"
                                                            ? "Hide Password"
                                                            : "Show Password"
                                                    }
                                                >
                                                    {visibleField ===
                                                    "confirmPassword" ? (
                                                        <Visibility
                                                            style={{
                                                                color: "#014210",
                                                                fontSize:
                                                                    "3.2rem",
                                                            }}
                                                        />
                                                    ) : (
                                                        <VisibilityOff
                                                            style={{
                                                                color: "#014210",
                                                                fontSize:
                                                                    "3.2rem",
                                                            }}
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-8 w-full">
                            <button
                                type="submit"
                                className="w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full p-3 border-[3px] border-[#560000] rounded-md text-[#560000] text-[2.4rem] font-semibold hover:bg-[#560000] hover:text-white transition-all ease-linear duration-1000"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const AddressModal = ({ closeModal }) => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo);
    const userAddress = useSelector((state) => state.userAddress);
    const { userAddresses, loading, error } = userAddress;

    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchAddresses())
            .then(() => {
                console.log("Addresses fetched successfully");
                // setMessage(userAddresses.details);
                // setMessageType("success");
            })
            .catch((err) => {
                setMessage("Error fetching addresses");
                setMessageType("fail");
                console.error("Error fetching addresses:", err);
            });
    }, [dispatch]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const addressData = {
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            pincode,
        };
        // if (editingId) {
        //     dispatch(
        //         editAddress({
        //             id: editingId,
        //             ...addressData,
        //         })
        //     );
        // } else dispatch(addAddress(addressData));
        dispatch(addAddress(addressData))
            .then(() => {
                // Clear the form fields
                setAddressLine1("");
                setAddressLine2("");
                setCity("");
                setState("");
                setCountry("");
                setPincode("");

                // setEditingId(null);
                setIsFormVisible(false);
                // setMessage(userAddresses.details);
                // setMessageType("success");

                dispatch(fetchAddresses());
            })
            .catch((err) => {
                setMessage(userAddresses.details);
                // setMessageType("fail");
                // console.error("Error adding address:", err);
            });

        // Close the modal after submission
        // closeModal();
    };

    // const handleEdit = (id) => {
    //     setEditingId(id);
    //     const address = userAddresses.find((addr) => addr.id === id);
    //     if (address) {
    //         setAddressLine1(address.address_line_1);
    //         setAddressLine2(address.address_line_2);
    //         setCity(address.city);
    //         setState(address.state);
    //         setCountry(address.country);
    //         setPincode(address.pincode);
    //     }
    //     setIsFormVisible(true);
    // };

    const handleDelete = (id) => {
        // setAddresses();
        setMessage("");
        setMessageType("");
        console.log("ID being passed:", id);
        dispatch(deleteAddress(id)).then((response) => {
            if (response?.payload?.details) {
            }
            dispatch(fetchAddresses());
            // setMessage(userAddresses.details);
            // setMessageType("success");
        });
        // if (error) {
        //     setMessage(userAddresses.details);
        //     setMessageType("fail");
        // } else {
        // }
    };

    return (
        <div
            className="absolute w-[120vw] h-[130vh] top-[35%] -translate-x-[70%] -translate-y-[40%] inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={closeModal}
        >
            <div
                className="relative w-[70%]  bg-[#e4efe4] rounded-lg p-8 border-2 border-[#014210]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="product-form-container p-6">
                    <div className="pt-12 flex items-center justify-end">
                        <Close
                            className="cart-close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                            style={{ fontSize: "3.6rem" }}
                            onClick={closeModal}
                        />
                    </div>
                    <h1 className="edit-form-title flex items-center justify-center gap-4 text-7xl text-center text-[#014210] font-bold">
                        Saved Addresses
                    </h1>
                    {loading && <Loader />}
                    {message && (
                        <Message message={message} messageType={messageType} />
                    )}

                    <div className="max-h-[50rem] overflow-auto px-8">
                        <h4 className="res-addr my-4 mx-0 text-4xl font-medium flex flex-col items-center justify-center gap-4">
                            {!userAddresses || userAddresses.length === 0 ? (
                                <p>No addresses found.</p>
                            ) : (
                                !loading &&
                                userAddresses.map((address, index) => (
                                    <li key={index} className="w-full">
                                        {console.log("Show Address", address)}
                                        <div className="addr-btns flex items-center justify-end mt-8">
                                            {/* <button
                                            onClick={() =>
                                                handleEdit(address.id)
                                            }
                                        >
                                            <Edit
                                                style={{
                                                    fontSize: "3.2rem",
                                                    color: "#560000",
                                                }}
                                            />
                                        </button> */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(address.id)
                                                }
                                            >
                                                <Delete
                                                    style={{
                                                        fontSize: "3.2rem",
                                                        color: "#560000",
                                                    }}
                                                />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center justify-start gap-4">
                                                <p className="text-[#560000]">
                                                    Address Line 1:
                                                </p>
                                                <p className="text-[#014210] font-semibold">
                                                    {address.address_line_1}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-start gap-4">
                                                <p className="text-[#560000]">
                                                    Address Line 2:
                                                </p>
                                                <p className="text-[#014210] font-semibold">
                                                    {address.address_line_2}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-start gap-4">
                                                <p className="text-[#560000]">
                                                    City:
                                                </p>
                                                <p className="text-[#014210] font-semibold">
                                                    {address.city}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-start gap-4">
                                                <p className="text-[#560000]">
                                                    State:
                                                </p>
                                                <p className="text-[#014210] font-semibold">
                                                    {address.state}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-start gap-4">
                                                <p className="text-[#560000]">
                                                    Country:
                                                </p>
                                                <p className="text-[#014210] font-semibold">
                                                    {address.country}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-start gap-4">
                                                <p className="text-[#560000]">
                                                    Pincode:
                                                </p>
                                                <p className="text-[#014210] font-semibold">
                                                    {address.pincode}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="endLine  self-center text-xl my-12 mx-0">
                                            <hr
                                                style={{
                                                    width: "100%",
                                                    margin: "auto",
                                                    border: "0.18rem solid #014210",
                                                    borderRadius: "100rem",
                                                }}
                                            />
                                        </p>
                                    </li>
                                ))
                            )}
                        </h4>
                        <div className="addr-btns flex items-center justify-end mt-8">
                            <button
                                className="text-4xl font-medium flex text-[#560000] items-center justify-center gap-4"
                                onClick={() => setIsFormVisible(!isFormVisible)}
                            >
                                {!isFormVisible ? (
                                    <>
                                        <Add
                                            style={{
                                                fontSize: "3.2rem",
                                                color: "#560000",
                                            }}
                                        />{" "}
                                        Add New Address
                                    </>
                                ) : (
                                    <>
                                        <Close
                                            style={{
                                                fontSize: "3.2rem",
                                                color: "#560000",
                                            }}
                                        />{" "}
                                        Cancel
                                    </>
                                )}
                            </button>
                        </div>
                        {/* Address Fields */}
                        {isFormVisible && (
                            <form action="post" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 items-center justify-center gap-2">
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
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setState(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setPincode(e.target.value)
                                            }
                                            placeholder="Pincode"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                                >
                                    {/* {editingId
                                        ? "Update Existing Address"
                                        : "Add New Address"} */}
                                    Add New Address
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
