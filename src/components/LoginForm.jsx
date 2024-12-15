import React, { useState, useRef, useEffect } from 'react';
import { getAllUsers } from '../services/usersService';
import styled from 'styled-components';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, [email]);

    useEffect(() => {
        if (passwordRef.current) {
            passwordRef.current.focus();
        }
    }, [password]);

    useEffect(() => {
        const originalStyles = document.body.style.cssText;
    
        // Quita restricciones de ancho
        document.body.style.cssText = `
            max-width: 100%;
            overflow: hidden;
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

            onLogin(foundUser);
            
            setError('');
            console.log("Inicio de sesión exitoso:", foundUser);
        } catch (err) {
            setError("Error al iniciar sesión: " + err.message);
        }
    };

    const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        position: relative;
    `;

    const Background = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('https://png.pngtree.com/background/20240730/original/pngtree-close-up-3d-illustration-of-a-car-instrument-panel-with-speedometer-picture-image_9906635.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: brightness(0.5);
        z-index: -1;
    `;

    const FormContainer = styled.div`
        background-color: rgba(255, 255, 255, 0.9);
        padding: 40px 30px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 380px;
        transition: transform 0.3s ease;
        filter: brightness(1.0);

        &:hover {
            transform: scale(1.03);
        }

        h2 {
            text-align: center;
            margin-bottom: 25px;
            font-size: 26px;
            color: #222;
            font-weight: 600;
        }
    `;

    const InputGroup = styled.div`
        margin-bottom: 20px;

        label {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
            display: block;
        }
    `;

    const InputField = styled.input`
        width: 100%;
        padding: 12px 15px;
        font-size: 16px;
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
        background: linear-gradient(90deg, #ff7e5f, #feb47b);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: opacity 0.3s ease;

        &:hover {
            opacity: 0.9;
        }
    `;

    const ErrorMessage = styled.p`
        color: #e74c3c;
        font-size: 14px;
        text-align: center;
        margin-top: 15px;
    `;

    const WelcomeMessage = styled.p`
        color: #27ae60;
        font-size: 16px;
        text-align: center;
        margin-top: 15px;
        font-weight: bold;
    `;

    return (
        <Container>
            <Background />
            <FormContainer>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label htmlFor='email'>Correo electrónico</label>
                        <InputField
                            ref={emailRef} 
                            type="email"
                            id='email'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <label htmlFor='pass'>Contraseña</label>
                        <InputField
                            ref={passwordRef}
                            id='pass'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange} 
                            required
                        />
                    </InputGroup>

                    <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
                </form>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {user && <WelcomeMessage>¡Bienvenido, {user.nombreCompleto}!</WelcomeMessage>}
            </FormContainer>
        </Container>
    );
};

export default LoginForm;