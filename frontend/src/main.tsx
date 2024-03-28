import App from '@app/App';
import { ChakraProvider } from '@chakra-ui/react';
import CollectionItem from '@pages/CollectionItem';
import Error from '@pages/Error';
import Login from '@pages/Login';
import Main from '@pages/Main';
import Register from '@pages/Register';
import { store } from '@redux/index';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './main.css';
import { ROLE } from './models/enums';
import Admin from './pages/Admin';
import Collections from './pages/Collections';
import Item from './pages/Item';
import Results from './pages/Results';
import PrivateRoute from './routes/PrivateRoute';
import theme from './theme';

import './i18n';

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
        path: 'collections/:userId',
        element: <Collections />,
      },
      {
        path: 'collections/:userId/:collectionId',
        element: <CollectionItem />,
      },
      {
        path: 'collections/:userId/:collectionId/:itemId',
        element: <Item />,
      },
      {
        path: 'results/:tagId',
        element: <Results />,
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
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
