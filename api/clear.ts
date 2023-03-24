import { VercelRequest, VercelResponse } from "@vercel/node";
import { dbclient } from "./dbclient";

module.exports = async (request: VercelRequest, response: VercelResponse) => {
    await dbclient.db('shorturl').collection('links').deleteMany({});
    return response.json({
        msg: "URLs are already deleted."
    });
}