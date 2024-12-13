import { useState } from 'react'
import { Header } from './components/Header';
import { ProductsList } from './components/ProductsList';

function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [infoCart, setInfoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  return (
    <>
      <Header 
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          infoCart={infoCart}
          setInfoCart={setInfoCart}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
      />
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
    </>
  )
}

export default App
