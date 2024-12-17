/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shoppingCartNo } from '../services/usersService';
import { searchProductId } from '../services/productsService';

const Historial = ({ user }) => {
    const [carritos, setCarritos] = useState([]); 
    const [productoDetalles, setProductoDetalles] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarritos = async () => {
            try {
                const carritoss = await shoppingCartNo(user._id);
                setCarritos(carritoss);

                // Obtener detalles de cada producto
                const detallesPromises = carritoss.flatMap((carrito) =>
                    carrito.productos.map(async (producto) => {
                        const res = await searchProductId(producto.product._id);
                        return { id: producto.product._id, data: res.searchProductId };
                    })
                );

                const detalles = await Promise.all(detallesPromises);

                // Guardar detalles en un estado
                const detallesMap = {};
                detalles.forEach(({ id, data }) => {
                    detallesMap[id] = data;
                });
                setProductoDetalles(detallesMap);
            } catch (error) {
                console.error("Error al obtener los carritos o detalles: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarritos();
    }, [user]);

    if (loading) {
        return <div>Carganding los datuskis</div>;
    }

    console.log("Producto detalles: ", productoDetalles);

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
                                <SInfo>${carrito.total}</SInfo>
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

                    {carrito.productos.map((producto, index) => {
                        const detalles = productoDetalles[producto.product._id] || {};

                        return (
                            <CarritoContenido key={index}>
                                <Info>
                                    <p>Producto</p>
                                    <FotoTalVez src={detalles.images[0]} alt="Producto" />
                                </Info>
                                <Info>
                                    <p>Marca</p>
                                    <Logo src={detalles.brand.logo} alt="Logo de la marca"/>
                                </Info>
                                <CarritoDetalles>
                                    <Info>
                                        <p>Nombre</p>
                                        <PDetalles><b>{producto.product.name}</b></PDetalles>
                                    </Info>
                                    <Info>
                                        <p>Descripción</p>
                                        <PDetalles><b>{detalles.desc}</b></PDetalles>
                                    </Info>
                                    <Info>
                                        <p>Cantidad</p>
                                        <PDetalles><b>{producto.quantity}</b></PDetalles>
                                    </Info>
                                </CarritoDetalles>
                            </CarritoContenido>
                        );
                    })}
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
    justify-content: space-between;
    align-items: center; 
    padding: 1rem 0;
    border-bottom: 2px solid #DDD;
    gap: 1.5rem; 
    width: 100%; 
`;

const FotoTalVez = styled.img`
    width: 8rem;
    height: 5.5rem;
    margin-right: 16px;
    object-fit: cover;
`;

const Logo = styled.img`
    width: 2.5rem;
    height: auto;
    margin-bottom: 0.5rem;
`;

const CarritoDetalles = styled.div`
    font-size: 14px;
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

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 120px;
`;