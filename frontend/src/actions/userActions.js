import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
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
        if (data.isAdmin) {
            localStorage.setItem(ACCESS_TOKEN, data.token);
        }
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

export const logOut = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};
