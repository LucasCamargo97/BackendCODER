import express from 'express'
import cors from 'cors'
const app = express()
import Contenedor from './classes/Contenedor.js'
const contenedor = new Contenedor()
app.listen(8080,()=>{
    console.log("server listening on port 8080")
})

import router from './routes/products.js'

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cors())
app.get('/view/products',(req,res)=>{
    contenedor.getAll().then(data=>{let info = data; let obj = {products:info}; res.render('products.ejs',obj)})
})
app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Error en el servidor')
})

app.use(router)

