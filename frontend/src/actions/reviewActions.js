import axios from "axios";
import { ACCESS_TOKEN } from "../constants/constants";
import {
    REVIEW_ADD_FAIL,
    REVIEW_ADD_REQUEST,
    REVIEW_ADD_SUCCESS,
} from "../constants/reviewConstants";

export const addReview = (productId, reviewFormData) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_ADD_REQUEST });
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (!access_token) {
            console.error("Access token is missing");
            return;
        }
        const response = await axios.post(
            `http://localhost:8000/api/users/product/${productId}/review/add/`,
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
    } catch (error) {
        dispatch({
            type: REVIEW_ADD_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
