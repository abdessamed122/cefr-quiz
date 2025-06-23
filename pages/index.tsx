import { useState, useEffect } from 'react';
import { evaluateCEFRWithScore, Question } from '../utils/evaluate'; // ⬅️ اسم الدالة الجديدة
import { Text } from '../utils/groq';
import Logo from '../components/Logo';

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{
    finalLevel: string;
    scorePercentage: number;
    description: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const introText = Text;

  useEffect(() => {
    fetch('/api/generate-quiz')
      .then((res) => res.json())
      .then((data) => {
        const parsedQuiz = typeof data.quiz === 'string' ? JSON.parse(data.quiz) : data.quiz;
        setQuestions(parsedQuiz);
      })
      .catch(console.error);
  }, []);

  const handleAnswer = (qid: number, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const submitQuiz = () => {
    const evaluation = evaluateCEFRWithScore(questions, userAnswers); // ⬅️ استخدام الدالة الجديدة
    setResult(evaluation);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-green-100 flex flex-col items-center py-10 px-2 font-sans">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-2 tracking-tight drop-shadow font-serif">
            CEFR Quiz
          </h1>
        </div>
        <div className="mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm">
          <p className="text-base md:text-lg text-gray-700 text-center whitespace-pre-line font-mono">
            {introText}
          </p>
        </div>

        {questions.length === 0 && (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-indigo-600 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-gray-500 text-lg font-mono">Loading questions...</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitQuiz();
          }}
        >
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="mb-8 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 border border-indigo-100 bg-gradient-to-r from-white to-indigo-50 font-sans"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl font-bold text-indigo-600 mr-3 font-mono">{idx + 1}.</span>
                <span className="font-semibold text-lg text-gray-800 font-serif">{q.question}</span>
                <span className="ml-auto px-3 py-1 text-xs rounded-full bg-indigo-200 text-indigo-800 font-medium shadow font-mono">
                  Level: {q.level}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center cursor-pointer rounded-lg px-4 py-3 border-2
                      ${
                        userAnswers[q.id] === opt
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                          : 'border-gray-200 text-gray-700 hover:bg-indigo-50'
                      }
                      transition-colors duration-200 font-sans`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={userAnswers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                      className="mr-3 form-radio text-indigo-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={questions.length === 0}
            className={`w-full mt-6 py-4 text-xl font-bold rounded-xl shadow-lg
              ${questions.length === 0
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-green-500 hover:from-indigo-700 hover:to-green-600 focus:ring-4 focus:ring-indigo-300'}
              text-white transition-colors duration-300 font-serif`}
          >
            Submit Answers
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && result && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 font-sans">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl relative flex flex-col items-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 font-bold text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img src="/logo1.png" alt="Logo" className="h-28 mb-6" />
            <p className="text-center text-2xl font-bold text-gray-700 mb-2 font-serif">
Final Result:
            </p>
            <span className="text-3xl font-extrabold text-indigo-700 font-mono underline mb-1">
              {result.finalLevel}
            </span>
            <p className="text-xl font-medium text-green-600 mb-2 font-serif">
              {result.description}
            </p>
            <p className="text-lg font-mono text-gray-800">
              Overall Score: <span className="font-bold">{result.scorePercentage}%</span>
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition font-sans"
            >
Close            </button>
          </div>
        </div>
      )}
    </div>
  );
}
