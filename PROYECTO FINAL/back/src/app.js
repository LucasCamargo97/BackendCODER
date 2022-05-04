import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import initializePassport from './config/passport.js';
import sessionRouter from './routes/session.routes.js';
import productsRouter from './routes/products.routes.js'
import { Iot } from 'aws-sdk';
import {Server} from 'socket.io'

const app  = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
initializePassport();
app.use(passport.initialize());

app.use(express.static(__dirname+'/public'))
app.use('/api/products',productsRouter)
app.use('/api/session',sessionsRouter)
app.use('/api/carts',cartsRouter)

let socketClients = {}
io.on('connection',socket=>{
    if(typeof socket.handshake.query.name!=='undefined'){
        if(!Objetct.values(socketClients).some(client=>client.id===socket.handshake.query.id)){
            let user = {
                name:socket.handshake.query.name,
                id:socket.handshake.query.id,
                thumbnail:socket.handshake.query.thubnail
            }
            socketClients[`${socket.id}`]=user;
            io.emit('users',socketClients)
        }
        else{
            Object.keys(socketClients).forEach(key=>{
                if(socketClients[key].id===socket.handshake.query.id){
                    delete socketClients[key]
                    let user = {
                        name:socket.handshake.query.name,
                        id:socket.handshake.query.id,
                        thumbnail:socket.handshake.query.thubnail
                    }
                    socketClients[`${socket.id}`]=user;
                }
                io.emit('users',socketClients)
            })
        }
    }
    socket.on('message',(data)=>{
        console.log(data);
    })
    socket.on('disconnect',()=>{
        delete socketClients[`${socket.id}`]
    })
})