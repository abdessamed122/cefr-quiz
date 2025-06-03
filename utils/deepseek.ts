
export async function generateQuiz(level: string): Promise<string> {
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
      model: 'llama3-8b-8192', // or llama3-70b-8192 if needed
      messages: [
        { role: 'system', content: 'You are a CEFR quiz generator.' },
        { role: 'user', content: `Generate a CEFR English quiz for level ${level}.` },
      ],
      temperature: 0.7
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
