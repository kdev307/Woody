import axios from "axios";
import {
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,
    ADMIN_ORDER_DETAILS_REQUEST,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_FAIL,
    ADMIN_ORDER_DISPATCH_REQUEST,
    ADMIN_ORDER_DISPATCH_SUCCESS,
    ADMIN_ORDER_DISPATCH_FAIL,
} from "../constants/adminConstants";
import { ACCESS_TOKEN } from "../constants/constants";

export const getPendingOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDERS_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.get(`/api/admin/orders/all/`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        dispatch({
            type: ADMIN_ORDERS_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getPendingOrderDetails = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_DETAILS_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.get(
            `/api/admin/order/${orderId}/order-details/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        dispatch({
            type: ADMIN_ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const dispatchOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_DISPATCH_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        await axios.post(
            `/api/admin/orders/${orderId}/dispatch/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        dispatch({ type: ADMIN_ORDER_DISPATCH_SUCCESS, payload: orderId });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_DISPATCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
