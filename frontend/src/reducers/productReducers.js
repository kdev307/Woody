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
} from "../constants/productConstants";

export const productsListReducers = (state = { products: [] }, action) => {
    console.log("Action received in reducer:", action);
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            console.log("Products loaded successfully:", action.payload);
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            console.error("Error loading products:", action.payload);
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailsReducers = (state = { product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productReducers = (
    state = { loading: false, product: null, error: null },
    action
) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
        case PRODUCT_UPDATE_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_CREATE_SUCCESS:
        case PRODUCT_UPDATE_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case PRODUCT_CREATE_FAIL:
        case PRODUCT_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
