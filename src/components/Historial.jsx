/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shoppingCartNo } from '../services/usersService';

const Historial = ({ user }) => {
    const [carritos, setCarritos] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const carritoss = await shoppingCartNo(user._id);
                console.log('Caritotototots: ', carritoss);
                setCarritos(carritoss);
            } catch (error) {
                console.error("Error al obtener los carritos: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user]); 

    if (loading) {
        return <div>Carganding los datuskis</div>;
    }

    return (
        <Container>
            {carritos.map((carrito) => (
                <Carrito key={carrito._id}>
                    <Cabecera>
                        <CarritoInfo>
                            <div>
                                <PInfo>PEDIDO REALIZADO</PInfo>
                                <SInfo>{new Date(parseInt(carrito.cDate)).toLocaleString()}</SInfo>
                            </div>
                            <div>
                                <PInfo>TOTAL</PInfo>
                                <SInfo>{carrito.total}</SInfo>
                            </div>
                            <div>
                                <PInfo>ENVIAR A</PInfo>
                                <SInfo>{user.nombreCompleto}</SInfo>
                            </div>
                        </CarritoInfo>
                        <CarritoDerecha>
                            <PDerecha><b>NÚMERO DE PEDIDO</b></PDerecha>
                            <PDerecha>{carrito._id}</PDerecha>
                        </CarritoDerecha>
                    </Cabecera>

                    {carrito.productos.map((item, index) => (
                        <CarritoContenido key={index}>
                            <FotoTalVez src="https://via.placeholder.com/100x70" alt="Producto" />
                            <CarritoDetalles>
                                <PDetalles><strong>{item.product.name}</strong></PDetalles>
                                <PDetalles>Cantidad: {item.quantity}</PDetalles>
                            </CarritoDetalles>
                        </CarritoContenido>
                    ))}
                </Carrito>
            ))}
        </Container>
    );
};

export default Historial;

/* //////////////////////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////// */ //Estilos CSS pero en styled /* ////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////////////////////// */

const Container = styled.div`
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 2rem 3rem 3rem 3rem;
        gap: 30px;
        height: 100vh;
        font-family: 'Roboto', sans-serif;
        flex-direction: column;
    `;

    const Carrito = styled.div`
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

    const Cabecera = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #ddd;
        padding-bottom: 12px;
        margin-bottom: 12px;
        line-height: 1.5;
    `;

    const CarritoInfo = styled.div`
        margin: 0;
        font-size: 12px;
        color: #555;
        display: flex;
        gap: 3rem;
    `;

    const PInfo = styled.p`
        margin: 0;
        font-size: 12px;
        color: #555;
    `;

    const SInfo = styled.span`
        font-size: 14px;
        color: #000;
        font-weight: bold;
    `;

    const CarritoDerecha = styled.div`
        text-align: right;
        display: flex;
        flex-direction: column;
    `;

    const PDerecha = styled.p`
        margin: 0;
        font-size: 12px;
        color: #555;
    `;

    const CarritoContenido = styled.div`
        display: flex;
        align-items: flex-start;  
        padding: 1.2rem 0;
        border-bottom: 2px solid #DDD;
    `;

    const FotoTalVez = styled.img`
        width: 120px;
        height: auto;
        margin-right: 16px;
    `;

    const CarritoDetalles = styled.div`
        font-size: 14px;
        margin: 0 0 12px;
        color: #333;
        width: 100%;
        display: flex;
        justify-content: space-around;
    `;

    const PDetalles = styled.p`
        font-size: 14px;
        margin: 0 0 12px;
        color: #333;
    `;