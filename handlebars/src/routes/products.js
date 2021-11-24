import express from 'express'
const router = express.Router()
import Contenedor from '../classes/Contenedor'
const contenedor = new Contenedor()

//GET
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

//POST
router.post('/api/productos', (req,res)=>{
    let body = req.body
    console.log(body)
    contenedor.save(body).then(result=>{
        res.send(result);
    })
})

router.post('/',upload.single('image'),(req,res)=>{
    let file = req.file;
    let body = req.body;
    body.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/imagenes/'+file.filename;
    contenedor.save(body).then(result=>{
        res.send(result);
    })
})

//PUT
router.put('/api/productos/:id',(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.id);
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETE

router.delete('/api/productos/:id',(req,res)=>{
    let id= parseInt(req.params.id);
    contenedor.deleteById(id).then(result=>{
        res.send(result)
    })
})






export default router