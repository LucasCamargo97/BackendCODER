import twilio from 'twilio'
import { TWILIO } from '../config/config.js'
import loggerHandler from '../middlewares/loggerHandler.js'

const logger = loggerHandler()

export default class TwilioService {
  constructor () {
    this.client = twilio(TWILIO.CLIENT_SID, TWILIO.AUTH_TOKEN)
  }

  async sendWhatsAppMessage (message) {
    try {
      await this.client.messages.create({
        from: `whatsapp:${TWILIO.SANDBOX_WHATSAPP_NUMBER}`,
        to: `whatsapp:${TWILIO.PERSONAL_NUMBER}`,
        body: message
      })
    } catch (err) {
      logger.error(err.message)
    }
  }

  async sendSMSMessage (message, userPhone) {
    console.log(TWILIO.PHONE_NUMBER, userPhone, message)
    try {
      await this.client.messages.create({
        from: `${TWILIO.PHONE_NUMBER}`,
        to: userPhone,
        body: message
      })
    } catch (err) {
      logger.error(err.message)
    }
  }
}
