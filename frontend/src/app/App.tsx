import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { setUser } from '@redux/slices/userSlice';
import { User } from '@models/interfaces';
import { useAppDispatch } from '@redux/index';
import Header from '@components/Header';
import Footer from '@components/Footer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageUser = localStorage.getItem('user');

    if (storageUser) {
      dispatch(setUser(JSON.parse(storageUser) as User));
    }
  }, [dispatch]);

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
