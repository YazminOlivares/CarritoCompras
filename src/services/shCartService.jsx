
export async function getUserShCart(userId) {
    try {

        const resp = await fetch('https://proyecto-unidad-2-servicios-web.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: 
            `query ShoppingCart($userId: ID!) {
                shoppingCart(userId: $userId) {
                    productos {
                    product {
                        _id
                        name
                        price
                        images
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
        return result.data.shoppingCart.productos;

    }catch(e) {
        console.log("Error al extraer los productos de carrito", e);
        return e;
    }
}