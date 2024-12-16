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

    const RightContainer = styled.div`
        flex-grow: 1;
        background-color: #F5F5F5;
        box-shadow: 15px 10px 30px rgba(0, 31, 63, 0.9);
        padding: 40px;
        border-radius: 12px;
        max-width: 600px;
        height: 80%;
        font-family: 'Roboto', sans-serif;

        h2 {
            text-align: center;
            font-size: 2rem;
            color: #001F3F;
            font-weight: 600;
            margin-bottom: 20px;
        }

        span {
            font-weight: bold;
            margin-right: 10px;
            font-size: 1.2rem;
            color: #001F3F;
        }

        p {
            margin: 0;
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            color: #333333;
        }

        a {
            text-decoration: none; /* Elimina el subrayado predeterminado */
            color: #333; /* Color base para los enlaces */
            font-weight: 500; /* Para darle un poco de énfasis al enlace */
            transition: color 0.3s ease, border-bottom 0.3s ease; /* Transición suave en color y subrayado */
        }

        a:hover {
            color: #001F3F;
            border-bottom: 2px solid #001F3F;
        }

        a:focus {
            outline: none;
            border-bottom: 2px solid black;
        }

    `;

    const Avatar = styled.img`
        width: auto;
        height: 80%;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 15px;
    `;

    const ProfileDetail = styled.div`
        margin-top: 20px;
        font-size: 1.2rem;
        color: #333333;
        
        p {
            margin: 5px 0;
        }

        span {
            font-weight: bold;
            color: #001F3F;
        }
    `;

    return (
        <Container>
            <LeftContainer>
                <Avatar src="https://i.pinimg.com/564x/9d/6b/9d/9d6b9db2dcb0526a09b89fb35d075c72.jpg"/>
                <h3>Bienvenido {user.nombreCompleto}!</h3>
                <p>Esta es la mejor tienda en linea de autos que puedas encontrar.</p>
            </LeftContainer>
            <RightContainer>
                <ProfileDetail>
                    <h2>Datos Generales</h2>
                    <hr></hr>
                    <p><span>Email:</span>{user.email}</p>
                    <p><span>Nombre Completo:</span>{user.nombreCompleto}</p>
                    <p><span>Fecha de Registro:</span>{fecha}</p>
                    <p><span>RFC:</span>{user.RFC}</p>
                    <p><span>Dirección:</span>{user.direccion}</p>
                    <p><span>Código postal:</span>{user.zipCode}</p>
                    <h2>Datos De Contacto</h2>
                    <hr></hr>
                    <p><span>Telefono Celular:</span>{user.telefono}</p>
                    <p><span>Facebook:</span><a href="https://www.facebook.com">www.facebook.com</a></p>
                    <p><span>Instagram:</span><a href="https://www.instagram.com">www.instagram.com</a></p>
                    <p><span>TikTok:</span><a href="https://www.tiktok.com">www.tiktok.com</a></p>
                </ProfileDetail>
            </RightContainer>
        </Container>
    );
};

export default Profile;