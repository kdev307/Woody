import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducers, productsListReducers } from "./reducers/productReducers";
import { userLogInReducers, userSignUpReducers } from "./reducers/userReducers";
import { cart } from "./reducers/cartReducers";

const reducer = combineReducers({
    productsList: productsListReducers,
    productDetails: productDetailsReducers,
    userLogin: userLogInReducers,
    userSignUp: userSignUpReducers,
    cart: cart,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
