import axios from "axios";
import { ACCESS_TOKEN } from "../constants/constants";
import {
    REVIEW_ADD_FAIL,
    REVIEW_ADD_REQUEST,
    REVIEW_ADD_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_UPDATE_FAIL,
    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
    USER_REVIEWS_LIST_FAIL,
    USER_REVIEWS_LIST_REQUEST,
    USER_REVIEWS_LIST_SUCCESS,
} from "../constants/reviewConstants";
import { listProductDetail } from "./productActions";
import { toast } from "react-toastify";

export const fetchUserReviews = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_REVIEWS_LIST_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { data } = await axios.get(`/api/user/${userId}/reviews`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch({
            type: USER_REVIEWS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_REVIEWS_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const addReview = (productId, reviewFormData) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_ADD_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const response = await axios.post(
            `/api/users/product/${productId}/review/add/`,
            // `http://localhost:8000/api/users/product/${productId}/review/add/`,
            reviewFormData,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: REVIEW_ADD_SUCCESS,
            payload: response.data,
        });
        toast.success("Review added!");
        dispatch(listProductDetail(productId));
        // dispatch(fetchUserReviews());
    } catch (error) {
        dispatch({
            type: REVIEW_ADD_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        toast.error("Failed to add review");
    }
};

export const editReview =
    (productId, reviewId, reviewFormData) => async (dispatch) => {
        try {
            dispatch({ type: REVIEW_UPDATE_REQUEST });
            const access_token = localStorage.getItem(ACCESS_TOKEN);
            if (!access_token) {
                console.error("Access token is missing");
                return;
            }
            const response = await axios.put(
                `/api/users/product/${productId}/review/${reviewId}/edit/`,
                reviewFormData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            dispatch({
                type: REVIEW_UPDATE_SUCCESS,
                payload: response.data,
            });
            toast.success("Review updated!");
            dispatch(listProductDetail(productId));
            dispatch(fetchUserReviews());
        } catch (error) {
            dispatch({
                type: REVIEW_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
            toast.error("Failed to update review");
        }
    };

export const deleteReview = (reviewId) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_DELETE_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const { status, response } = await axios.delete(
            `/api/users/review/${reviewId}/delete/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        if (status === 200 || status === 204) {
            console.log(response || "Review deleted successfully.");
            dispatch({ type: REVIEW_DELETE_SUCCESS });
        } else {
            console.warn("Unexpected response status: ", status);
            dispatch({ type: REVIEW_DELETE_SUCCESS });
        }
        toast.success("Review deleted!");
        // dispatch(fetchUserReviews());
    } catch (error) {
        console.error("Delete Review Error: ", error.response || error.message);
        dispatch({
            type: REVIEW_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        toast.error("Failed to delete review");
    }
};
