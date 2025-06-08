import express from 'express'
import { nanoid } from 'nanoid'
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/api/create',(req,res)=>{
    //nano id used to create unique id used to create random string that will be unique for shortened URL
    const {url} = req.body
    res.send(nanoid(7))
})

app.listen(3000, ()=>{
    console.log('server running on port 3000');
    
})