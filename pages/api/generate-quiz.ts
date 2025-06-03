// pages/api/generate-quiz.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateQuiz } from '../../utils/deepseek';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { level } = JSON.parse(req.body);
    const quiz = await generateQuiz(level);
    res.status(200).json({ quiz });
  } catch (err: unknown) {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Failed to generate quiz' });
}

}
