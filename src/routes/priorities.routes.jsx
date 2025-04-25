import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const PrioridadesView = lazy(() => import("../views/dashboard/prioridades"));

import { useAuthStore } from "../store/auth.store";

export const PrioritiesRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "priorities",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <PrioridadesView />
                    </ProtectedRoutes>
                </Suspense>
        }
    ]
}