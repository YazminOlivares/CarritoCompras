import React, { useState, useEffect } from "react";
import { addOneProduct, getProducts } from "../services/productsService";

export const ProductsList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal
}) => {

    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const pro = await getProducts();
            const productsArray = Object.values(pro.products); 
            setData(productsArray); 
          } catch (error) {
            console.error("Error al obtener los productos:", error);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchProducts();
    }, []);

    const onAddProduct = product => {
        console.log(product);
        addOneProduct("675114afbcea96a42f9693fa", [{
            "productId": product._id,
            "quantity": 1
          }]);

        const existingProduct = allProducts.find(item => item._id === product._id);

        if (existingProduct) {
            
            const updatedProducts = allProducts.map(item =>
            item._id === product._id
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
            setAllProducts(updatedProducts);
        } else {

            setAllProducts([...allProducts, { ...product, quantity: 1 }]);
        }

        setTotal(total + product.price);
        setCountProducts(countProducts + 1);

        setNotification(`Añadido al carrito: ${product.name}`);

        setTimeout(() => {
            setNotification('');
        }, 3000);

    };

    return(
		<div className='container-items'>
      {notification && (
          <div className="notification">
              {notification}
          </div>
      )}
			{data.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.images?.[0]} alt={product.name} />
					</figure>
					<div className='info-product'>
						<h2>{product.name}</h2>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
}