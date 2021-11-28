import fs from 'fs'

class Contenedor {
  constructor() {
    this.name = 'D:/PROGRAMACION/Backend/GIT/EJS/src/files/products.JSON'
  }
  save(producto) {
    return fs.promises
      .readFile(this.name, "utf-8")
      .then((result) => {
        console.log(`Se leyó el archivo ${this.name} con exito`);
        let id = null;
        let aux = !result ? "" : JSON.parse(result);
        if (!aux) {
          aux = [];
          id = 1;
        } else {
          let ultimoItem = aux[aux.length - 1];
          id = ultimoItem.id + 1;
        }
        const objFound = aux.find((obj) => obj.title === producto.title);
        if (objFound) throw new Error("El objeto ya existe");
        producto.id = id;
        aux.push(producto);
       return fs.promises
          .writeFile(this.name, JSON.stringify(aux,null,2))
          .then(() => {
            console.log("Escritura con exito");
           return `Se asigno el id ${producto.id} al objeto`
          })
          .catch((error) => {
            console.error(`Error en la escritura ${error}`);
          });
      })
      .catch((error) => {
        if (!producto) console.error("falta el parametro producto");
        if (error.message.includes("no such file or directory")) {
          console.error(error.message);
          console.log(`Se creo el el archivo ${this.name}`);
          fs.writeFileSync(this.name, "");
        }
        console.error(`error en la lectura..${error}`);
      });
  }
  getById(id){
      return fs.promises.readFile(this.name, 'utf-8')
      .then(result => {
        if (!id) throw new Error('Falta el parametro id')
        let aux = !result ? "" : JSON.parse(result);
        if (!aux) throw new Error('El documento esta vacio')
        const obj = aux.find((obj) => obj.id === id);
        if (obj) return obj;
        else return console.log('null')
      })
      .catch(error => {
        console.error(error)
      });
  }
  getAll(){
    return fs.promises.readFile(this.name, 'utf-8')
      .then(result => {
        let arr = !result ? "" : JSON.parse(result);
        if (!arr) throw new Error('El documento esta vacio')
        return arr;
      })
      .catch(error => {
        console.error(error)
      });
  }

  updateProduct(id,body){
      return fs.promises.readFile(this.name, 'utf-8')
      .then(result => {
        if (!id) throw new Error('Falta el parametro id')
        let aux = !result ? "" : JSON.parse(result);
        if (!aux) throw new Error('El documento esta vacio')
        const obj = aux.find((obj) => obj.id === id);
        let products = aux.filter(p => p.id !== id)
        let newObj = {
          ...obj,
          title: body.title,
          price: body.price,
          thumbnail: body.thumbnail
        }
        products = [...products,newObj]
        return fs.promises.writeFile(this.name, JSON.stringify(products,null,2))
        .then(()=>({
          status:"Success", message:"Product updated"
        }))
      })
      .catch(error => {
        console.error(error)
      });
  }

  registerProduct(){

  }
  

  deleteById(id){
    return fs.promises.readFile(this.name, 'utf-8')
      .then(result => {
        if (!id) throw new Error('Falta el parametro id')
        let aux = !result ? "" : JSON.parse(result);
        if (!aux) throw new Error('El documento esta vacio')
        const idF = aux.find((obj) => obj.id === id);
        if (!idF) throw new Error (`el ID ${id} no esta en el documento`)
        let arr = aux.filter(obj => obj.id !== id)
        arr.length === 0
          ? (arr = '')
          : (arr = JSON.stringify(arr,null,2))

          fs.writeFile(this.name, arr, error => {
          if (error) throw new Error (`ERROR${error}`)
          console.log(`El objeto con la ID '${id}' fue removido`)
          })
      })
      .catch(error => {
        console.error(error)
      });
  }
  deleteAll(){
    fs.writeFile(this.name, '', error => {
        try {
            if (error) throw new Error(`ERROR${error}`)
            console.log(
                `Todos los objetos fueron removidos del documento ${this.name}!`
            )
        } catch (error) {
            console.error(error)
        }
    })
  }
}

export default Contenedor;
