import { jsonrepair } from 'jsonrepair';

// export const Text = `Algeria is a large country located in North Africa. It is the biggest country on the African continent by land area, covering vast deserts, mountains, and a long Mediterranean coastline. The capital city of Algeria is Algiers, which is known for its beautiful architecture and vibrant culture. Algeria has a rich history that includes ancient civilizations, colonial times, and a strong fight for independence. The people of Algeria speak mainly Arabic and French, reflecting the country’s diverse cultural influences. Algeria’s landscape is very varied, with the Sahara Desert covering much of the southern part, while the northern region features mountain ranges and fertile coastal plains. The country is famous for its natural resources, especially oil and natural gas, which play a major role in its economy. Algerian culture is rich and diverse, with many traditions, music, and foods that reflect its long history and mix of peoples. The people are known to be friendly and welcoming. Algeria is a country full of beauty, history, and promise for the future.`;

// export async function generateQuiz(): Promise<string> {
// const apiKey = process.env.GROQ_API_KEY;

//   if (!apiKey) {
//     console.error('GROQ API key is missing!');
//     throw new Error('Groq API key not found in environment variables.');
//   }

//   const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: 'llama3-70b-8192', // or 'llama3-70b-8192' if you want more power
//   messages: [
//     // { role: 'system', content: 'You are a CEFR quiz generator.' },
//     // { role: 'user', content: 'Generate a CEFR English quiz with 20 questions covering A1 to C2 levels.' }
//     { role: 'system', content: 'You are a CEFR English quiz generator.' },
// { role: 'user', content: `
//   Given the following text:

// ${Text}
// Generate a JSON array of 30 multiple-choice questions for testing CEFR levels from A1 to C2.
// Each question must have:
// - "id" (number),  
// - "question" (string),  
// - "options" (array of 4 strings),  
// - "answer" (string),  
// - "level" (one of "A1", "A2", "B1", "B2", "C1", "C2").  

// Only return a valid JSON array.
// ` }

//   ],
//   max_tokens: 3000,
//       temperature: 0.1
//     }),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error('Groq API error:', errorText);
//     throw new Error(`API error: ${res.status}`);
//   }

//   const data = await res.json();

//   if (!data.choices || !data.choices[0]?.message?.content) {
//     console.error('Unexpected Groq API response:', JSON.stringify(data, null, 2));
//     throw new Error('Invalid response from Groq API');
//   }

//   return data.choices[0].message.content;

// }

// // 77
type QuizItem = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  level: string;
};

function isValidQuizItem(item: any): item is QuizItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'number' &&
    typeof item.question === 'string' &&
    Array.isArray(item.options) &&
    item.options.every((opt: any) => typeof opt === 'string') &&
    typeof item.answer === 'string' &&
    typeof item.level === 'string'
  );
}

export function filterValidQuizItems(rawData: any[]): QuizItem[] {
  const validItems: QuizItem[] = [];

  for (const item of rawData) {
    if (isValidQuizItem(item)) {
      validItems.push(item);
    } else {
      console.warn('Invalid quiz item skipped:', item);
    }
  }

  return validItems;
}

