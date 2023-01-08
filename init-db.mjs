import dotenv from 'dotenv';

import { dbConnection } from "./data/dbConnection.mjs";
import { Add } from "./data/models/add.mjs";

dotenv.config();

const initial_adds = {
    "anuncios": [
        {
            "nombre": "Bicicleta",
            "venta": 'se vende',
            "precio": 230.15,
            "foto": "bici.jpg",
            "tags": [ "lifestyle", "motor"]
        },
        {
            "nombre": "iPhone 3GS",
            "venta": 'se busca',
            "precio": 50.00,
            "foto": "iphone.png",
            "tags": [ "lifestyle", "mobile"]
        }
    ]
};

dbConnection();

/**
 * Borrar la colección inicial
 */
await Add.deleteMany({});

/**
 * Inicializar la colección
 */
initial_adds.anuncios.forEach(add => {
    const post = new Add({
        name: add.nombre,
        status: add.venta,
        price: add.precio,
        image: add.foto,
        tags: add.tags
    });
    post.save(function (err) {
        if (err) console.log(err);
    });    
    console.log(add);
});
    