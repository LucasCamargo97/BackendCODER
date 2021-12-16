import database from '../config.js'

export default class Chat{
    constructor(){
        database.schema.hasTable('chat').then(result=>{
            if(!result){
                database.schema.createTable('chat',table=>{
                    table.increments()
                    table.string('email').notNullable()
                    table.string('message').notNullable()
                    table.timestamps(true, true)
                }).then(result=>{
                    console.log('the chat table has been created successfully')
                })
            }
            
        })

        
        
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