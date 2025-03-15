import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_SUCCESS } from "./constants/userConstants";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "./components/Loader";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Product = lazy(() => import("./pages/Product"));
const Confirmed = lazy(() => import("./pages/Confirmed"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const OrderDispatch = lazy(() => import("./pages/OrderDispatch"));
const UserReviews = lazy(() => import("./pages/UserReviews"));

function App() {
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);
    const { userInfo } = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();

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

    const isAdmin = userInfo ? userInfo.isAdmin : false;

    return (
        <div className="App">
            <Router>
                <Suspense fallback={<Loader />}>
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
                                <ProtectedRoute redirectTo="/store">
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
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
