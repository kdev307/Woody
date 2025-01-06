import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

import { ACCESS_TOKEN } from "../constants/constants";

export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.post(
            " http://localhost:8000/api/users/checkout/",
            orderData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message,
        });
    }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.get(`/api/users/orders/${orderId}/`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
