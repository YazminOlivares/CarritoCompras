
export async function getUserShCart(userId) {
    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: 
            `query ShoppingCart($userId: ID!) {
                shoppingCart(userId: $userId) {
                    _id
                    productos {
                        product {
                            _id
                            name
                            price
                            images
                            facturapi
                        }
                        quantity
                    }
                }
            }`,
            variables: {
                "userId": userId
            }
        })
        });

        const result = await resp.json();
        return result.data.shoppingCart;

    }catch(e) {
        console.log("Error al extraer los productos de carrito", e);
        return e;
    }
}

export async function payShCart(cartId) {
    
    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: 
                `mutation UpdateShCart($cartId: ID!, $input: UpdateCartInput!) {
                    updateShCart(cartId: $cartId, input: $input) {
                        _id
                    }
                }`,
                variables: {
                    "cartId": cartId,
                    "input": {
                        "status": "Inactivo"
                    }
                }
            })
        });

        const result = await resp.json();
        console.log(result);
        return result.data;

    }catch(e) {
        console.log("Error al paagr el carrito.", e);
        return e;
    }

}

export async function createNewShCart(userId) {
    
    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: 
                `mutation CreateShoppingCart($userId: ID!) {
                    createShoppingCart(userId: $userId) {
                        _id
                    }
                }`,
                variables: {
                    "userId": userId
                }
            })
        });

        const result = await resp.json();
        console.log(result);
        return result.data;

    }catch(e) {
        console.log("Error al añadir producto del carrito.", e);
        return e;
    }

}