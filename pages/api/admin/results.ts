import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
const db = client.db('cefrquiz');
const collection = db.collection('results');

  if (req.method === 'GET') {
    const results = await collection.find({}).toArray();
    res.status(200).json({ results });
  } else {
    res.status(405).end();
  }
}