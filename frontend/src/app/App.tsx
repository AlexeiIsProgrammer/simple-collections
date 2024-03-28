import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, useToast } from '@chakra-ui/react';
import { logout, setUser } from '@redux/slices/userSlice';
import { useAppDispatch } from '@redux/index';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useLazyGetUserQuery } from '@services/user';

function App() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [getUser] = useLazyGetUserQuery();

  useEffect(() => {
    const storageUserId = localStorage.getItem('userId');

    if (storageUserId) {
      getUser(storageUserId)
        .unwrap()
        .then((userResponse) => dispatch(setUser(userResponse)))
        .catch((err) => {
          toast({
            title: err.data.message,
            status: 'error',
            position: 'top',
          });

          dispatch(logout());
          navigate('/login');
        });
    }
  }, [getUser, dispatch, navigate, toast]);

  return (
    <>
      <Header />
      <Container maxW="100%">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
