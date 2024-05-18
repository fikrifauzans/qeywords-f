import { CssBaseline } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import { getToken } from './helpers/functions/LocalStorageServices';
import { useEffect } from 'react';
import useAuths from './hooks/auth/useAuth';

const App = () => {
  const content = useRoutes(routes);

  const navigate = useNavigate();
  const { isAuthenticated, setAuthStatus } = useAuths();

  useEffect(() => {
    const token = getToken();
    if (token) {
      if (!isAuthenticated) {
        setAuthStatus(true);
      }
    } else {
      setAuthStatus(false);
      // navigate('/login');
    }
  }, [isAuthenticated, setAuthStatus, navigate]);

  return (
    <>
      <SettingsProvider>
        <AuthProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
            <ToastContainer />
          </MatxTheme>
        </AuthProvider>
      </SettingsProvider>
    </>
  );
};

export default App;
