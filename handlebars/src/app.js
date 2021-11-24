import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products'
const app = express()

app.listen(8080,()=>{
    console.log("server listening on port 8080")
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
app.use('/imagenes', express.static(__dirname+'public'))
app.use(cors())
app.use(productsRouter)

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Error en el servidor')
})



