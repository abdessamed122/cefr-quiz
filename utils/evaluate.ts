
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  level: CEFRLevel;
}

interface UserAnswers {
  [questionId: number]: string;
}

interface LevelScore {
  total: number;
  correct: number;
}

interface EvaluationResult {
  finalLevel: CEFRLevel;
  scorePercentage: number;
  description: string;
  levelScores: Record<CEFRLevel, LevelScore>;
}

export function evaluateCEFRWithScore(questions: Question[], userAnswers: UserAnswers): EvaluationResult {
  const levelScores: Record<CEFRLevel, LevelScore> = {
    A1: { total: 0, correct: 0 },
    A2: { total: 0, correct: 0 },
    B1: { total: 0, correct: 0 },
    B2: { total: 0, correct: 0 },
    C1: { total: 0, correct: 0 },
    C2: { total: 0, correct: 0 },
  };

  let totalQuestions = 0;
  let totalCorrect = 0;

  for (const q of questions) {
    levelScores[q.level].total += 1;
    totalQuestions += 1;
    const userAnswer = userAnswers[q.id];
    if (userAnswer && userAnswer.trim() === q.answer.trim()) {
      levelScores[q.level].correct += 1;
      totalCorrect += 1;
    }
  }

  const percentage = (totalCorrect / totalQuestions) * 100;

  let finalLevel: CEFRLevel = 'A1';
  let description = '';

if (percentage >= 90) {
  finalLevel = 'C2';
  description = 'Very Excellent Proficiency';
} else if (percentage >= 80) {
  finalLevel = 'C1';
  description = 'Advanced – Excellent';
} else if (percentage >= 70) {
  finalLevel = 'B2';
  description = 'Upper Intermediate – Very Good';
} else if (percentage >= 60) {
  finalLevel = 'B1';
  description = 'Intermediate – Good';
} else if (percentage >= 50) {
  finalLevel = 'A2';
  description = 'Basic – Fairly Good';
} else {
  finalLevel = 'A1';
  description = 'Beginner – Needs Support';
}


  return {
    finalLevel,
    scorePercentage: Math.round(percentage),
    description,
    levelScores
  };
}
