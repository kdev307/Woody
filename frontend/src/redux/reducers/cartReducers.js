import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QUANTITY,
    CLEAR_CART,
} from "../constants/cartConstants";

export const cart = (state = { cartItemsList: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // const item = action.payload;
            // const existingItem = state.cartItemsList.find((x) => x.productId === item.productId);
            // if (!existingItem) {
            console.log("Adding item to state:", action.payload);
            return {
                ...state,
                cartItemsList: [...state.cartItemsList, action.payload],
            };
        // }
        // return state;
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItemsList: state.cartItemsList.filter(
                    (item) => item.productId !== action.payload
                ),
            };
        case CART_UPDATE_QUANTITY:
            return {
                ...state,
                cartItemsList: state.cartItemsList.map((item) =>
                    item.productId === action.payload.productId
                        ? { ...item, qty: action.payload.qty }
                        : item
                ),
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItemsList: [],
            };
        default:
            return state;
    }
};
