import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_STATUS_UPDATE_SUCCESS,
    ORDER_STATUS_UPDATE_FAIL,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
    ORDER_STATUS_UPDATE_REQUEST,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAIL,
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
            // " http://localhost:8000/api/users/checkout/",
            " /api/users/orders/checkout/",
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

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_STATUS_UPDATE_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.put(
            `/api/users/orders/${orderId}/status/`,
            { status },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        dispatch({
            type: ORDER_STATUS_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_STATUS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const cancelOrder = (cancelOrderData) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const response = await axios.post(
            `/api/users/orders/cancel/`,
            cancelOrderData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        dispatch({
            type: CANCEL_ORDER_SUCCESS,
            payload: response.data.order,
        });
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAIL,
            payload:
                error.response && error.response.data.details
                    ? error.response.data.details
                    : error.message,
        });
    }
};

export const getOrderHistory = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_HISTORY_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.get(`/api/users/orders/order-history/`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        dispatch({
            type: ORDER_HISTORY_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: ORDER_HISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
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
        const { data } = await axios.get(
            `/api/users/orders/${orderId}/order-details/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
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
