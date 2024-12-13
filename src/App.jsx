import { useState } from 'react'
import { Header } from './components/Header';
import { ProductsList } from './components/ProductsList';
import Login from './components/LoginForm';

function App() {

  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
  const [user, setUser] = useState(null); // Estado global para el usuario

  // Función para manejar el usuario encontrado
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <>
      {user ? (
        <><Header
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
          userId={user._id} />
          <ProductsList
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts} /></>
      ) : (
        <Login onLogin={handleLogin} /> // Pasamos el manejador al Login
      )}
      
    </>
  )
}

export default App
