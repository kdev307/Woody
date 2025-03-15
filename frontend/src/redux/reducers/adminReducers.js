import {
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,
    ADMIN_ORDER_DISPATCH_REQUEST,
    ADMIN_ORDER_DISPATCH_SUCCESS,
    ADMIN_ORDER_DISPATCH_FAIL,
    ADMIN_ORDER_DETAILS_REQUEST,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_FAIL,
} from "../constants/adminConstants";

export const adminOrderHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_REQUEST:
        case ADMIN_ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ADMIN_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case ADMIN_ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, orderDetails: action.payload };
        case ADMIN_ORDERS_FAIL:
        case ADMIN_ORDER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const adminOrderDispatchReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_DISPATCH_REQUEST:
            return { ...state, loading: true };
        case ADMIN_ORDER_DISPATCH_SUCCESS:
            return { ...state, loading: false, success: true };
        case ADMIN_ORDER_DISPATCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
