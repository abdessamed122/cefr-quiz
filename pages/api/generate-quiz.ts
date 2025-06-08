import type { NextApiRequest, NextApiResponse } from 'next';
import { generateQuiz } from '../../utils/groq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    const quiz = await generateQuiz();
    res.status(200).json({ quiz });
  } catch (err: unknown) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
}
