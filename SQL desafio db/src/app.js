import express from 'express'
import {Server} from 'socket.io'
import {engine} from 'express-handlebars'
import cors from 'cors'
import router from './routes/products.js'
import routerChat from './routes/chat.js'
import upload from './services/upload.js'
import Chat from './classes/Messages.js'
import __dirname, {authMiddleware} from './utils.js'
import database from './config.js'

const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})
export const io = new Server(server)
const messages = new Chat()

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
app.use(router)
app.use(routerChat)
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

let chats = await messages.getMessages()



io.on('connection', socket => {
    console.log('Cliente conectado.')
    socket.emit('chat', chats.payload)
    socket.on('chat', async data => {
      messages.saveMessage(data)
      io.emit('chat', chats.payload)
    })
  })

  app.get('/api/chat', (req,res)=>{
    messages.getMessages().then(result=>{
        res.send(result);
    })
  })
  
  app.post('/api/chat', (req,res)=>{
    let body = req.body
    messages.saveMessage(body).then(result=>{
        res.send(result);
    })
  })




