import shortUrl from "../models/shorturl.model.js"
import {createShortUrlWithUser, createShortUrlWithoutUser} from "../services/short_url.service.js"


export const createShortUrl = async(req,res) =>{
    const {url} = req.body
    const shortUrl = await createShortUrlWithoutUser(url)
    res.send(process.env.APP_URL + shortUrl)
}

export const redirectFromShortUrl = async(req,res)=>{
    const {id} = req.params
    const url = await findUrlFromShortUrl(id)
    res.redirect(url.fullUrl)
}