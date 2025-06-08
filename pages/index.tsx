
import { useState, useEffect } from 'react';
import { evaluateCEFRLevel, Question } from '../utils/evaluate';
import {Text} from '../utils/groq'
export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // const introText = `Algeria is a large country located in North Africa. It is the biggest country on the African continent by land area, covering vast deserts, mountains, and a long Mediterranean coastline. The capital city of Algeria is Algiers, which is known for its beautiful architecture and vibrant culture. Algeria has a rich history that includes ancient civilizations, colonial times, and a strong fight for independence. The people of Algeria speak mainly Arabic and French, reflecting the country’s diverse cultural influences. Algeria’s landscape is very varied, with the Sahara Desert covering much of the southern part, while the northern region features mountain ranges and fertile coastal plains. The country is famous for its natural resources, especially oil and natural gas, which play a major role in its economy. Algerian culture is rich and diverse, with many traditions, music, and foods that reflect its long history and mix of peoples. The people are known to be friendly and welcoming. Algeria is a country full of beauty, history, and promise for the future.`;
  const introText = Text;

  // جلب الأسئلة من API
  useEffect(() => {
    fetch('/api/generate-quiz')
      .then((res) => res.json())
      .then((data) => setQuestions(JSON.parse(data.quiz)))
      .catch(console.error);
  }, []);

  // حفظ إجابة المستخدم
  const handleAnswer = (qid: number, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  // تقييم المستوى عند الضغط على زر Submit
  // const submitQuiz = () => {
  //   const evaluation = evaluateCEFRLevel(questions, userAnswers);
  //   setResult(evaluation.finalLevel); // عرض المستوى النهائي
  // };
  
   const submitQuiz = () => {
    const evaluation = evaluateCEFRLevel(questions, userAnswers);
    setResult(evaluation.finalLevel);
    setShowModal(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg mt-10 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Quiz CEFR</h1>

     <div className="mb-8 p-4 bg-white rounded-md shadow-sm text-gray-700 leading-relaxed">
        {introText}
      </div>
      {questions.length === 0 && (
        <p className="text-center text-gray-500"> Loading questions...</p>
      )}

      {questions.map((q) => (
        <div key={q.id} className="mb-6 p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
          <p className="font-semibold text-lg text-gray-800 mb-3">
            {q.id}. {q.question}
            <span className="ml-2 px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700 font-medium">
              Level: {q.level}
            </span>
          </p>

          <div className="flex flex-col space-y-2">
            {q.options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center cursor-pointer rounded-md px-3 py-2 border
                  ${
                    userAnswers[q.id] === opt
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                      : 'border-gray-300 text-gray-700 hover:bg-indigo-50'
                  }
                  transition-colors duration-200`}
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
    {/* زر الإرسال */}
      <button
        onClick={submitQuiz}
        disabled={questions.length === 0}
        className={`w-full mt-6 py-3 text-white font-bold rounded-md shadow-md
          ${questions.length === 0
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'}
          transition-colors duration-300`}
      >
      Submit Answers
      </button>
     {/* النافذة المنبثقة */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <p className="text-center text-2xl font-semibold text-green-700">
               Your estimated CEFR level is: <span className="underline">{result}</span>
            </p>
          </div>
        </div>
        )}

      {/* <button
        onClick={submitQuiz}
        disabled={questions.length === 0}
        className={`w-full mt-6 py-3 text-white font-bold rounded-md shadow-md
          ${questions.length === 0
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'}
          transition-colors duration-300`}
      >
        إرسال الإجابات
      </button>

      {result && (
        <p className="mt-8 text-center text-2xl font-semibold text-green-700">
          المستوى التقديري الخاص بك هو: <span className="underline">{result}</span>
        </p>
      )} */}
    </div>
  );
}
