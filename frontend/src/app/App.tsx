import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { setUser } from '@redux/slices/userSlice';
import { User } from '@models/interfaces';
import { useAppDispatch } from '@redux/index';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useGetUserQuery } from '@services/user';

function App() {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<number | null>(null);

  const { data: user } = useGetUserQuery(id || -1, { skip: !id });

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user') || '') as User;

    if (storageUser) {
      setId(storageUser.id);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

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
