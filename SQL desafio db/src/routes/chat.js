import express from 'express'
import {io} from '../app.js'
import { authMiddleware } from '../utils.js'
import Messages from '../classes/Messages.js'
import database from '../config.js'
const routerChat = express.Router()
const chat = new Messages(database,'chat')


routerChat.get('/api/chat', (req,res)=>{
    chat.getMessages().then(result=>{
        res.send(result);
    })
})

routerChat.post('/api/chat', (req,res)=>{
    let body = req.body
    chat.saveMessage(body).then(result=>{
        res.send(result);
    })
})

export default routerChat


