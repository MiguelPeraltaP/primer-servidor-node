//Obtener una funcion que se exporta del paquete express
const express = require('express');
//Dependencia para recibir imagenes
const multer = require('multer');
//Dependencia para modificar imagenes
const sharp = require('sharp');
//Modulo para interactuar con el file system
const fs = require('fs');

//Guarda la imagen en el directorio uploads
//const upload = multer({dest: './uploads'});
//Guarda la imagen en memoria
const sotrageStrategy = multer.memoryStorage()
const upload = multer({storage: sotrageStrategy})

//Asignar lo que arroje la funcion express a la variable app
const app = express()

//Returns middleware that only parses json and only looks at requests where
//the Content-Type header matches the type option
app.use(express.json())

/*
Get: obtener datos del navegador
req: expresion que se usa para obtener los datos de la peticion que va a llegar a nuestro servidor
res: expresion que se usa para enviar los datos que se van a enviar al cliente que solicito la peticion
*/
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

/*
Post: enviar datos al servidor
*/
app.post('/imagen', upload.single('imagen'), async(req, res) => {
    //Obtener el archivo que se va a enviar
    //const body = req.body
    //console.log(body)

    const imagen = req.file
    //console.log(imagen)

    //Obtener el buffer de la imagen
    const processedImage = sharp(imagen.buffer)
    //Remasterizacion de la imagen
    const rezisedImage = processedImage.resize(800, 200, {
        fit: "contain",
        background: "#FFF"
    })
    //Buffer de datos de nuestra imagen remasterizada
    const finalImage = await rezisedImage.toBuffer()

    fs.writeFileSync('images/glob.jpg', finalImage)

    console.log(rezisedImage)

    res.send({resizedImage: finalImage})
})

//Servidor escucha en el puerto 3000 (localhost:3000)
app.listen(3000)
