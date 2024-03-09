import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '@app/App';
import Login from '@pages/Login';
import Error from '@pages/Error';
import Main from '@pages/Main';
import { store } from '@redux/index';
import Register from '@pages/Register';
import theme from './theme';
import PrivateRoute from './routes/PrivateRoute';
import Admin from './pages/Admin';
import ROLE from './models/enums';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'admin',
        element: <PrivateRoute element={Admin} roles={[ROLE.ADMIN]} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
