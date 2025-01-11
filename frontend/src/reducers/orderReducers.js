import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_STATUS_UPDATE_SUCCESS,
    ORDER_STATUS_UPDATE_FAIL,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
    CANCEL_ORDER_REQUEST,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_STATUS_UPDATE_SUCCESS:
            return { success: true, message: action.payload.details };
        case ORDER_STATUS_UPDATE_FAIL:
            return { success: false, error: action.payload };
        default:
            return state;
    }
};

export const orderCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_ORDER_REQUEST:
            return { loading: true };
        case CANCEL_ORDER_SUCCESS:
            return { loading: false, cancelledOrder: action.payload };

        case CANCEL_ORDER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
