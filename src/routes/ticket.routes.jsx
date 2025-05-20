import { lazy, Suspense } from "react";

import ProtectedRoutes from "../components/ProtectedRoutes";

const TicketView = lazy(() => import("../views/dashboard/ticket/index"));

const FormTicket = lazy(() => import("../views/dashboard/ticket/components/FormTicket"));

const FormEditTicket = lazy(() => import("../views/dashboard/ticket/components/FormTicket"))

import { useAuthStore } from "../store/auth.store";

export const TicketRoutes = () => {
    const { isAuth, roles } = useAuthStore();
    return [
        {
            path: "ticket",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <TicketView />
                    </ProtectedRoutes>
                </Suspense>
        },
        {
            path: "ticket/add",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormTicket />
                    </ProtectedRoutes>
                </Suspense>
        },
        {
            path: "ticket/edit/:id",
            element:
                <Suspense fallback={"cargando..."}>
                    <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                        <FormEditTicket />
                    </ProtectedRoutes>
                </Suspense>
        }
    ]
}