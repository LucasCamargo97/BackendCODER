import fs from 'fs'
import __dirname from '../utils.js'
const productURL = __dirname+'/files/products.json'

class Contenedor {
  async save(producto) {
    try {
      if (Object.keys(producto).length === 0) throw new Error('falta el parametro del producto o esta vacio')
      const result = await fs.promises
        .readFile(productURL, "utf-8");
      console.log(`Se leyó el archivo ${productURL} con exito`);
      let id = null;
      let aux = !result ? "" : JSON.parse(result);
      const hasProduct = aux.find(e => e.title === producto.title)
      if (hasProduct) throw new Error('El producto ya existe con el mismo nombre.')
      if (!aux) {
        aux = [];
        id = 1;
      } else {
        let ultimoItem = aux[aux.length - 1];
        id = ultimoItem.id + 1;
      }
      const objFound = aux.find((obj) => obj.title === producto.title);
      if (objFound)
        throw new Error("El objeto ya existe");
      producto.id = id;
      producto.timestamp = Date.now()
      aux.push(producto);
      try {
        await fs.promises
          .writeFile(productURL, JSON.stringify(aux, null, 2));
        console.log("Escritura con exito");
        return {status:"success", message:`Se asigno el id ${producto.id} al objeto`};
      } catch (error) {
        console.error(`Error en la escritura ${error}`);
      }
    } catch (error_1) {
      if (!producto)
        console.error("falta el parametro producto");
      if (error_1.message.includes("no such file or directory")) {
        console.error(error_1.message);
        console.log(`Se creo el el archivo ${productURL}`);
        fs.writeFileSync(productURL, "");
      }
      console.error(`error en la lectura..${error_1}`);
    }
  }
  async getById(id){
      try {
      const result = await fs.promises.readFile(productURL, 'utf-8');
      if (!id)
        throw new Error('Falta el parametro id');
      let aux = !result ? "" : JSON.parse(result);
      if (!aux)
        throw new Error('El documento esta vacio');
      const obj = aux.find((obj_1) => obj_1.id === id);
      if (obj)
        return obj;
      else
        return console.log('null');
    } catch (error) {
      console.error(error);
    }
  }
  async getAll(){
    try{
      let result = await fs.promises.readFile(productURL,'utf-8');
      let products = JSON.parse(result);
      return {status:"success",payload:products}
  }catch{
      return {status:"error",message:"Error al obtener los productos. Intente más tarde"}
  }
}

  async updateProduct(id,body){
      try {
      const result = await fs.promises.readFile(productURL, 'utf-8');
      if (!id)
        throw new Error('Falta el parametro id');
      let aux = !result ? "" : JSON.parse(result);
      if (!aux)
        throw new Error('El documento esta vacio');
      const obj = aux.find((obj_1) => obj_1.id === id);
      if (!obj) throw new Error('Producto no encontrado')
      let products = aux.filter(p => p.id !== id);
      let newObj = {
        ...obj,
        title: body.title,
        description: body.description,
        code: body.code,
        timestamp: body.timestamp,
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        thumbnail: body.thumbnail
      };
      products = [...products, newObj];
      await fs.promises.writeFile(productURL, JSON.stringify(products, null, 2));
      return ({
        status: "Success", message: "Product updated"
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  async deleteById (id) {
    try {
      if (!id) throw new Error('Falta el parametro ID')
      const productsFile = await fs.promises.readFile(productURL, 'utf-8')
      const products = productsFile ? JSON.parse(productsFile) : []

      const product = products.find(e => e.id === id)
      if (!product) throw new Error('Producto no encontrado')

      let newProducts = products.filter(e => e.id !== id)
      if (newProducts.length === 0) newProducts = ''
      else newProducts = JSON.stringify(newProducts)

      await fs.promises.writeFile(productURL, newProducts)
      return { status: 'success', message: 'Producto eliminado satisfactoriamente.' }
    } catch (err) {
      console.log(`Save file error: ${err.message}`)
      return { status: 'error', message: 'Error al eliminar el producto.' }
    }
  }

  deleteAll(){
    fs.writeFile(productURL, '', error => {
        try {
            if (error) throw new Error(`ERROR${error}`)
            console.log(
                `Todos los objetos fueron removidos del documento ${productURL}!`
            )
        } catch (error) {
            console.error(error)
        }
    })
  }
}

export default Contenedor;
