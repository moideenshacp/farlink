import nodeMailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const EMAIL_SECRET = process.env.EMAIL_SECRET  || "email_secret_key"

const EMAIL_EXPIRATION = "1m"

export class EmailService {
    static async sendVerificationMail(email:string):Promise<void>{
        const verificationToken = jwt.sign({email},EMAIL_SECRET,{expiresIn:EMAIL_EXPIRATION})

        const verificationLink  = `${process.env.FRONT_URL}/verify-email?token=${verificationToken}`

        const transporter= nodeMailer.createTransport({
            service:'Gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from:'"Auth Service" <no-reply@example.com>',
            to:email,
            subject:"Verify your Email",
            html: `
            <h1>Verify Your Email</h1>
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationLink}">${verificationLink}</a>
          `,
        })
    }
}