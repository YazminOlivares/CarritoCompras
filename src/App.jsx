import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Agregamos Navigate para redirigir
import { Header } from './components/Header';
import { ProductsList } from './components/ProductsList';
import Login from './components/LoginForm';
import Profile from './components/Profile';
import Historial from './components/Historial';
import Register from './components/RegisterForm';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [infoCart, setInfoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
      setUser(loggedInUser);
  };

  const handleLogout = () => {
      localStorage.removeItem('user'); 
      setUser(null);
  };

  return (
    <Router>
      {user && (
        <Header
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          infoCart={infoCart}
          setInfoCart={setInfoCart}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
          userId={user._id}
          handleLogout = {handleLogout}
        />
      )}
      <Routes>
        <Route path="/" element={user ? (
          <ProductsList
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            infoCart={infoCart}
            setInfoCart={setInfoCart}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
        ) : (
          <Login onLogin={handleLogin} />
        )} />

        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />

        <Route path="/Historial" element={user ? <Historial user={user} /> : <Navigate to="/" />} />

        <Route path='/Register' element={<Register />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;