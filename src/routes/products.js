const express = require('express')
const router = express.Router()
const Contenedor = require('../classes/Contenedor')
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






module.exports = router