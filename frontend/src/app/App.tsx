import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
