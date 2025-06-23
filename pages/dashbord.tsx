import { useState, useEffect } from 'react';

type Question = {
  _id?: string;
  id: number;
  question: string;
  options: string[];
  answer: string;
  level: string;
};

type Result = {
  email: string;
  score: number;
  level: string;
};

type User = {
  _id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  birthPlace?: string;
  gender?: string;
  phone?: string;
  targetLanguage?: string;
  // أضف خصائص المستخدم الأخرى إذا لزم الأمر
};

export default function AdminDashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    level: '',
  });
  const [results, setResults] = useState<Result[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Fetch questions and results from DB
  useEffect(() => {
    fetch('/api/admin/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []));
    fetch('/api/admin/results')
      .then((res) => res.json())
      .then((data) => setResults(data.results || []));
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

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

  const handleAddQuestion = async () => {
    if (
      !newQuestion.question ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.answer ||
      !newQuestion.level
    ) {
      alert('Please fill all fields.');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/admin/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    });
    if (res.ok) {
      const data = await res.json();
      setQuestions([...questions, data.question]);
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        answer: '',
        level: '',
      });
    } else {
      alert('Failed to add question');
    }
    setLoading(false);
  };

  const handleDeleteQuestion = async (id: string | undefined) => {
    if (!id) return;
    setLoading(true);
    const res = await fetch(`/api/admin/questions/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setQuestions(questions.filter((q) => q._id !== id));
    } else {
      alert('Failed to delete question');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-gradient-to-br from-indigo-50 via-white to-green-50 rounded-2xl shadow-2xl font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center font-serif tracking-tight drop-shadow">Admin Dashboard</h1>

      {/* Create Question */}
      <div className="mb-12 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Create New Question</h2>
        <input
          type="text"
          placeholder="Question"
          className="w-full p-3 mb-3 border border-indigo-200 rounded-lg font-mono"
          value={newQuestion.question}
          onChange={handleQuestionChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {newQuestion.options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              className="w-full p-3 border border-indigo-200 rounded-lg font-mono"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Correct Answer"
          className="w-full p-3 mb-3 border border-green-200 rounded-lg font-mono"
          value={newQuestion.answer}
          onChange={handleAnswerChange}
        />
        <input
          type="text"
          placeholder="Level (A1, A2, B1, etc.)"
          className="w-full p-3 mb-3 border border-indigo-200 rounded-lg font-mono"
          value={newQuestion.level}
          onChange={handleLevelChange}
        />
        <button
          onClick={handleAddQuestion}
          className={`bg-gradient-to-r from-indigo-600 to-green-500 text-white px-6 py-3 rounded-lg font-bold shadow hover:from-indigo-700 hover:to-green-600 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Question'}
        </button>
      </div>

      {/* List of Questions */}
      <div className="mb-12 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Questions</h2>
        {questions.length === 0 && <p className="text-gray-500">No questions added yet.</p>}
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q._id || q.id} className="p-4 bg-indigo-50 rounded-lg shadow flex flex-col md:flex-row md:items-center">
              <div className="flex-1">
                <div className="font-semibold text-lg text-indigo-800">{q.question}</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <div className="text-sm text-green-700 mt-1">Answer: <span className="font-bold">{q.answer}</span> | Level: <span className="font-bold">{q.level}</span></div>
              </div>
              <button
                onClick={() => handleDeleteQuestion(q._id)}
                className="ml-0 md:ml-6 mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Review Results */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Review Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg font-mono">
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

      {/* User Management - New Section */}
      <div className="mt-12 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">User Management</h2>
        {users.length === 0 && <p className="text-gray-500">No users found.</p>}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full border rounded-lg font-mono text-base">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-2 border">First Name</th>
                <th className="p-2 border">Last Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Birth Date</th>
                <th className="p-2 border">Birth Place</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Target Language</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="p-2 border">{user.firstName}</td>
                  <td className="p-2 border">{user.lastName}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.birthDate}</td>
                  <td className="p-2 border">{user.birthPlace}</td>
                  <td className="p-2 border">{user.gender}</td>
                  <td className="p-2 border">{user.phone}</td>
                  <td className="p-2 border">{user.targetLanguage}</td>
                  <td className="p-2 border">
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition text-sm mr-2"
                      onClick={() => setEditUser(user)}
                    >
                      تعديل
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition text-sm"
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                          const res = await fetch(`/api/admin/users/${user._id}`, { method: 'DELETE' });
                          if (res.ok) {
                            setUsers(users.filter((u) => u._id !== user._id));
                          } else {
                            alert('Failed to delete user');
                          }
                        }
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-600"
              onClick={() => setEditUser(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-indigo-700">تعديل بيانات المستخدم</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await fetch(`/api/admin/users/${editUser._id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editUser),
                });
                if (res.ok) {
                  const updated = await res.json();
                  setUsers(users.map((u) => (u._id === updated.user._id ? updated.user : u)));
                  setEditUser(null);
                } else {
                  alert('Failed to update user');
                }
              }}
            >
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.firstName || ''}
                onChange={e => setEditUser({ ...editUser, firstName: e.target.value })}
                placeholder="First Name"
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.lastName || ''}
                onChange={e => setEditUser({ ...editUser, lastName: e.target.value })}
                placeholder="Last Name"
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.email || ''}
                onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                placeholder="Email"
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.birthDate || ''}
                onChange={e => setEditUser({ ...editUser, birthDate: e.target.value })}
                placeholder="Birth Date"
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.birthPlace || ''}
                onChange={e => setEditUser({ ...editUser, birthPlace: e.target.value })}
                placeholder="Birth Place"
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.gender || ''}
                onChange={e => setEditUser({ ...editUser, gender: e.target.value })}
                placeholder="Gender"
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editUser.phone || ''}
                onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
                placeholder="Phone"
              />
              <input
                className="w-full p-2 mb-4 border rounded"
                value={editUser.targetLanguage || ''}
                onChange={e => setEditUser({ ...editUser, targetLanguage: e.target.value })}
                placeholder="Target Language"
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 transition"
              >
                حفظ التعديلات
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}