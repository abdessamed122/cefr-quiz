import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('cefrquiz');
  const users = await db.collection('users').find({}).toArray();
  res.status(200).json({ users });
}