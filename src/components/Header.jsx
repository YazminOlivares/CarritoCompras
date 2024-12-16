import React, { useState, useEffect } from "react";
import { deleteOneProduct } from "../services/productsService";
import { getUserShCart, payShCart, createNewShCart } from "../services/shCartService";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const Header = ({
    allProducts,
    setAllProducts,
	infoCart, 
	setInfoCart,
    total,
    setTotal,
    countProducts,
    setCountProducts,
	userId
}) => {

    const [active, setActive] = useState(false);
	const [notification, setNotification] = useState('');
	const [notification2, setNotification2] = useState('');
	const [loading, setLoading] = useState(true);
	const [reload, setReload] = useState(false);
	const [created, setCreated] = useState(false);

	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate('/Profile');
	};
	
    const onDeleteProduct = async (product) => {

        await deleteOneProduct( infoCart._id, product.id );

        const results = allProducts.filter(
            item => item.id !== product.id
        );

        setTotal( total - product.price );
        setCountProducts( countProducts - product.quantity);
        setAllProducts( results );

		setNotification(`Eliminado del carrito: ${product.name} (${product.quantity})`);

		setTimeout(() => {
			setNotification('');
		}, 3000);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);

		setNotification('Carrito vaciado con éxito');

		setTimeout(() => {
			setNotification('');
		}, 3000);
    };

	const paymentBtn = async () => {
		console.log(infoCart);
		await payShCart(infoCart._id);
		setNotification2('Pago realizado con exito')
		setTimeout(() => {
			setNotification2('');
		}, 3000);
		setReload(!reload);
	}

	useEffect(() => {
        const fetchProducts = async () => {
		  setLoading(true);
          try {
            const pro = await getUserShCart(userId);
			console.log(pro);
			if(pro){
				setInfoCart(pro);
				let productsArray = [];
				let cont = 0;
				let to = 0;
				pro.productos.map(producto => {
					productsArray.push(
						{
							id: producto.product._id,
							name: producto.product.name,
							price: producto.product.price,
							images: [producto.product.images],
							quantity: producto.quantity,
							facturapi: producto.product.facturapi
						}
					)
					cont = cont + producto.quantity;
					to = to + producto.product.price;
				});
				setCountProducts(cont);
				setAllProducts(productsArray); 
				setTotal(to);
			}else if(!created){
				
				const idCart = await createNewShCart(userId);
				console.log("creo nuevo: ",idCart.createShoppingCar._id);
				setCountProducts(0);
				setAllProducts([]); 
				setTotal(0);
				setInfoCart([]);
				setCreated(true);
				console.log("nuevos datos:", infoCart);
			} 
          } catch (error) {
            console.error("Error al obtener los productos del carrito:", error);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchProducts();
    }, [reload]);

    return(
        <header>
			{notification && (
				<div className="notificationR">
					{notification}
				</div>
        	)}
			{notification2 && (
				<div className="notification">
					{notification2}
				</div>
        	)}
            <h1>
				<Link to="/productlist" style={{ textDecoration: 'none', color: 'inherit' }}>
				Tienda en Línea
				</Link>
			</h1>
			<div className="contenedorRight">
				<div className="container-icon">
					<div className="container-cart-icon" onClick={() => setActive(!active)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-cart'
						>
							<path 
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
							/>
						</svg>
						
						<div className="count-products">
							<span id="contador-productos"> {countProducts} </span>
						</div>
					</div>

					<div className={`container-cart-products ${
							active ? '' : 'hidden-cart' }`}
					>

						{allProducts.length ? (
							<>
								<div className='row-product'>
									{allProducts.map(product => (
										<div className='cart-product' key={product.id}>
											<div className='info-cart-product'>
												<span className='cantidad-producto-carrito'>
													{product.quantity}
												</span>
												<p className='titulo-producto-carrito'>
													{product.name}
												</p>
												<span className='precio-producto-carrito'>
													${product.price}
												</span>
											</div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='icon-close'
												onClick={() => onDeleteProduct(product)}
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</div>
									))}
								</div>

								<div className='cart-total'>
									<h3>Total:</h3>
									<span className='total-pagar'>${total}</span>
								</div>

								<button className='btn-clear-all' onClick={paymentBtn}>
									Comprar Ahora
								</button>
							</>
						) : (
							<p className='cart-empty'>El carrito está vacío</p>
						)}
						
					</div>
					</div>
					{userId && (
						<div className="user-profile" onClick={handleProfileClick}>
							<span>Nombre usuario</span>
						</div>
						)}
				<div/>
			</div>
        </header>
    )
}