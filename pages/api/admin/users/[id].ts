import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const client = await clientPromise;
  const db = client.db('cefrquiz');
  const users = db.collection('users');

  if (req.method === 'PUT') {
    const update = req.body;
    delete update._id; // لا تحدث الـ _id
    await users.updateOne({ _id: new ObjectId(id as string) }, { $set: update });
    const user = await users.findOne({ _id: new ObjectId(id as string) });
    res.status(200).json({ user });
  } else if (req.method === 'DELETE') {
    await users.deleteOne({ _id: new ObjectId(id as string) });
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}