import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, password, birthDate, birthPlace, gender, phone, targetLanguage } = req.body;
  if (!firstName || !lastName || !birthDate || !birthPlace || !email || !phone || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const client = await clientPromise;
    const db = client.db('cefrquiz');
    const users = db.collection('users');
const existingUser = await users.findOne({ email });
if (existingUser) {
  return res.status(409).json({ error: 'Email already exists' });
}

await users.insertOne({
  firstName,
  lastName,
  email,
  passwordHash, // إذا كنت تستخدم التشفير ضع هنا كلمة المرور المشفرة
  birthDate,
  birthPlace,
  gender,
  phone,
  targetLanguage,
  createdAt: new Date()
});
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Database error' });
}
}