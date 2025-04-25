import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const ProductosView = lazy(() => import("../views/dashboard/productos"));

import { useAuthStore } from "../store/auth.store";

export const ProductosRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "productos",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <ProductosView />
                    </ProtectedRoutes>
                </Suspense>
        },
    ];
}