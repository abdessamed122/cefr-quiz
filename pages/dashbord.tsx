import { useState } from 'react';

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  level: string;
};

export default function AdminDashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    level: '',
  });
  const [results] = useState<{ email: string; score: number; level: string }[]>(
    [
      { email: 'user1@example.com', score: 8, level: 'B1' },
      { email: 'user2@example.com', score: 6, level: 'A2' },
    ],
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, question: e.target.value });
  };

  const handleOptionChange = (idx: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[idx] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, answer: e.target.value });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, level: e.target.value });
  };

  const handleAddQuestion = () => {
    if (
      !newQuestion.question ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.answer ||
      !newQuestion.level
    ) {
      alert('Please fill all fields.');
      return;
    }
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        ...newQuestion,
      },
    ]);
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      answer: '',
      level: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-gray-50 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Administrator Dashboard</h1>

      {/* Create Question */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Create New Question</h2>
        <input
          type="text"
          placeholder="Question"
          className="w-full p-2 mb-2 border rounded"
          value={newQuestion.question}
          onChange={handleQuestionChange}
        />
        {newQuestion.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            className="w-full p-2 mb-2 border rounded"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          className="w-full p-2 mb-2 border rounded"
          value={newQuestion.answer}
          onChange={handleAnswerChange}
        />
        <input
          type="text"
          placeholder="Level (A1, A2, B1, etc.)"
          className="w-full p-2 mb-2 border rounded"
          value={newQuestion.level}
          onChange={handleLevelChange}
        />
        <button
          onClick={handleAddQuestion}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Question
        </button>
      </div>

      {/* List of Questions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        {questions.length === 0 && <p className="text-gray-500">No questions added yet.</p>}
        {questions.map((q) => (
          <div key={q.id} className="mb-4 p-3 bg-white rounded shadow">
            <div className="font-semibold">{q.question}</div>
            <ul className="list-disc ml-6">
              {q.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <div className="text-sm text-green-700">Answer: {q.answer} | Level: {q.level}</div>
          </div>
        ))}
      </div>

      {/* Review Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Review Results</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2 border">User Email</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Level</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, idx) => (
              <tr key={idx} className="text-center">
                <td className="p-2 border">{res.email}</td>
                <td className="p-2 border">{res.score}</td>
                <td className="p-2 border">{res.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}