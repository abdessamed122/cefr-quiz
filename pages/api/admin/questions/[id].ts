import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const client = await clientPromise;
  const db = client.db('cefrquiz');
  const collection = db.collection('questions');

  await collection.deleteOne({ _id: new ObjectId(id as string) });
  res.status(200).json({ success: true });
}