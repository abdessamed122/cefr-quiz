'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        const data = await res.json();
        alert(data.error || 'Login failed');
      }
    } catch {
      alert('An error occurred');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-green-100 font-sans">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <Logo />
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 font-serif tracking-tight drop-shadow">
          Welcome Back
        </h1>
        <p className="text-gray-500 mb-6 text-center font-mono">
          Sign in to your CEFR Quiz account
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className={`w-full py-3 rounded-lg font-bold text-lg shadow transition
            ${loading
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-green-500 hover:from-indigo-700 hover:to-green-600 text-white'}
          `}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-500 font-mono">Don&#39;t have an account?</span>
          <button
            className="ml-2 text-indigo-700 font-semibold hover:underline"
            onClick={() => router.push('/singup')}
          >
            Sign up
          </button>
        </div>
      </div>
    </main>
  );
}
