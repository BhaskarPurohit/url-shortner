import  generateNanoId from "../utils/helper.js"
import urlSchema from "../models/shorturl.model.js"

 const createShortUrlService = async(url)=>{
    
    const shorturl = generateNanoId(7)
    const newUrl = new urlSchema({
        full_url:url,
        short_url:shorturl
    })

    const savedUrl = await newUrl.save()
    return savedUrl
}

export default createShortUrlService