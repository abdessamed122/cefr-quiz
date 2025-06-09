import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, birthDate, birthPlace, email, phone, password } = req.body;

  if (!firstName || !lastName || !birthDate || !birthPlace || !email || !phone || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('cefrquiz');
    const users = db.collection('users');
    await users.insertOne({ firstName, lastName, birthDate, birthPlace, email, phone, password });
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Database error' });
}
}