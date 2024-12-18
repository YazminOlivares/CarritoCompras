/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { getAllUsers } from '../services/usersService';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const originalStyles = document.body.style.cssText;
    
        // Quita restricciones del css general
        document.body.style.cssText = `
            max-width: 100%;
            overflow: hidden;
            margin-top: 0;
            margin-left:0;
            padding-left:0;
        `;
    
        return () => {
            document.body.style.cssText = originalStyles;
        };
    }, []);
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();
    
        const handleRegisterClick = () => {
            navigate('/Register');
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const users = await getAllUsers();
            const foundUser = users.find((u) => u.email === email);

            if (!foundUser) {
                setError("Usuario no encontrado");
                return;
            }

            if (foundUser.password !== password) {
                setError("Contraseña incorrecta");
                return;
            }

            localStorage.setItem('user', JSON.stringify(foundUser));

            onLogin(foundUser);
            
            setError('');
            console.log("Inicio de sesión exitoso:", foundUser);
        } catch (err) {
            setError("Error al iniciar sesión: " + err.message);
        }
    };

    return (
        <Container>
            <LeftImageContainer>
                <img src="https://s1.1zoom.me/big0/147/Roads_Motion_Night_489310.jpg" alt="Carro" />
            </LeftImageContainer>
            <FormContainer>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label htmlFor='email'>Correo electrónico</label>
                        <InputField
                            type="email"
                            id='email'
                            value={email}
                            onChange={handleEmailChange}
                            required
                            placeholder="Ingrese su correo electrónico"
                        />
                    </InputGroup>

                    <InputGroup>
                        <label htmlFor='pass'>Contraseña</label>
                        <InputField
                            id='pass'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange} 
                            required
                            placeholder="Ingrese su contraseña"
                        />
                    </InputGroup>

                    <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
                    <LinkContainer>
                    <LinkR onClick={handleRegisterClick}>Registrarse</LinkR>
                    </LinkContainer>
                </form>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {user && <WelcomeMessage>¡Bienvenido, {user.nombreCompleto}!</WelcomeMessage>}
            </FormContainer>
        </Container>
    );
};

const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        min-width: 100vh;
        position: relative;
        background: linear-gradient(135deg, #001F3F 0%, #F5F5F5 100%);
        margin:0;
        padding:0;
        filter: brightness(0.8);
    `;

    const LeftImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-right: 5%;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    margin-left: 0;
    padding-left: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
        mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
`;


    const FormContainer = styled.div`
        background-color: #D9D9D9;
        border:1px;
        box-shadow: 15px 10px 30px rgba(0, 31, 63, 0.9);
        margin-left: 5%;
        margin-right: 7%;
        padding: 40px 30px;
        border-radius: 12px;
        font-family: 'Roboto', sans-serif;
        height: 500px;
        width: 100%;
        max-width: 550px;
        transition: transform 0.3s ease;
        filter: brightness(1.05);

        &:hover {
            transform: none;
        }

        h2 {
            text-align: center;
            margin-bottom: 50px;
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
            color: #001F3F;
            font-weight: 600;
        }
    `;

    const InputGroup = styled.div`
        margin-bottom: 20px;

        label {
            font-size: 1.2rem;
            color: #333333;
            margin-bottom: 1.5rem;
            display: block;
        }
    `;

    const InputField = styled.input`
        width: 100%;
        height: 58px;
        padding: 12px 15px;
        font-size: 1rem;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;

        &:focus {
            border-color: #1a73e8;
            box-shadow: 0 0 4px rgba(26, 115, 232, 0.4);
            outline: none;
        }
    `;

    const SubmitButton = styled.button`
        width: 100%;
        padding: 14px 20px;
        background: #001F3F;
        color: white;
        border: none;
        border-radius: 30px;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        transition: opacity 0.3s ease;
        margin-top: 1.5rem;

        &:hover {
            opacity: 0.9;
        }
    `;

    const ErrorMessage = styled.p`
        color: #dc3545;
        font-size: 14px;
        text-align: center;
        margin-top: 15px;
    `;

    const WelcomeMessage = styled.p`
        color: #28a745;
        font-size: 16px;
        text-align: center;
        margin-top: 15px;
        font-weight: bold;
    `;

    const LinkContainer = styled.div`
        text-align: center; /* Centra el enlace horizontalmente */
        margin-top: 20px; /* Espaciado arriba del enlace */
    `;

    const LinkR = styled.a`
        font-weight: bold;
        font-size: 20px;
	    align-self: center;
	    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        text-decoration: underline;
        &:hover {
            cursor: pointer;
            color: #1a73e8
        }
    `;

export default LoginForm;