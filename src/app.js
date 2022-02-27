import express from 'express'
import {Server} from 'socket.io'
import {engine} from 'express-handlebars'
import cors from 'cors'
import productsRouter from './routes/products.js'
import cartRouter from './routes/carts.js'
import upload from './services/upload.js'
import Contenedor from './contenedores/ContenedorArchivo.js'
import {__dirname, authMiddleware} from './utils.js'
import {PORT} from './config.js'

const contenedor = new Contenedor()
const app = express()
const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})
export const io = new Server(server)
io.on('connection', socket => {
    console.log('Se ha conectado un nuevo cliente!')
})

const admin = true

app.engine('handlebars',engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    req.auth = admin
    next();
})
app.use(express.static(__dirname+'/public'))
app.use(cors())
app.use('/api/products', productsRouter)
app.use('/api/cart',cartRouter)
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

app.get('/view/products',(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.payload;
        let prepObj ={
            products : info
        }
        res.render('products',prepObj)
    })
})

const chat = []

  io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let products = await contenedor.getAll();
    socket.emit('deliverProducts',products);

    socket.emit('chat', chat)
    socket.on('chat', data => {
    chat.push({ email: data.email, date: data.date, msg: data.msg })
    io.emit('chat', chat)
})

})






