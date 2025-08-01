import express from 'express'
import { nanoid } from 'nanoid'
import dotenv from "dotenv"
import connectDB from './src/config/mongoose.config.js'
import urlSchema from "./src/models/shorturl.model.js"
import shortUrl from './src/models/shorturl.model.js'
const app = express()
dotenv.config({ path: './.env'})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()


app.get("/",(req,res)=>{
    res.send("welcome to URL shortner")
})



app.post('/api/create', (req, res)=>{
    const { url } = req.body
    if(!url){
        return res.status(400).json({
            error: 'URL is required'
        })
    }

    const shortUrl = nanoid(7)
    const newUrl = new urlSchema({
        full_url:url,
        short_url:shortUrl
    })

    newUrl.save()
    res.send(nanoid(7))
})


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