import { ROLE } from '@models/enums';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import { Navigate, useParams } from 'react-router-dom';

function Collections() {
  const { user } = useAppSelector(authSelector);
  const { id } = useParams();

  if (user?.id !== id && user?.role !== ROLE.ADMIN) {
    return <Navigate to="/" />;
  }

  return <div>Collections</div>;
}

export default Collections;
