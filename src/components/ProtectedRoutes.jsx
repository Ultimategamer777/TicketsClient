import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({
    isAllowed,
    children,
    allowedRoles,
    userRole,
}) {
    console.log("isAllowed", isAllowed);
    console.log("allowedRoles", allowedRoles);
    console.log("userRole", userRole);
    if (!isAllowed) return <Navigate to="/" />;
    if (
        (allowedRoles?.length ?? 0) > 0 &&
        !allowedRoles?.includes(userRole || "user")
    ) {
        return <Navigate to="/unauthorized" />;
    }
    return children ? children : <Outlet />;
}
