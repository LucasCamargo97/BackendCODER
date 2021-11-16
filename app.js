const express = require('express')
const upload = require('./services/upload')
const cors = require('cors')
const Contenedor = require('./classes/Contenedor');
const app = express()

const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})

const manager = new Manager('./files/products.JSON');
const productsRouter = require('./routes/products')


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/imagenes', express.static(__dirname+'public'))
app.use(cors())

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Error en el servidor')
})

app.use('/api/products',productsRouter)


















//const Contenedor = require ('./classes/Contenedor');

//const contenedor = new Contenedor('./files/products.JSON');

//const obj = {title:'pera', price:56,thumbnail: 'https://us.123rf.com/450wm/atoss/atoss1801/atoss180100100/94715991-pera-con-hoja.jpg?ver=6'}
//const obj = {title:'manzana', price:67,thumbnail: 'https://st.depositphotos.com/1000955/1261/i/600/depositphotos_12616481-stock-photo-fresh-red-apple.jpg'}
//const obj = {title:'banana', price:79,thumbnail: 'https://media.istockphoto.com/photos/banana-picture-id1184345169?k=20&m=1184345169&s=612x612&w=0&h=EKwCw7Zx20N3l8G_rQI6KcitWTQ5ahkgmEBr2QA1FMk='}

//contenedor.save(obj);
//contenedor.getById(1);
//contenedor.deleteById(1);
//contenedor.getAll();
//contenedor.deleteAll();