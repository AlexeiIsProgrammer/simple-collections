import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '@app/App';
import Login from '@pages/Login';
import Error from '@pages/Error';
import Register from '@pages/Register';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
