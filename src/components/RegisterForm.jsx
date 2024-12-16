import React, { useState, useRef, useEffect } from 'react';
import { registerUser } from '../services/usersService';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [RFC, setRFC] = useState('');
    const [Zcode, setZcode] = useState('');
    const [Address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [payment, setPayment] = useState("");
    const [error, setError] = useState('');

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
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRFCChange = (e) => {
        setRFC(e.target.value);
    };

    const handleZcodeChange = (e) => {
        const value = e.target.value;
        const parsedValue = parseInt(value, 10); // Convierte el valor a un entero
        if (!isNaN(parsedValue)) {
            setZcode(parsedValue); // Solo guarda el valor si es un número
        } else {
            setZcode(""); // Si no es un número, no actualiza el estado
        }
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePaymentChange = (e) => {
        setPayment(e.target.value);
    };


    const navigate = useNavigate();
    
        const handleLoginClick = () => {
            navigate('/');
        };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            nombreCompleto: name,
            email: email,
            password: password,
            RFC: RFC,
            direccion: Address,
            zipCode: Zcode,
            telefono: phone,
            tipoUsuario: "cliente", // Por defecto "cliente", puedes hacer dinámico si quieres
            metodoPagoPreferido: [payment] // Convertir a array si es solo un valor
        };
        
        try {
            const user = await registerUser(userData);
            setError('');
            console.log("Registrado correctamente");
            navigate('/');
        } catch (err) {
            console.log("errorererere: " + err.ErrorMessage)
            console.log("nombre: "+name)
            setError("Error al resgistrarse");
        }
    };

    return (
        <Container>
            <LeftImageContainer>
                <img src="https://s1.1zoom.me/big0/147/Roads_Motion_Night_489310.jpg" alt="Carro" />
            </LeftImageContainer>
            <FormContainer>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                    <label htmlFor='name'>Nombre Completo</label>
                        <InputField
                            type="text"
                            id='name'
                            value={name}
                            onChange={handleNameChange}
                            required
                            placeholder="Ingrese su nombre"
                        />
                    </InputGroup>

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

                    <InputRow>
                        <InputGroup2>
                            <label htmlFor='pass'>Contraseña</label>
                            <InputField 
                               type="password"
                               value={password}
                               onChange={handlePasswordChange} 
                               required
                               placeholder="Ingrese su contraseña" 
                            ></InputField>
                        </InputGroup2>
                        <InputGroup2>
                            <label htmlFor='tel'>Teléfono</label>
                            <InputField 
                               type="tel"
                               value={phone}
                               onChange={handlePhoneChange} 
                               required
                               placeholder="Ingrese su teléfono" 
                            ></InputField>
                        </InputGroup2>
                    </InputRow>

                    <InputRow>
                        <InputGroup2>
                            <label htmlFor='Direccion'>Dirección</label>
                            <InputField 
                               type="text"
                               value={Address}
                               onChange={handleAddressChange} 
                               required
                               placeholder="Ingrese su dirección" 
                            ></InputField>
                        </InputGroup2>
                        <InputGroup2>
                            <label htmlFor='pago'>Método de pago</label>
                            <StyledSelect value={payment} onChange={handlePaymentChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="Credito">Crédito</option>
                                <option value="Debito">Débito</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Deposito">Depósito</option>
                            </StyledSelect>
                        </InputGroup2>
                    </InputRow>

                    <InputRow>
                        <InputGroup2>
                            <label htmlFor='rfc'>RFC</label>
                            <InputField 
                               type="text"
                               value={RFC}
                               onChange={handleRFCChange} 
                               required
                               placeholder="Ingrese su RFC" 
                            ></InputField>
                        </InputGroup2>
                        <InputGroup2>
                            <label htmlFor='zipCode'>Código Postal</label>
                            <InputField 
                               type="text"
                               value={Zcode}
                               onChange={handleZcodeChange} 
                               required
                               placeholder="Ingrese su código postal" 
                            ></InputField>
                        </InputGroup2>
                    </InputRow>

                    <SubmitButton type="submit">Registrarse</SubmitButton>
                    <LinkContainer>
                    <LinkR onClick={handleLoginClick}>Iniciar Sesión</LinkR>
                    </LinkContainer>
                </form>

                {error && <ErrorMessage>{error}</ErrorMessage>}
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
        height: 43 rem;
        width: 100%;
        max-width: 650px;
        transition: transform 0.3s ease;
        filter: brightness(1.0);

        &:hover {
            transform: none;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
            color: #001F3F;
            font-weight: 600;
        }
    `;

    const InputGroup = styled.div`
        margin-bottom: 15px;

        label {
            font-size: 1.2rem;
            color: #333333;
            margin-bottom: 0.5rem;
            display: block;
        }
    `;

    const InputField = styled.input`
        width: 100%;
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

    const StyledSelect = styled.select`
        width: 100%;
        padding: 12px 15px;
        font-size: 1rem;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        background-color: white;
        appearance: none; /* Elimina el estilo por defecto del navegador */
        cursor: pointer;

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
        border-radius: 8px;
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

    const InputRow = styled.div`
        display: flex;
        gap: 20px; /* Espacio entre los elementos */
        margin-bottom: 10px; /* Espacio inferior */

        label {
            font-size: 1.2rem;
            color: #333333;
            margin-bottom: 0.5rem;
            display: block;
        }
    `;

        // Contenedor para cada input con su label
    const InputGroup2 = styled.div`
        display: flex;
        flex-direction: column; /* Coloca el label encima del input */
        flex: 1; /* Hace que todos los grupos tengan el mismo espacio */
    `;

export default LoginForm;