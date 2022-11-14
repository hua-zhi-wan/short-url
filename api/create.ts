import { VercelRequest, VercelResponse } from '@vercel/node';
import { nanoid } from 'nanoid';

import { dbclient } from './dbclient';
import { Timestamp } from 'mongodb';

module.exports = async (request: VercelRequest, response: VercelResponse) => {
    const { url, slug } = request.body;
    const db = dbclient.db('shorturl').collection('links');

    if (!/^https?\:\/\//.test(url)) {
        return response.status(400).json({ msg: "Illegal URL." });
    }

    if (slug === '') {
        const record = await db.findOne({ url, selected: true });
        if (!record) {
            const slug = nanoid(8);
            await db.insertOne({
                slug, url,
                selected: false,
            });
            return response.json({
                msg: "Generate random slug URL successfully.",
                slug: slug,
            });
        }
        else {
            return response.json({
                msg: "Slug already exists.",
                slug: record.slug,
            });
        }
    }
    else {
        if (!/^[a-zA-Z0-9\-]{4,10}$/.test(slug)) {
            return response.status(400).json({ msg: "Illegal Slug." });
        }
        const record = await db.findOne({ slug });
        if (!record) {
            await db.insertOne({
                slug, url,
                selected: true,
            });
            return response.json({
                msg: "Generate selected slug URL successfully.",
                slug: slug
            });
        }
        else {
            return response.status(400).json({ msg: "Slug is used." });
        }
    }
}