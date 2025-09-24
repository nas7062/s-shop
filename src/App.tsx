import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { pathname } = useLocation();
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth(); 
  }, [initAuth]);
  return (
    <>
      <div>
        <Header />
        <Outlet />
        {pathname !== '/login' &&
          pathname !== '/signup' &&
          pathname !== '/terms' && <Footer />}
      </div>
    </>
  );
}

export default App;
