import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const RolesView = lazy(() => import("../views/dashboard/roles/Index"));

const FormRol = lazy(() => import("../views/dashboard/roles/components/FormRol"));

const FormEditRol = lazy(() => import("../views/dashboard/roles/components/FormRol"))

import { useAuthStore } from "../store/auth.store";

export const RolesRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "roles",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <RolesView />
                    </ProtectedRoutes>
                </Suspense>
        },
        {
            path: "roles/add",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormRol />
                    </ProtectedRoutes>
                </Suspense>
        },
        {
            path: "roles/edit/:id",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormEditRol />
                    </ProtectedRoutes>
                </Suspense>
        }
    ]
}