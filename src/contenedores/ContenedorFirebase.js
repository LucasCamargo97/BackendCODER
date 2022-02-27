import admin from 'firebase-admin'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const serviceAccount = require('../../src/daos/db/ecommerce-77e9b-firebase-adminsdk-uxkh6-fc967f90dd.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.proyect_id}.firebaseio.com`
})

export default class FirebaseContainer {
  constructor () {
    this.db = admin.firestore()
  }
}