import express from 'express'
import {engine} from 'express-handlebars'
import cors from 'cors'
import productsRouter from './routes/products.js'
import upload from './services/upload.js'
import Contenedor from './classes/Contenedor.js'

const contenedor = new Contenedor()
const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})

app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})
app.use(express.static('public'))
app.use(cors())
app.use(productsRouter)
app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Error en el servidor')
})

app.post('/api/uploadfile',upload.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    console.log(files);
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió archivo"})
    }
    res.send(files);
})

app.get('/view/products', (req, res) => {
    contenedor.getAll().then(result => {
      const products = result
      const object = { products: products }
      if (result) res.render('products', object)
      // else if (result.status === 'error' && result.message === 'The document is empty!') res.render('noproducts', { noproducts: 'No hay productos.' })
      else res.status(500).send(result)
    })
  })


