/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shoppingCartNo } from '../services/usersService';
import { searchProductId } from '../services/productsService';
import { trefoil } from 'ldrs'

const Historial = ({ user }) => {
    const [carritos, setCarritos] = useState([]); 
    const [productoDetalles, setProductoDetalles] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        trefoil.register()
        const originalStyles = document.body.style.cssText;

        document.body.style.cssText = `
            background: linear-gradient(145deg, 
            #3B5066 0%, 
            #26496C 4.35%,
            rgba(0,31,63,1) 10%, 
            rgba(149,109,73,1) 25%, 
            rgba(27,69,111,1) 50%, 
            rgba(255,181,181,1) 75%, 
            #2E4E75 95.6%, 
            #576381 100%);
        `;
        
        return () => {
            document.body.style.cssText = originalStyles;
        };
    }, []);

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
        return (<Carganding>
                <l-trefoil
                size="150"
                stroke="10"
                stroke-length="0.08"
                bg-opacity="0.1"
                speed="0.9"
                color="#D1D1D1" 
                ></l-trefoil>
                </Carganding>);
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

                    <SemiCabecera>
                        <p>Producto</p>
                        <p>Marca</p>
                        <p>Nombre</p>
                        <p>Descripción</p>
                        <p>Cantidad</p>
                    </SemiCabecera>

                    {carrito.productos.map((producto, index) => {
                        const detalles = productoDetalles[producto.product._id];

                        return (
                            <CarritoContenido key={index}>
                                <FotoTalVez src={detalles.images[0]} alt="Producto" />
                                <Logo src={detalles.brand.logo} alt="Logo de la marca"/>
                                <PDetalles><b>{producto.product.name}</b></PDetalles>
                                <PDetalles><b>{detalles.desc}</b></PDetalles>
                                <PDetalles>Cantidad: <b>{producto.quantity}</b></PDetalles>
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
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    filter: brightness(0.95);
`;

const Cabecera = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid silver;
    padding: 1.2rem 1.2rem 1.2rem 1.2rem;
    line-height: 1.5;
    background-color: gainsboro;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const SemiCabecera = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr 2fr 2fr 2fr;
    text-align: center;
    font-weight: bold;
    padding: 0.5rem 0;
    border-bottom: 2px solid #000;
    background-color: ghostwhite;
    border-image: linear-gradient(
        to right,
        transparent 0%,
        #000,
        transparent 100%
      ) 30;
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
    display: grid;
    grid-template-columns: 1.5fr 1fr 2fr 2fr 2fr;
    align-items: center;
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
    gap: 1rem;
    &:last-child {
        border-bottom: none;
    }
`;

const FotoTalVez = styled.img`
    width: 9rem;
    height: 5.5rem;
    object-fit: cover;
    margin: 0 auto;
`;

const Logo = styled.img`
    width: 3rem;
    height: auto;
    margin: 0 auto;
`;

const PDetalles = styled.p`
    margin: 0;
    font-size: 1rem;
    color: #333;
`;

const Carganding = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    height: 92vh;
    font-family: 'Roboto', sans-serif;
    flex-direction: column;
`;