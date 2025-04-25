import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const BodegaView = lazy(() => import("../views/dashboard/bodega"));

import { useAuthStore } from "../store/auth.store";

export const BodegaRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "bodega",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <BodegaView />
                    </ProtectedRoutes>
                </Suspense>
        }
    ]
}