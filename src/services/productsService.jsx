
export async function getProducts() {

    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
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
                        logo
                        name
                    }
                    cDate
                    category
                    desc
                    facturapi
                    images
                    name
                    price
                    quantity
                    facturapi
                }
            }` })
        });

        const result = await resp.json();
        console.log(result)
        return result.data;

    }catch(e) {
        console.log("Error al extraer datos", e);
        return e;
    }

}

export async function deleteOneProduct(cartId, productId) {
    
    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: 
            `mutation RemoveOneItemFromCart($cartId: ID!, $productId: ID!) {
                removeOneItemFromCart(cartId: $cartId, productId: $productId) {
                    _id
                }
            }`,
            variables: {
                "cartId": cartId,
                "productId": productId
            } 
        })
    });

        const result = await resp.json();
        return result.data;

    }catch(e) {
        console.log("Error al borrar producto del carrito.", e);
        return e;
    }

}

export async function addOneProduct(cartId, input) {

    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: 
                `mutation AddItemToCart($cartId: ID!, $input: [AddToCartInput!]!) {
                    addItemToCart(cartId: $cartId, input: $input) {
                        _id
                    }
                }`,
                variables: {
                    "cartId": cartId,
                    "input": [{
                        
                        "productId": input[0].productId,
                        "quantity": 1
                          
                    }]
                }
            })
        });

        const result = await resp.json();
        return result.data;

    }catch(e) {
        console.log("Error al añadir producto del carrito.", e);
        return e;
    }

}