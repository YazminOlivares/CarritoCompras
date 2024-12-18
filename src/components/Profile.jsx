/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Profile = ({ user }) => {

    const fechaInt = parseInt(user.fechaRegistro, 10);

    const timestamp = fechaInt;
    const date = new Date(timestamp);

    // obtener solo la fecha sin la hora
    const fecha = date.toLocaleDateString(); 

    useEffect(() => {
        const originalStyles = document.body.style.cssText;

        document.body.style.cssText = `
            max-width: 100%;
            overflow: hidden;
            margin-top: 0;
            margin-left: 0;
            padding-left: 0;
        `;
        
        return () => {
            document.body.style.cssText = originalStyles;
        };
    }, []);

    return (
        <Container>
            <LeftContainer>
                <Avatar src="https://i.pinimg.com/564x/9d/6b/9d/9d6b9db2dcb0526a09b89fb35d075c72.jpg"/>
                <h3>Bienvenido {user.nombreCompleto}!</h3>
                <p>Esta es la mejor tienda en linea de autos que puedas encontrar.</p>
            </LeftContainer>
            
            {/* Contenedor derecho principal */}
            <RightWrapper>
                <RightContainer>
                    <h2>Datos Generales</h2>
                    <hr></hr>
                    <p><span>Nombre Completo: </span>{user.nombreCompleto}</p>
                    <p><span>Fecha de Registro: </span>{fecha}</p>
                    <p><span>RFC: </span>{user.RFC}</p>
                    <p><span>Dirección: </span>{user.direccion}</p>
                    <p><span>Código postal: </span>{user.zipCode}</p>
                </RightContainer>

                <RightContainer>
                    <h2>Datos de Contacto</h2>
                    <hr></hr>
                    <p><span>Teléfono: </span>{user.telefono}</p>
                    <p><span>Email: </span>{user.email}</p>
                    <p><span>Facebook: </span><a href="https://www.facebook.com">www.facebook.com</a></p>
                    <p><span>Instagram: </span><a href="https://www.instagram.com">www.instagram.com</a></p>
                </RightContainer>
            </RightWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(135deg, #001F3F 0%, #F5F5F5 100%);
    padding: 40px;
    gap: 30px;
    margin-top: 70px;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
`;

const LeftContainer = styled.div`
    width: 670px;
    height: 80%;
    text-align: center;
    background-color: #F5F5F5;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        margin-bottom: 1rem;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        color: #001F3F;
        font-weight: 600;
    }

    p {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1.2rem;
        color: #333333;
    }
`;

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 600px;
    height: 80%;
`;

const RightContainer = styled.div`
    height: 60%;
    background-color: #F5F5F5;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 12px;

    h2 {
        text-align: center;
        font-size: 1.5rem;
        color: #001F3F;
        font-weight: 600;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.2rem;
        color: #333333;
        margin: 5px 0;
        margin-bottom: 10px;

        span {
            font-weight: bold;
            color: #001F3F;
        }
    }
`;

const Avatar = styled.img`
    width: auto;
    height: 80%;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
`;

export default Profile;