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

const reducer = combineReducers({
    productsList: productsListReducers,
    productDetails: productDetailsReducers,
    product: productReducers,
    userLogin: userLogInReducers,
    userSignUp: userSignUpReducers,
    cart: cart,
    profile: userProfileReducers,
    userAddress: userAddressReducers,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
