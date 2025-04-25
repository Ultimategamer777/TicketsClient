import { lazy, Suspense } from 'react';

import ProtectedRoutes from '../components/ProtectedRoutes';

const UserView = lazy(() => import('../views/dashboard/users/Index'));

import { useAuthStore } from '../store/auth.store';

export const UserRoutes = () => {

  const { isAuth, roles } = useAuthStore();

  return [
    {
      path: 'user',
      element: (
        <Suspense fallback={"Loading..."}>
          <ProtectedRoutes isAllowed={isAuth} userRole={roles} allowedRoles={["SUPER-ADMIN", "ADMIN"]} >
            <UserView />
          </ProtectedRoutes>
        </Suspense>
      )
    }
  ];
}
