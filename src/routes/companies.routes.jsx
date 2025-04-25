import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

import { useAuthStore } from "../store/auth.store";

const Companies = lazy(() => import("../views/dashboard/companies"));
const FormCompanyView = lazy(() => import("../views/dashboard/companies/components/FormCompany"));

export const companiesRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "companies",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <ProtectedRoutes
                        isAllowed={isAuth}
                        userRole={roles}
                        allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <Companies />
                    </ProtectedRoutes>
                </Suspense>
            )
        },
        {
            path: "companies/add",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <ProtectedRoutes
                        isAllowed={isAuth}
                        userRole={roles}
                        allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormCompanyView />
                    </ProtectedRoutes>
                </Suspense>
            )
        },
        {
            path: "companies/edit/:id",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <ProtectedRoutes
                        isAllowed={isAuth}
                        userRole={roles}
                        allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormCompanyView />
                    </ProtectedRoutes>
                </Suspense>
            )
        }

    ]
}