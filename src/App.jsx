import { RouterProvider } from 'react-router-dom';

// tanstack
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

// routing
import { AppRoutes } from './routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';

// auth provider

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeCustomization>
        <NavigationScroll>
          <>
            <RouterProvider router={AppRoutes()} />
          </>
        </NavigationScroll>
      </ThemeCustomization>
    </QueryClientProvider>
  );
}
