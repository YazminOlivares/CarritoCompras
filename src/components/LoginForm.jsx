/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState,  useRef, useEffect } from 'react';
import { getAllUsers } from '../services/usersService';
import styled from 'styled-components';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // useEffect para mantener el foco en los input
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
      background-color: #f4f7fc;
  `;

  const FormContainer = styled.div`
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;

      h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
      }
  `;

  const InputGroup = styled.div`
      margin-bottom: 20px;
  `;

  const InputField = styled.input`
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
  `;

  const SubmitButton = styled.button`
      width: 100%;
      padding: 14px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
          background-color: #0056b3;
      }
  `;

  const ErrorMessage = styled.p`
      color: #e74c3c;
      font-size: 14px;
      text-align: center;
  `;

  const WelcomeMessage = styled.p`
      color: #2ecc71;
      font-size: 16px;
      text-align: center;
  `;

    return (
        <Container>
            <FormContainer>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>Correo electrónico</label>
                        <InputField
                            ref={emailRef} 
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <label>Contraseña</label>
                        <InputField
                            ref={passwordRef}
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