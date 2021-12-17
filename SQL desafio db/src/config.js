import knex from 'knex'
import __dirname from './utils.js'

const database = knex({
    client:'sqlite3',
    connection:{filename:__dirname+'/db/Eccomerce.sqlite'}
})

// export const mariadb = knex({
//     client: "mysql",
//     version: "5.5.53",
//     connection: {
//       host: "127.0.0.1",
//       port: 3306,
//       user: "root",
//       password: "contraeñaMuySegura",
//       database: "mariadb"
//     },
//     pool: { min: 0, max: 10 }
//   });

export default database