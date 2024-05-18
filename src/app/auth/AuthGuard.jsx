import { getToken } from 'app/helpers/functions/LocalStorageServices';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { pathname } = useLocation();

  function hasToken() {
    let flag = false;
    getToken() ? (flag = true) : (flag = false);
    return flag;
  }

  if (hasToken) return <>{children}</>;

  return <Navigate replace to="/" state={{ from: pathname }} />;
};

export default AuthGuard;
