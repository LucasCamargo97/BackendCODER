import express from 'express'
import {Server} from 'socket.io'
import {engine} from 'express-handlebars'
import cors from 'cors'
import router from './routes/products.js'
import upload from './services/upload.js'
import Messages from './classes/Messages.js'
import __dirname, {authMiddleware} from './utils.js'
import mariadb from './config.js'

const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})
export const io = new Server(server)
const messages = new Messages()

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

io.on('connection', socket => {
    console.log('Cliente conectado.')
    messages.getMessages().then(result => {
      if (result.status === 'success') {
        io.emit('chats', result.payload)
      }
    })
    socket.on('chats', data => {
      messages.saveMessage(data)
        .then(result => console.log(result))
        .then(() => {
          messages.getMessages().then(result => {
            if (result.status === 'success') {
              io.emit('chats', result.payload)
            }
          })
        })
    })
  })






