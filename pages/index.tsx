// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [level, setLevel] = useState('A1');
  const [quiz, setQuiz] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setQuiz('');
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        body: JSON.stringify({ level }),
      });
      const data = await res.json();
      setQuiz(data.quiz);
    } catch (err) {
      console.error('Fetch error:', err);
      setQuiz('Failed to load quiz. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-4">CEFR Quiz Generator</h1>
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>A1</option>
          <option>A2</option>
          <option>B1</option>
          <option>B2</option>
          <option>C1</option>
          <option>C2</option>
        </select>
        <button
          onClick={handleGenerate}
          className="ml-4 p-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </div>
      <pre className="mt-6 whitespace-pre-wrap bg-white p-4 rounded shadow">
        {quiz}
      </pre>
    </div>
  );
}
