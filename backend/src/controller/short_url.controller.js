import shortUrl from "../models/shorturl.model.js"
import {createShortUrlService} from "../services/short_url.service.js"


export const createShortUrl = async(req,res) =>{
   try{
    const {url} = req.body
    const savedUrl = await createShortUrlService(url)

    const domain = process.env.BASE_URL || 'http://localhost:3000'
    res.status(201).json({
        message: "Short URL created",
        short_url: `${domain}/${savedUrl.short_url}`
    })
   }catch(err){
    console.log("Error creating short url: ", err);
    res.status(500).json({ error: "Failed to create short URL" })
    
   }
}