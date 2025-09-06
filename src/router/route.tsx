import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
]);
