import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { setUser } from '@redux/slices/userSlice';
import { useAppDispatch } from '@redux/index';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useLazyGetUserQuery } from '@services/user';

function App() {
  const dispatch = useAppDispatch();

  const [getUser] = useLazyGetUserQuery();

  useEffect(() => {
    const storageUserId = localStorage.getItem('userId');

    if (storageUserId) {
      getUser(+storageUserId)
        .unwrap()
        .then((userResponse) => dispatch(setUser(userResponse)));
    }
  }, [getUser, dispatch]);

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
