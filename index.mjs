import express from 'express';
import dotenv from 'dotenv';
import { body, query } from 'express-validator';

import { getAdds, createAdd, getTags } from "./controllers/adds.mjs";
import { dbConnection } from "./data/dbConnection.mjs";

const app = express();
app.use(express.json());
dotenv.config();

app.listen(4000, ()=>{
    console.log("Server arrancado");
});

dbConnection();

// Endpoint para devolver los anuncios
app.get("/adds",         
        query('start').optional().isInt().withMessage('El parámetro start debe ser un entero'),
        query('limit').optional().isInt().withMessage('El parámetro limit debe ser un entero'),
        query('sort').optional().isString().isIn('name, status, price, image, tags').withMessage('El parámetro sort debe ser un texto: name, status, price, image, tags'),
        (req, res)=>{
    getAdds(req, res);
});

// Endpoint para devolver las tags
app.get("/tags",(req, res)=>{
    getTags(req, res);
});

// Endpoint para crear anuncio
app.post("/adds", 
         body('name').exists().withMessage('El nombre es obligatorio'), 
         body('status').exists().withMessage('El estado es obligatorio')
                       .isString().withMessage('El estado debe ser una cadena de texto')
                       .isIn(['se vende', 'se busca']).withMessage("Solo 'se vende' o 'se busca' es un estado válido"),
         body('price').exists().withMessage('El precio es obligatorio')
                      .isFloat({ gt: 0.0 }).withMessage('El precio tiene que ser un número mayor que 0'),
         body('tags.*').isString().isIn(['work', 'lifestyle', 'motor', 'mobile']).withMessage("Solo 'work', 'lifestyle', 'motor' o 'mobile' son etiquetas válidas"),
         (req, res) => {
    createAdd(req, res);
});

