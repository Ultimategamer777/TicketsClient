import LoginPage from '../views/auth/Login';

export function LoginRoutes() {
  return [
    {
      path: '/',
      element: <LoginPage />
    }
  ];
}
