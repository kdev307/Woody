import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({
    children,
    requiredRole,
    condition,
    redirectTo = "/",
}) {
    // const location = useLocation();
    const { userInfo } = useSelector((state) => state.userLogin); // Assuming `userInfo` contains the user data, including role.

    if (!userInfo) {
        return <Navigate to={redirectTo} />; // Redirect to the provided route if user is not logged in.
    }

    if (requiredRole && requiredRole === "admin" && !userInfo.isAdmin) {
        return <Navigate to={redirectTo} />; // Redirect if the user role doesn't match the required role.
    }

    // if (condition && !condition()) {
    //     return <Navigate to={redirectTo} state={{ from: location }} />; // Redirect if the condition (e.g., cart items) is not met.
    // }

    return children; // Allow access to the protected route if all checks pass.
}

export default ProtectedRoute;
