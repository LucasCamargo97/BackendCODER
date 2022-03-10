import Purchase from '../dao/models/Purchase.js'
import Product from '../dao/models/Product.js'
import User from '../dao/models/User.js'
import CartService from './cartService.js'
import MailService from './mailService.js'
import TwilioService from './twilioService.js'

const cartService = new CartService()
const mailService = new MailService()
const whatsappService = new TwilioService()

export default class PurchaseService {
  async getPurchases () {
    return await Purchase.find()
  }

  async getPurchaseById (purchaseId) {
    if (!purchaseId) throw new Error('Missing \'purchaseId\' parameter!')

    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) throw new Error('Non-existent purchase.')

    return purchase
  }

  async createPurchase (productsId, userId) {
    if (!productsId || !userId) throw new Error('Missing \'productsId\' or \'userId\' parameter!')

    const user = await User.findById(userId)
    if (!user) throw new Error('User not found.')

    productsId.forEach(async productId => {
      const product = await Product.findById(productId)
      if (!product) throw new Error(`Product ${product.name} not found.`)
    })

    const newPurchase = await Purchase.create({ products: productsId, user: userId })
    const purchase = await newPurchase.populate('products')

    if (purchase) {
      cartService.deleteCart(user.cart)

      const mailBody = `
        <h1>Your order #${purchase._id}</h1>

        <ol>
          ${purchase.products.map(product =>
        `<li><a href="${product.picture}">${product.name}</a> - $${product.price}</li>`
      )}
        </ol>
      `
      mailService.sendMail(`New order by ${user.firstName} ${user.lastName} - ${user.email}`, mailBody)

      const messageBody = `
        Your order *#${purchase._id}*
        ${(purchase.products.map((product, index) => `\n${index + 1}. ${product.name} - $${product.price}`)).join('\n')}
      `

      whatsappService.sendWhatsAppMessage(messageBody)
      whatsappService.sendSMSMessage(`Your order #${purchase._id} has been received and is in progress.`, user.phone)
    }

    return purchase
  }

  async updatePurchaseById (purchaseId, name) {
    if (!purchaseId || !name) throw new Error('Missing or empty \'purchaseId\' or \'name\' purchase.')

    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) throw new Error('Non-existent purchase.')

    const purchaseFound = await Purchase.findOne({ _id: { $ne: purchaseId }, name: { $eq: name } })
    if (purchaseFound) throw new Error('Purchase already exists.')

    const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, { name }, { new: true })
    return updatedPurchase
  }

  async deletePurchaseById (purchaseId) {
    if (!purchaseId) throw new Error('Missing \'purchaseId\' parameter!')

    const purchase = await Purchase.findById(purchaseId)
    if (!purchase) throw new Error('Non-existent purchase.')

    await Purchase.findByIdAndDelete(purchaseId)
  }
}
