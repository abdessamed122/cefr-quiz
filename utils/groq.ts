
export const Text = `Algeria is a large country located in North Africa. It is the biggest country on the African continent by land area, covering vast deserts, mountains, and a long Mediterranean coastline. The capital city of Algeria is Algiers, which is known for its beautiful architecture and vibrant culture. Algeria has a rich history that includes ancient civilizations, colonial times, and a strong fight for independence. The people of Algeria speak mainly Arabic and French, reflecting the country’s diverse cultural influences. Algeria’s landscape is very varied, with the Sahara Desert covering much of the southern part, while the northern region features mountain ranges and fertile coastal plains. The country is famous for its natural resources, especially oil and natural gas, which play a major role in its economy. Algerian culture is rich and diverse, with many traditions, music, and foods that reflect its long history and mix of peoples. The people are known to be friendly and welcoming. Algeria is a country full of beauty, history, and promise for the future.`;

export async function generateQuiz(): Promise<string> {
const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('GROQ API key is missing!');
    throw new Error('Groq API key not found in environment variables.');
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192', // or 'llama3-70b-8192' if you want more power
  messages: [
    // { role: 'system', content: 'You are a CEFR quiz generator.' },
    // { role: 'user', content: 'Generate a CEFR English quiz with 20 questions covering A1 to C2 levels.' }
    { role: 'system', content: 'You are a CEFR English quiz generator.' },
{ role: 'user', content: `
  Given the following text:

${Text}
Generate a JSON array of 20 multiple-choice questions for testing CEFR levels from A1 to C2.
Each question must have:
- "id": number
- "question": the question
- "options": list of four options not repeated in any other question
- "answer": the correct choice (must exactly match one from options)
- "level": CEFR level (A1, A2, B1, B2, C1, C2)

Ensure a balance of levels and clean formatting. Output JSON only.
` }

  ],
  max_tokens: 1500,
      temperature: 0.1
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Groq API error:', errorText);
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    console.error('Unexpected Groq API response:', JSON.stringify(data, null, 2));
    throw new Error('Invalid response from Groq API');
  }

  return data.choices[0].message.content;

}

