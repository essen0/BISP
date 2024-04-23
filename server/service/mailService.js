const nodemailer = require('nodemailer')


class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:process.env.SMTP_SERVER,
            host: process.env.SMTP_HOST,
            //port: process.env.SMTP_PORT, 
            secure: true,
            requireTLS:true,
            auth: { 
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail (to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта по ' + process.env.API_URL,
            text: '',
            html: 
                `
                <div>
                    <h1>
                        Для активации перейдите по ссыле:
                        <a href="${link}">${link}</a>
                    </h1> 
                </div>
                `
        })
    }
}

module.exports = new MailService()