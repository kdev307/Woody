import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productDetailsReducers,
    productReducers,
    productsListReducers,
} from "./reducers/productReducers";
import {
    userAddressReducers,
    userLogInReducers,
    userProfileReducers,
    userSignUpReducers,
} from "./reducers/userReducers";
import { cart } from "./reducers/cartReducers";
import {
    orderCreateReducer,
    // orderDetailsReducer,
    orderHistoryReducer,
    orderStatusReducer,
} from "./reducers/orderReducers";
import {
    adminOrderDispatchReducer,
    adminOrderHistoryReducer,
} from "./reducers/adminReducers";
import { reviewReducers } from "./reducers/reviewReducers";

const reducer = combineReducers({
    productsList: productsListReducers,
    productDetails: productDetailsReducers,
    product: productReducers,
    userLogin: userLogInReducers,
    userSignUp: userSignUpReducers,
    cart: cart,
    profile: userProfileReducers,
    userAddress: userAddressReducers,
    userReviews: reviewReducers,
    orderCreate: orderCreateReducer,
    orderStatus: orderStatusReducer,
    orderHistory: orderHistoryReducer,
    adminAllOrders: adminOrderHistoryReducer,
    adminDispatchOrders: adminOrderDispatchReducer,
    // orderDetails: orderDetailsReducer,
});

const initialState = {};
const middleware = [thunk];

const devTools =
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? composeWithDevTools
        : (f) => f;

const store = createStore(
    reducer,
    initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
    devTools(applyMiddleware(...middleware))
);

export default store;
