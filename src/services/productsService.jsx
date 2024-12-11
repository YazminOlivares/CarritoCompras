import { useEffect, useState } from 'react';

export async function getProducts() {

    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: 
            `query Products {
                products {
                    _id
                    brand {
                    _id
                    }
                    cDate
                    category
                    desc
                    facturapi
                    images
                    name
                    price
                    quantity
                }
            }` })
        });

        const result = await resp.json();
        return result.data;

    }catch(e) {
        console.log("Error al extraer datos", e);
        return e;
    }

}

export async function deleteOneProduct(userId, productId) {
    
    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: 
            `mutation {
                removeItemFromCart(userId: ${userId}, productId: ${productId}) {
                    _id
                }
            }` 
        })
    });

        const result = await resp.json();
        console.log(result.data);
        return result.data;

    }catch(e) {
        console.log("Error al borrar producto del carrito.", e);
        return e;
    }

}

export async function addOneProduct(userId, input) {
    console.log(input);
    try {

        const resp = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: 
                `mutation AddItemToCart($userId: ID!, $input: [AddToCartInput!]!) {
                    addItemToCart(userId: $userId, input: $input2) {
                        _id
                    }
                }`,
                variables: {
                    "userId": userId,
                    "input": input
                }
            })
        });

        const result = await resp.json();
        console.log(result.data);
        return result.data;

    }catch(e) {
        console.log("Error al añadir producto del carrito.", e);
        return e;
    }

}