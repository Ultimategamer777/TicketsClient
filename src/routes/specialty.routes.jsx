import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const SpecialtyView = lazy(() => import("../views/dashboard/specialty"));

import { useAuthStore } from "../store/auth.store";

export const SpecialtyRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "specialty",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <SpecialtyView />
                    </ProtectedRoutes>
                </Suspense>
        }
    ]
}