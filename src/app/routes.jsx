import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import './helpers/functions/Interceptors';
import routesChildren from './pages';
import useAuths from './hooks/auth/useAuth';

// auth pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const Login = Loadable(lazy(() => import('app/views/auth/Login')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// pages
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));


const HostingDomain = Loadable(lazy(() => import('app/views/hosting-domain/Index')));
const CheckoutDomain = Loadable(lazy(() => import('app/views/hosting-domain/Checkout')));
const DomainConfig = Loadable(lazy(() => import('app/views/hosting-domain/DomainConfig')));
const InvoiceDomain = Loadable(lazy(() => import('app/views/hosting-domain/Invoice')));


// Handle dynamic redirection
const RedirectBasedOnAuth = () => {
  // const { isAuthenticated } = useAuths();

  // If authenticated, redirect to the dashboard, otherwise, redirect to login
  return <Navigate to="/" />;
};

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      ...routesChildren,
      { path: '/', element: <HostingDomain /> },
      { path: '/config', element: <DomainConfig /> },
      { path: '/checkout', element: <CheckoutDomain /> },
      { path: '/invoice/:id', element: <InvoiceDomain /> },

      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      }
    ]
  },

  // auth pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <JwtRegister /> },
  { path: '/forgot-password', element: <ForgotPassword /> },

  {
    path: '/',
    element: <RedirectBasedOnAuth />
  },

  { path: '*', element: <NotFound /> }
];
export default routes;
