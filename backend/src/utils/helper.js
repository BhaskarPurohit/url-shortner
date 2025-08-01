import { nanoid } from "nanoid"

 const generateNanoId = (length) => {
    return nanoid(length)
}

export default generateNanoId