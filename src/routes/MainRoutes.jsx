import { lazy, Suspense } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

import Loading from '../views/Loading';

// ==============================|| MAIN ROUTING ||============================== //
import ProtectedRoutes from '../components/ProtectedRoutes';

const MainLayout = lazy(() => import('layout/MainLayout'));

import { LoginRoutes } from './auth.routes';

import { UserRoutes } from './user.routes';

import { AppointmentRoutes } from './appointments.routes';

import { SpecialtyRoutes } from './specialty.routes';

import { RolesRoutes } from './roles.routes';

import { UnitsRoutes } from './units.routes';

import { VaccinesRoutes } from './vaccines';

import { companiesRoutes } from './companies.routes';

import { TagsRoutes } from './tags';

import { PrioritiesRoutes } from './priorities.routes';

import { BodegaRoutes } from './bodega.routes';

import { ProductosRoutes } from './productos.routes';

import { ClientesRoutes } from './clientes.routes';

// import NotFound from '../views/404';

export function MainRoutes(isAuth, userRole) {
  return [
    {
      path: '/home',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoutes isAllowed={isAuth} userRole={userRole} allowedRoles={["SUPER-ADMIN", "ADMIN"]}>
                <DashboardDefault />
              </ProtectedRoutes>
            </Suspense>
          )
        },
        ...UserRoutes(),
        ...AppointmentRoutes(),
        ...RolesRoutes(),
        ...SpecialtyRoutes(),
        ...UnitsRoutes(),
        ...VaccinesRoutes(),
        ...companiesRoutes(),
        ...TagsRoutes(),
        ...PrioritiesRoutes(),
        ...BodegaRoutes(),
        ...ProductosRoutes(),
        ...ClientesRoutes(),
        
      ]
    },
    ...LoginRoutes(),
    // {
    //   path: '*',
    //   element: <NotFound />
    // }
  ];
}
