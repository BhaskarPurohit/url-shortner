import urlSchema from "../models/shorturl.model.js"
export const saveShortUrl = async(shortUrl, longUrl, userId) =>{
    const newUrl = new urlSchema({
        full_url:longUrl,
        short_url:shortUrl
    })

    if(userId){
        newUrl.user_id = userId
    }

    return newUrl.save()
}