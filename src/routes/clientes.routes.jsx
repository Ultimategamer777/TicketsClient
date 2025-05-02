import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const ClientesView = lazy(() => import("../views/dashboard/clientes"));

const FormClientes = lazy(() => import("../views/dashboard/clientes/components/FormClientes"));

const FormEditClientes = lazy(() => import("../views/dashboard/clientes/ClientesAndNodosTabs"))

import { useAuthStore } from "../store/auth.store";

export const ClientesRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "clientes",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <ClientesView />
                    </ProtectedRoutes>
                </Suspense>
        },
        {
            path: "clientes/add",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormClientes />
                    </ProtectedRoutes>
                </Suspense>
        },
        {
            path: "clientes/edit/:id",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormEditClientes />
                    </ProtectedRoutes>
                </Suspense>
        }
    ]
}