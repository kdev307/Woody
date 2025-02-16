import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_ADDRESS_FETCH_REQUEST,
    USER_ADDRESS_FETCH_SUCCESS,
    USER_ADDRESS_FETCH_FAIL,
    USER_ADDRESS_ADD_REQUEST,
    USER_ADDRESS_ADD_SUCCESS,
    USER_ADDRESS_ADD_FAIL,
    // USER_ADDRESS_EDIT_REQUEST,
    // USER_ADDRESS_EDIT_SUCCESS,
    // USER_ADDRESS_EDIT_FAIL,
    USER_ADDRESS_DELETE_REQUEST,
    USER_ADDRESS_DELETE_SUCCESS,
    USER_ADDRESS_DELETE_FAIL,
} from "../constants/userConstants";
import { ACCESS_TOKEN } from "../constants/constants";

export const signUp = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST,
        });
        console.log("Sending request to register user:", formData);
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        const { data } = await axios.post(
            "/api/users/register/",
            formData,
            config
        );

        console.log("Backend Response: ", data);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data,
        });
        // localStorage.setItem("userInfo", JSON.stringify(data));
        // localStorage.setItem("activatationMessage", "Check your mail to verify your mail.");
    } catch (error) {
        const message =
            error.response && error.response.data && error.response.data.details
                ? error.response.data.details
                : error.message;
        // : "An unexpected error occurred. Please try again.";
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: message,
        });
    }
};

export const logIn = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/users/login/",
            {
                username: email,
                password: password,
            },
            config
        );
        // if (data.isAdmin) {
        localStorage.setItem(ACCESS_TOKEN, data.token);
        // }
        localStorage.setItem("userInfo", JSON.stringify(data));

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.details
                    ? error.response.data.details
                    : error.message,
        });
    }
};

export const updateProfile = (updatedData) => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const response = await axios.put(
            `/api/users/update-profile/`,
            updatedData,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.details
                    ? error.response.data.details
                    : error.message,
        });
    }
};

export const fetchAddresses = () => async (dispatch) => {
    dispatch({ type: USER_ADDRESS_FETCH_REQUEST });
    try {
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.get("/api/users/manage-addresses/", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log("Backend Response:", data);
        dispatch({
            type: USER_ADDRESS_FETCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_FETCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addAddress = (addressData) => async (dispatch) => {
    dispatch({ type: USER_ADDRESS_ADD_REQUEST });
    try {
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.post(
            "/api/users/manage-addresses/",
            addressData,
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );
        dispatch({
            type: USER_ADDRESS_ADD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// export const editAddress = (addressData) => async (dispatch) => {
//     dispatch({ type: USER_ADDRESS_EDIT_REQUEST });
//     try {
//         const access_token = localStorage.getItem(ACCESS_TOKEN);
//         if (!access_token) {
//             console.error("Access token is missing");
//             return;
//         }
//         const { data } = await axios.put(
//             "/api/users/manage-addresses",
//             addressData,
//             {
//                 headers: { Authorization: `Bearer ${access_token}` },
//             }
//         );
//         dispatch({
//             type: USER_ADDRESS_EDIT_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: USER_ADDRESS_EDIT_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };

export const deleteAddress = (addressId) => async (dispatch) => {
    dispatch({ type: USER_ADDRESS_DELETE_REQUEST });
    try {
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.delete("/api/users/manage-addresses/", {
            data: { id: addressId },
            headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch({
            type: USER_ADDRESS_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({ type: USER_LOGOUT });
};
