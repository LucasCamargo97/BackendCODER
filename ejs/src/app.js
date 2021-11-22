const express = require('express')
const upload = require('./services/upload')
const cors = require('cors')
const Contenedor = require('./classes/Contenedor');
const app = express()

app.listen(8080,()=>{
    console.log("server listening on port 8080")
})

const productsRouter = require('./routes/products')


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/imagenes', express.static(__dirname+'public'))
app.use(cors())

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Error en el servidor')
})

app.use(productsRouter)

