import express from 'express'
import {Server} from 'socket.io'
import {engine} from 'express-handlebars'
import cors from 'cors'
import router from './routes/products.js'
import upload from './services/upload.js'
import Contenedor from './classes/Contenedor.js'
import __dirname from './utils.js'
import authMiddleware from './utils.js'

const contenedor = new Contenedor()
const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})
export const io = new Server(server)
io.on('connection', socket => {
    console.log('Se ha conectado un nuevo cliente!')
})

app.engine('handlebars',engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})
app.use(express.static(__dirname+'public'))
app.use(cors())
app.use(router)
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

app.get('/view/products',authMiddleware,(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.payload;
        let prepObj ={
            products : info
        }
        res.render('products',prepObj)
    })
})

  io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let products = await contenedor.getAll();
    socket.emit('deliverProducts',products);

})


