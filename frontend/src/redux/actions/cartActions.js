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
    } else {
        console.log("Item already exists in cart, not adding:", product);
    }
};

export const updateCartQuantity = (productId, qty) => ({
    type: CART_UPDATE_QUANTITY,
    payload: {
        productId,
        qty,
    },
});

export const removeFromCart = (productId) => ({
    type: CART_REMOVE_ITEM,
    payload: productId,
});

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};
