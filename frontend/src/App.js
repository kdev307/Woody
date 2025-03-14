// import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Confirmed from "./pages/Confirmed";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDispatch from "./pages/OrderDispatch";
import UserReviews from "./pages/UserReviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { USER_LOGIN_SUCCESS } from "./constants/userConstants";
// import Profile from "./components/Profile";
// import Categories from "./components/Categories";

function App() {
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);
    const { userInfo } = useSelector((state) => state.userLogin);
    // const { order } = useSelector((state) => state.orderCreate);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     const storedUserInfo = localStorage.getItem("userInfo");
    //     if (storedUserInfo) {
    //         // If there's a logged-in user in localStorage, dispatch the action to store that in Redux
    //         dispatch({
    //             type: USER_LOGIN_SUCCESS,
    //             payload: JSON.parse(storedUserInfo),
    //         });
    //     }
    // }, [dispatch]);

    useEffect(() => {
        const userInfoFromStorage = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null;

        if (userInfoFromStorage) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: userInfoFromStorage,
            });
        }
    }, [dispatch]);

    console.log("User Info: ", userInfo);
    const isAdmin = userInfo ? userInfo.isAdmin : false;

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/product/:id" element={<Product />} />

                    {/* Protected Routes */}
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute
                                redirectTo="/store"
                                condition={() => cartItemsList.length > 0}
                            >
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/confirmed"
                        element={
                            <ProtectedRoute
                                redirectTo="/store"
                                // condition={() => order}
                            >
                                <Confirmed />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order-history"
                        element={
                            <ProtectedRoute redirectTo="/store">
                                <OrderHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reviews"
                        element={
                            <ProtectedRoute redirectTo="/store">
                                <UserReviews />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/order-dispatch"
                        element={
                            <ProtectedRoute
                                requiredRole={isAdmin ? "admin" : ""}
                                redirectTo="/"
                            >
                                <OrderDispatch />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
