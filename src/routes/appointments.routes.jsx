import { lazy, Suspense } from "react";

const AppointmentView = lazy(() => import("../views/dashboard/appointments/appointment/Index"));

import ProtectedRoutes from "../components/ProtectedRoutes";

import { useAuthStore } from "../store/auth.store";

export const AppointmentRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: 'appointment',
            element: (
                <Suspense fallback="Loading...">
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <AppointmentView />
                    </ProtectedRoutes>
                </Suspense>
            )
        }
    ]
}