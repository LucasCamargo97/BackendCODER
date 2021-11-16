const express = require('express')
const router = express.Router()
const Contenedor = require('../classes/Contenedor')
const contenedor = new Contenedor()
const upload = require('../services/upload')

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
router.get('/api/productos', (req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

//PUT
router.put('/:id',(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETE

router.delete('/:id',(req,res)=>{
    let id= parseInt(req.params.pid);
    contenedor.deleteById(id).then(result=>{
        res.send(result)
    })
})






module.exports = router