import { toast } from "react-toastify";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QUANTITY,
    CLEAR_CART,
} from "../constants/cartConstants";

export const addToCart = (product) => (dispatch, getState) => {
    const { cartItemsList } = getState().cart;
    const existingItem = cartItemsList.find(
        (item) => item.productId === product.id
    );

    if (!existingItem) {
        console.log("Adding new item to cart:", product);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                // productId: product.id,
                // name: product.name,
                // price: product.price,
                // image: product.image,
                // qty: 1,
                productId: product.id,
                productName: product.productName,
                productBrand: product.productBrand,
                productPrice: product.productPrice,
                productImages: product.productImages,
                productStockCount: product.productStockCount,
                qty: 1,
            },
        });
        toast.success(`${product.productName} added to cart`);
    } else {
        console.log("Item already exists in cart, not adding:", product);
        toast.warning(`${product.productName} is already in your cart`);
    }
};

export const updateCartQuantity = (productId, qty) => (dispatch) => {
    dispatch({
        type: CART_UPDATE_QUANTITY,
        payload: { productId, qty },
    });
    toast.info("Cart quantity updated");
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    const item = getState().cart.cartItemsList.find(
        (i) => i.productId === productId
    );

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId,
    });

    if (item) toast.error(`${item.productName} removed from cart`);
};

export const clearCart = () => (dispatch) => {
    dispatch({ type: CLEAR_CART });
    toast.info("Cart cleared");
};
