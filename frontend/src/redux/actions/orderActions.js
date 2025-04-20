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
    ORDER_CREATE_RESET,
} from "../constants/orderConstants";

import { ACCESS_TOKEN } from "../constants/constants";
import { toast } from "react-toastify";

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
        toast.success("Order placed successfully!");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message,
        });
        toast.error("Failed to place order");
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
        toast.success("Order status updated!");
    } catch (error) {
        dispatch({
            type: ORDER_STATUS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        toast.error("Failed to update order status");
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
        toast.info("Order cancelled successfully");
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAIL,
            payload:
                error.response && error.response.data.details
                    ? error.response.data.details
                    : error.message,
        });
        toast.error("Failed to cancel order");
    }
};

export const resetOrder = () => (dispatch) => {
    dispatch({ type: ORDER_CREATE_RESET });
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
        toast.success("Order history loaded", { autoClose: 1500 });
    } catch (error) {
        dispatch({
            type: ORDER_HISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        toast.error("Failed to load order history");
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
        toast.success("Order details fetched");
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        toast.error("Failed to fetch order details");
    }
};
