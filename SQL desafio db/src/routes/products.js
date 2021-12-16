import express from 'express'
import upload from '../services/upload.js'
import {io} from '../app.js'
import { authMiddleware } from '../utils.js'
import Container from '../classes/Container.js'
import database from '../config.js'
const router = express.Router()
const productsService = new Container(database,'products')

//---------------GET---------------------------------
router.get('/api/productos', (req,res)=>{
    productsService.getProducts().then(result=>{
        res.send(result);
    })
})

router.get('/api/productos/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    productsService.getProductById(id).then(result=>{
        res.send(result)
    })
})

router.get('/api/productoRandom',(req,res)=>{
    const id = Math.floor(Math.random() * 3) +1
    productsService.getProductById(id).then(result=>{
        res.send(result)
    })
})

//------------------POST---------------------------
router.post('/api/productos', authMiddleware, (req,res)=>{
    let product = req.product
    productsService.registerProduct(product).then(result=>{
        res.send(result);
    })
})

router.post('/',authMiddleware, upload.single('image'),(req,res)=>{
    let file = req.file;
    let product = req.body;
    product.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    productsService.registerProduct(product).then(result=>{
        res.send(result);
        if(result.status==="success"){
            productsService.getProducts().then(result=>{
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
    productsService.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//----------------DELETE---------------------------

router.delete('/api/productos/:id', authMiddleware, (req,res)=>{
    let id= Number(req.params.id);
    productsService.deleteProduct(id).then(result=>{
        res.send(result)
    })
})


export default router