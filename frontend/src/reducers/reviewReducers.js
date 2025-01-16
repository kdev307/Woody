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
} from "../constants/reviewConstants";

export const reviewReducers = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_ADD_REQUEST:
        case REVIEW_DELETE_REQUEST:
        case REVIEW_UPDATE_REQUEST:
            return { ...state, loading: true };
        case REVIEW_ADD_SUCCESS:
        case REVIEW_DELETE_SUCCESS:
        case REVIEW_UPDATE_SUCCESS:
            return { ...state, loading: false, review: action.payload };
        case REVIEW_ADD_FAIL:
        case REVIEW_DELETE_FAIL:
        case REVIEW_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
