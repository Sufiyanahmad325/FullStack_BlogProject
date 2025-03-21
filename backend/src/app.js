import express, { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/user.routes.js'


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())


app.get("/" ,(req,res)=>{
    res.send("hello sir ")
})


app.use('/api/v1/users',router)



export default app