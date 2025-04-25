import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const TagsView = lazy(() => import("../views/dashboard/tags"));

import { useAuthStore } from "../store/auth.store";

export const TagsRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "tags",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
                        <TagsView />
                    </ProtectedRoutes>
                </Suspense>
        },
    ];
}