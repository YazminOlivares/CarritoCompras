import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Agregamos Navigate para redirigir
import { Header } from './components/Header';
import { ProductsList } from './components/ProductsList';
import Login from './components/LoginForm';
import Profile from './components/Profile';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [infoCart, setInfoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;