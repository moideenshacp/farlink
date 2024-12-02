import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import proxy from 'express-http-proxy'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static('public'));
app.use(morgan('tiny'))
app.use(cors({
    origin:process.env.FRONT_URL,
    credentials:true
},))

app.use('/auth-service',proxy(`${process.env.AUTH_SERVICE_URL}`))

const port = process.env.SERVER_PORT || 4000

app.listen(port,()=>{
    console.log(`API GATEWAY RUNNING ON ${port}`);
    
})