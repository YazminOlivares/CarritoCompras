/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shoppingCartNo } from '../services/usersService';

const Historial = ({ user }) => {

    console.log('Pero si entra? ', user._id);

    const [carritos, setCarritos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const carritoss = await shoppingCartNo(user._id);
            console.log('Listado de carritoss: ', carritoss);
            console.log('espacio');
            console.log('espacio');
            console.log('espacio');
            console.log('espacio');
            setCarritos(carritoss); 

            let todosCarritos = [];
            carritoss.map(carrito => {
                console.log(carrito);
                console.log(new Date(parseInt(carrito.cDate)).toLocaleString());
                todosCarritos.push(
                    {
                        id: carrito._id,
                        name: producto.product.name,
                        price: producto.product.price,
                        images: [producto.product.images],
                        quantity: producto.quantity,
                        facturapi: producto.product.facturapi
                    }
                )
            });

            } catch (error) {
            console.error("Error al obtener los carritos:", error);
            } finally {
            setLoading(false); 
            }
        };
    
        fetchProducts();
    }, []);

    const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background: linear-gradient(145deg, rgba(0,31,63,1) 0%, rgba(149,109,73,1) 33%, rgba(27,69,111,1) 66%, rgba(255,181,181,1) 100%);
        padding: 40px;
        gap: 30px;
        margin-top: 70px;
        height: 100vh;
        font-family: 'Roboto', sans-serif;
    `;

    return (
        <Container>
        </Container>
    );
};

export default Historial;