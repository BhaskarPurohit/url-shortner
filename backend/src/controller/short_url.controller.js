import createShortUrlService from "../services/short_url.service.js"


export const createShortUrl = async(req,res) =>{
    try{
        const {url} = req.body
        const shortUrl = await createShortUrlService(url)
        res.status(201).json(shortUrl)
    }catch(err){
        console.log("Error creating short URL: ", err);
        res.status(500).json({ error: "Failed to create short URL"})
        
    }
}