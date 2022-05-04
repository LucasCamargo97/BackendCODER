import { productService } from "../services/services.js"


const getAllProducts = async(req,res)=>{
    let products = await productService.getAll();
    res.send({status:"success",payload:products})
}
const getProductById = async(req,res)=>{
    let product = await productService.getBy({_id:req.params.pid});
    if(!product) return res.status(404).send({status:"error",error:"Product not found"});
    res.send({status:"success",payload:product})
}
const createProduct = async(req,res)=>{
    let {title,description,code,price,stock} = req.body;
    if(!title||!description||!code||!price||!stock) res.status(400).send({status:"error",error:"Incomplete values"})
    let product = {
        title,
        description,
        code,
        price,
        stock,
        thumbnail:req.file.location
    }
    let result = await productService.save(product)
    res.send({status:"success",message:"Product created "})
}


export default {
    getAllProducts,
    createProduct,
    getAllProducts
}