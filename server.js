const express = require('express');
const Manager = require('./classes/Contenedor');
const app = express();
const PORT = process.env.PORT||8080;

const manager = new Manager('./files/products.JSON');

const server = app.listen(PORT, ()=>{
    console.log("Servidor escuchando en: "+PORT)
})

app.get('/productos', (req,res)=>{
    manager.getAll().then(result=>{
        res.send(result);
    })
})

app.get('/productoRandom',(req,res)=>{
    const id = Math.floor(Math.random() * 3) +1
    manager.getById(id).then(result=>{
        res.send(result)
    })
})