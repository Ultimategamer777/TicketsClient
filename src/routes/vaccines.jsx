import { lazy, Suspense } from "react";

const VaccinesView = lazy(() => import("../views/dashboard/vaccines"));

import ProtectedRoutes from "../components/ProtectedRoutes";

import { useAuthStore } from "../store/auth.store";

export const VaccinesRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "vaccines",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <VaccinesView />
                    </ProtectedRoutes>
                </Suspense>
        },
    ];
}