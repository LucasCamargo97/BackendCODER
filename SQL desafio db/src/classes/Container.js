import database from '../config.js'

export default class Container{
    constructor(){
        database.schema.hasTable('products').then(result=>{
            if(!result){
                database.schema.createTable('products',table=>{
                    table.increments()
                    table.string('title').notNullable()
                    table.string('description').notNullable()
                    table.string('code').notNullable()
                    table.string('thumbnail').notNullable()
                    table.float('price').notNullable()
                    table.string('stock').notNullable()
                    table.timestamps(true, true)
                }).then(result=>{
                    console.log('the products table has been created successfully')
                })
            }
        })
        
        }
        async getProducts(){
            try{
                let products = await database.select().table('products')
                return {status:"success", payload:products}
            }catch(error){
                return {status:"error",message:error}
            }
        }
        async getProductById(id){
            try{
                let product = await database.select().table('products').where('id',id).first()
                if(product){
                    return {status:"success",payload:product}
                }else{
                    return {status:"error",message:"product not found"}
                }
            }catch(error){
                return {status:"error",message:error}
            }
        }
        async registerProduct(product){
            try {
                const exists = await database.select().table('products').where('title', product.title).first()
                if (exists) throw new Error('Product already exists.')
                await database.table('products').insert(product)
                return {status:'success', payload:'Product has been created successfully.' }
              } catch (error) {
                return { status:'error', message:error}
              }
            }
            async updateProduct(id, product){
                try {
                  const updated = await database.update(product).table('products').where('id', id)
                  if (!updated) throw new Error('Product update error.')
                  return {status:'success', payload:'Product has been updated successfully.' }
                } catch (error) {
                  return { status:'error', message:error}
                }
              }
            
              async deleteProduct(id){
                try {
                  const deleted = await database.del().table('products').where('id', id)
                  if (!deleted) throw new Error('Product delete error.')
                  return { status:'success', payload:'Product has been deleted successfully.' }
                } catch (error) {
                  return {status:'error', message:error}
                }
              }
            
              async saveMessage (message) {
                try {
                  await database.insert(message).table('chats')
                  return {status: 'success', payload:'Chat has been saved successfully.' }
                } catch (error) {
                  return { status:'error', message:error}
                }
              }
            
              async getMessages () {
                try {
                  const chats = await database.select().table('chats')
                  return { status: 'success', payload: chats }
                } catch (error) {
                  return { status:'error', message:error}
                }
              }
    }

