// router
import { createBrowserRouter } from 'react-router-dom';

// store
import { useAuthStore } from '../store/auth.store';

// routes
import { MainRoutes } from './MainRoutes';

export function AppRoutes() {
  const { isAuth, roles } = useAuthStore();
  
  const router = createBrowserRouter(MainRoutes(isAuth, roles), {
    basename: import.meta.env.VITE_APP_BASE_NAME
  });

  console.log("Pasa")

  return router;
}
