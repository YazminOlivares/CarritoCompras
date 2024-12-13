export async function getAllUsers() {
    try {
        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        users {
                            _id
                            email
                            password
                            nombreCompleto
                            tipoUsuario
                        }
                    }
                `
            })
        });

        const result = await resp.json();

        // Manejar errores si la consulta falla
        if (result.errors) {
            console.error("Errores en la consulta GraphQL:", result.errors);
            throw new Error("Error al obtener los usuarios");
        }

        return result.data.users;
    } catch (e) {
        console.log("Error al obtener la lista de usuarios:", e);
        return e;
    }
}

export async function getUserById(userId) {
    try {
        const resp = await fetch('https://proyecto-unidad-2-servicios-web-1.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query GetUser($id: ID!) {
                        user(_id: $id) {
                            _id
                            nombreCompleto
                            email
                            password
                            RFC
                            direccion
                            zipCode
                            telefono
                            fechaRegistro
                            tipoUsuario
                            metodoPagoPreferido
                            facturapi
                        }
                    }
                `,
                variables: {
                    id: userId
                }
            })
        });

        const result = await resp.json();

        // Manejar errores si la consulta falla
        if (result.errors) {
            console.error("Errores en la consulta GraphQL:", result.errors);
            throw new Error("Error al obtener el usuario");
        }

        return result.data.user;
    } catch (e) {
        console.log("Error al obtener el usuario:", e);
        return e;
    }
}