import express from 'express'
import dotenv from "dotenv"
import connectDB from './src/config/mongoose.config.js'
import urlSchema from "./src/models/shorturl.model.js"
import short_url from "./src/routes/short_url.route.js"
const app = express()
dotenv.config({ path: './.env'})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()


app.get("/",(req,res)=>{
    res.send("welcome to URL shortner")
})



app.use('/', short_url)


app.get('/:id', async(req,res)=>{
    const {id} = req.params
    const url = await urlSchema.findOne({ short_url: id})
    if(url){
        res.redirect(url.full_url)
    }else{
        res.status(404).send("URL Not Found!")
    }
})

app.listen(3000, ()=>{
    console.log('Server is running on PORT 3000')
})