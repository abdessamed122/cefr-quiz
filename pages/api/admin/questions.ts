import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('cefrquiz'); // استخدم اسم قاعدة البيانات الافتراضي أو ضع اسمك هنا
  const collection = db.collection('questions');

  if (req.method === 'GET') {
    const questions = await collection.find({}).toArray();
    res.status(200).json({ questions });
  } else if (req.method === 'POST') {
    const { question, options, answer, level } = req.body;
    if (!question || !options || !answer || !level) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const result = await collection.insertOne({ question, options, answer, level });
    res.status(201).json({ question: { _id: result.insertedId, question, options, answer, level } });
  } else {
    res.status(405).end();
  }
}