import axios from "axios";
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";
import { ACCESS_TOKEN } from "../constants/constants";
import { toast } from "react-toastify";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/product/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProduct = (formProductData) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const response = await axios.post(
            "/api/products/add/",
            formProductData,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: response.data,
        });
        toast.success("Product created successfully!");
        dispatch(listProducts());
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        console.error("Error creating product:", error);
        toast.error(`Product creation failed: ${error}`);
    }
};

export const updateProduct =
    (productId, formProductData) => async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_UPDATE_REQUEST });
            const access_token = localStorage.getItem(ACCESS_TOKEN);
            if (!access_token) {
                console.error("Access token is missing");
                return;
            }
            const response = await axios.put(
                `/api/product/edit/${productId}/`,
                // `http://localhost:8000/api/product/edit/${productId}`,
                formProductData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload: response.data,
            });
            toast.success("Product updated successfully!");
            dispatch(listProducts());
        } catch (error) {
            console.error("Error:", error);
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
            toast.error(`Product update failed: ${error}`);
        }
    };

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { status, response } = await axios.delete(
            `/api/product/delete/${productId}/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        if (status === 200 || status === 204) {
            console.log(response || "Product deleted successfully.");
            dispatch({ type: PRODUCT_DELETE_SUCCESS });
        } else {
            console.warn("Unexpected response status: ", status);
            dispatch({ type: PRODUCT_DELETE_SUCCESS }); // Handle gracefully
        }
        toast.success("Product deleted successfully!");
        dispatch(listProducts());
    } catch (error) {
        console.error(
            "Delete Product Error: ",
            error.response || error.message
        );
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        toast.error(`Product deletion failed: ${error}`);
    }
};
