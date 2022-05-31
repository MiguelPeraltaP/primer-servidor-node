//Obtener una funcion que se exporta del paquete express
const express = require('express');
//Asignar lo que arroje la funcion express a la variable app
const app = express();

//req: expresion que se usa para obtener los datos de la peticion que va a llegar a nuestro servidor
//res: expresion que se usa para enviar los datos que se van a enviar al cliente que solicito la peticion
app.get('/', (req, res) => {
    res.send('Hola mundo');
})

//Servidor escucha en el puerto 3000 (localhost:3000)
app.listen(3000);
