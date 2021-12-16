import express from 'express'
import upload from '../services/upload.js'
import {io} from '../app.js'
import { authMiddleware } from '../utils.js'
const router = express.Router()
import Contenedor from '../classes/Contenedor.js'
const contenedor = new Contenedor()

//---------------GET---------------------------------
router.get('/api/productos', (req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/api/productos/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    contenedor.getById(id).then(result=>{
        res.send(result)
    })
})

router.get('/api/productoRandom',(req,res)=>{
    const id = Math.floor(Math.random() * 3) +1
    contenedor.getById(id).then(result=>{
        res.send(result)
    })
})

//------------------POST---------------------------
router.post('/api/productos', authMiddleware, (req,res)=>{
    let body = req.body
    console.log(body)
    contenedor.save(body).then(result=>{
        res.send(result);
    })
})

router.post('/',authMiddleware, upload.single('image'),(req,res)=>{
    let file = req.file;
    let product = req.body;
    product.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    contenedor.save(product).then(result=>{
        res.send(result);
        if(result.status==="success"){
            contenedor.getAll().then(result=>{
                console.log(result);
                io.emit('deliverProducts',result);
            })
        }
    })
})


//----------------PUT-------------------------------
router.put('/api/productos/:id',authMiddleware, (req,res)=>{
    let body = req.body;
    let id = Number(req.params.id);
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//----------------DELETE---------------------------

router.delete('/api/productos/:id', authMiddleware, (req,res)=>{
    let id= Number(req.params.id);
    contenedor.deleteById(id).then(result=>{
        res.send(result)
    })
})


export default router