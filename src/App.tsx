import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);
  const { pathname } = useLocation();
  return (
    <>
      <div>
        <Header />
        <Outlet />
        {pathname !== '/login' && pathname !== '/signup' && <Footer />}
      </div>
    </>
  );
}

export default App;
