import { VercelRequest, VercelResponse } from "@vercel/node";
import { dbclient } from "./dbclient";

module.exports = async (request: VercelRequest, response: VercelResponse) => {
    const { slug } = request.query;
    const result = await dbclient.db('shorturl').collection('links').findOne({ slug });
    if (result) {
        return response.redirect(result.url);
    }
    else {
        return response.status(400).json({ msg: 'undefined slug' });
    }
}