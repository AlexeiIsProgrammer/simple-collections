import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import { ROLE } from '@models/enums';

interface PrivateRouteProps {
  element: React.ComponentType;
  roles: Array<ROLE>;
}

function PrivateRoute({ element: RouteComponent, roles }: PrivateRouteProps) {
  const { user, isAuth } = useAppSelector(authSelector);
  const userHasRequiredRole = !!(user && roles.includes(user.role));

  if (isAuth && userHasRequiredRole) {
    return <RouteComponent />;
  }

  return <Navigate to="/" />;
}

export default PrivateRoute;
