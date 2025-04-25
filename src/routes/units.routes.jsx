import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const UnitsView = lazy(() => import("../views/dashboard/units"));

import { useAuthStore } from "../store/auth.store";

export const UnitsRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "units",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <UnitsView />
                    </ProtectedRoutes>
                </Suspense>
        },
    ];
}