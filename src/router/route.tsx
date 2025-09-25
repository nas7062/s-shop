import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import TermsPage from '@/pages/TermsPage';
import DetailPage from '@/pages/DetailPage';
import AuthCallback from '@/components/AuthCallback';
import LikePage from '@/pages/LikePage';

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
        path: '/terms',
        element: <TermsPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/detail/:productId',
        element: <DetailPage />,
      },
      {
        path: '/auth/callback',
        element: <AuthCallback />,
      },
      {
        path: '/likes',
        element: <LikePage />,
      },
    ],
  },
]);
