import {
    USER_ADDRESS_ADD_FAIL,
    USER_ADDRESS_ADD_REQUEST,
    USER_ADDRESS_ADD_SUCCESS,
    USER_ADDRESS_DELETE_FAIL,
    USER_ADDRESS_DELETE_REQUEST,
    USER_ADDRESS_DELETE_SUCCESS,
    USER_ADDRESS_EDIT_FAIL,
    USER_ADDRESS_EDIT_REQUEST,
    USER_ADDRESS_EDIT_SUCCESS,
    USER_ADDRESS_FETCH_FAIL,
    USER_ADDRESS_FETCH_REQUEST,
    USER_ADDRESS_FETCH_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

export const userSignUpReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userLogInReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userProfileReducers = (
    state = { profileData: [], loading: false, error: null },
    action
) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return { ...state, loading: true };
        case USER_PROFILE_UPDATE_SUCCESS:
            return { ...state, loading: false, profileData: action.payload };
        case USER_PROFILE_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userAddressReducers = (
    state = {
        userAddresses: [],
        loading: false,
        error: null,
    },
    action
) => {
    switch (action.type) {
        case USER_ADDRESS_FETCH_REQUEST:
            return { ...state, loading: true };
        case USER_ADDRESS_FETCH_SUCCESS:
            return { ...state, loading: false, userAddresses: action.payload };
        case USER_ADDRESS_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };

        case USER_ADDRESS_ADD_REQUEST:
            return { ...state, loading: true };
        case USER_ADDRESS_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: [...state.addresses, action.payload],
            };
        case USER_ADDRESS_ADD_FAIL:
            return { ...state, loading: false, error: action.payload };

        case USER_ADDRESS_EDIT_REQUEST:
            return { ...state, loading: true };
        case USER_ADDRESS_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                userAddresses: state.addresses.map((address) =>
                    address.id === action.payload.id ? action.payload : address
                ),
            };
        case USER_ADDRESS_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload };

        case USER_ADDRESS_DELETE_REQUEST:
            return { ...state, loading: true };
        case USER_ADDRESS_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                userAddresses: state.addresses.filter(
                    (address) => address.id !== action.payload.id
                ),
            };
        case USER_ADDRESS_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