export const Text = `Algeria: A Land of Diversity, History, and Promise Algeria, officially known as the People's Democratic Republic of Algeria, is the largest country in Africa by land area and one of the most significant nations in North Africa. It shares borders with several countries, including Tunisia and Libya to the northeast, Niger to the southeast, Mali and Mauritania to the southwest, Western Sahara and Morocco to the west, and the Mediterranean Sea to the north. Its vast territory spans over 2.38 million square kilometers, offering an extraordinary variety of landscapes and climates. The capital city of Algeria is Algiers, a bustling metropolis located along the Mediterranean coast. Known for its striking white buildings, historic Casbah, and stunning views of the sea, Algiers blends modernity with tradition. It is a center of political, economic, and cultural life in the country. Other major cities include Oran, Constantine, Annaba, and Blida, each with its own unique charm and importance. Algeria’s geography is incredibly diverse. The northern part of the country is marked by the Tell Atlas mountain range and fertile coastal plains, which support agriculture and a high population density. Further south lies the High Plateaus and the Saharan Atlas mountains, while the southern half of the country is dominated by the vast and arid Sahara Desert, one of the harshest and most beautiful deserts in the world. Despite its challenging climate, the Sahara is home to unique landscapes, ancient rock art, and traditional nomadic communities. Historically, Algeria has been a crossroads of civilizations. It has seen the influence of the Phoenicians, Romans, Vandals, Byzantines, Arabs, Ottomans, and French. Each of these powers left its mark on Algerian culture, architecture, and traditions. The country’s long and painful struggle for independence from French colonial rule culminated in 1962 after a brutal war of liberation. This victory is a source of great pride for Algerians and is celebrated every year on Independence Day, July 5th. Algeria's population is around 45 million people, and its official languages are Arabic and Tamazight (Berber), with French widely spoken due to the colonial legacy. This multilingualism reflects Algeria’s cultural diversity. The country is home to various ethnic groups, including Arabs and Berbers, each contributing to the national identity through language, customs, and traditions. Economically, Algeria is rich in natural resources. It holds large reserves of oil and natural gas, which are the backbone of its economy. The hydrocarbon sector provides the majority of government revenues and export earnings. In recent years, the government has been trying to diversify the economy by investing in agriculture, renewable energy, and tourism, aiming for sustainable development beyond fossil fuels. Culturally, Algeria boasts a wealth of traditions, music, art, and cuisine. Algerian music includes genres such as Raï, Chaabi, and traditional Berber songs, often performed at weddings and celebrations. The country’s food is flavorful and diverse, featuring dishes like couscous, chorba, tajine, and a variety of pastries and sweets, often flavored with dates, almonds, and honey. Algerians are known for their hospitality and strong sense of community. Family plays a central role in society, and hospitality is extended generously to guests and visitors. Religious and cultural festivals, such as Eid al-Fitr, Mawlid al-Nabawi, and Yennayer (the Berber New Year), are widely celebrated with joy and togetherness. Today, Algeria stands as a country of great potential, balancing a proud history with a desire to build a prosperous future. Despite facing challenges such as unemployment, political reform, and climate change, Algeria’s youth, resources, and strategic position in Africa and the Mediterranean region make it a country with significant promise and importance on the global stage.

`;


export async function generateQuiz(): Promise<QuizItem[]> {
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
      model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      messages: [
        { role: 'system', content: 'You are a CEFR English quiz generator.' },
        {
          role: 'user',
          content: `
Given the following text:

${Text}

Generate a JSON array of 40 multiple-choice questions to test CEFR levels from A1 to C2. Each question must have:
- "id" (number)
- "question" (string, use a variety of question types: what, who, when, where, why, how, true/false, fill in the blank, etc.)
- "options" (array of strings: 4 options for normal questions, but ONLY 2 options ["True", "False"] for true/false questions)
- "answer" (string, must match one of the options)
- "level" (one of "A1", "A2", "B1", "B2", "C1", "C2")

Make sure the questions are diverse in structure and style, not just "What is...". Include some questions that start with "Who", "When", "Where", "Why", "How", and some true/false or fill-in-the-blank style questions.  
For true/false questions, the "options" array must be exactly ["True", "False"].
Return only a valid JSON array, no explanations or extra text.         `,
        },
      ],
      max_tokens: 6000,
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Groq API error:', errorText);
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();

  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) {
    console.error('Unexpected Groq API response:', JSON.stringify(data, null, 2));
    throw new Error('Invalid response from Groq API');
  }

  try {
    // أصلح الـ JSON قبل التحليل
    const repaired = jsonrepair(rawContent);
    const parsed = JSON.parse(repaired);
    const cleanQuizData = filterValidQuizItems(parsed);
    return cleanQuizData;
  } catch (err) {
    console.error('Failed to repair/parse quiz items:', err);
    throw new Error('Invalid JSON returned by Groq');
  }
}

export async function getStaticProps() {
  // Implementation for static props
}

export async function getServerSideProps() {
  // Implementation for server-side props
}
