CEFR Quiz Generator

A Next.js app that generates CEFR English quizzes dynamically using a language model API.

Features

Select CEFR levels (A1 to C2)

Generate quizzes by calling an API endpoint

Uses a backend API route to fetch quiz content from an AI model (DeepSeek or Groq)

Styled with Tailwind CSS

Getting Started

Prerequisites

Node.js (v16+ recommended)

npm or yarn

API key for the language model service (DeepSeek or Groq)

Installation

Clone the repositorygit clone https://github.com/abdessamed122/cefr-quiz.gitcd cefr-quiz

Install dependenciesnpm install(or yarn install)

Create a .env.local file in the root directory with the following content:DEEPSEEK_API_KEY=your_deepseek_or_groq_api_key_here

Run the development servernpm run dev(or yarn dev)

Open [http://localhost:3000](https://cefr-quiz-88fq.vercel.app/) to see the app.

Project Structure

pages/

index.tsx — main page with quiz generator UI

api/generate-quiz.ts — backend API route calling the language model API

utils/deepseek.ts — utility to call the DeepSeek or Groq API

styles/globals.css — global styles (Tailwind CSS)

Deployment

The app can be deployed on platforms like Vercel.

Make sure to add the environment variable (DEEPSEEK_API_KEY) in your deployment settings.

Notes

The project uses TypeScript.

Tailwind CSS is used for styling.

Make sure your API key has enough balance to avoid errors.

License

MIT License © Abdessamed Ouahabi

