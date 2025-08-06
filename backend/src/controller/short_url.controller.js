import shortUrl from "../models/shorturl.model.js"
import {createShortUrlWithUser, createShortUrlWithoutUser} from "../services/short_url.service.js"


export const createShortUrl = async(req,res) =>{
    const {url} = req.body
    const savedUrl = await createShortUrlWithoutUser(url)
    const baseUrl = process.env.APP_URL || 'http://localhost:3000'
    res.status(201).json({
        message:"Short URL created",
        short_url: `${baseUrl}/${savedUrl.short_url}`
    })
}

export const redirectFromShortUrl = async(req,res)=>{
    const {id} = req.params
    const url = await findUrlFromShortUrl(id)
    res.redirect(url.fullUrl)
}