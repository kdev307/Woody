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

export const reviewReducers = (state = {}, action) => {
    switch (action.type) {
        // fetch user review
        case USER_REVIEWS_LIST_REQUEST:
            return { ...state, loading: true };
        case USER_REVIEWS_LIST_SUCCESS:
            return { ...state, loading: false, reviews: action.payload };
        case USER_REVIEWS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        // user add review
        case REVIEW_ADD_REQUEST:
            return { ...state, loading: true };
        case REVIEW_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: state.reviews.map(
                    (review) =>
                        review.id === action.payload.id
                            ? action.payload
                            : review // Update the specific review
                ),
            };
        case REVIEW_ADD_FAIL:
            return { ...state, loading: false, error: action.payload };
        // edit
        case REVIEW_UPDATE_REQUEST:
            return { ...state, loading: true };
        case REVIEW_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: state.reviews.map(
                    (review) =>
                        review.id === action.payload.id
                            ? action.payload
                            : review // Update the specific review
                ),
            };
        case REVIEW_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        // delete
        case REVIEW_DELETE_REQUEST:
            return { loading: true };
        case REVIEW_DELETE_SUCCESS:
            return {
                loading: false,
                reviews: state.reviews.filter(
                    (review) => review.id !== action.payload
                ), // Remove deleted review
            };
        case REVIEW_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
