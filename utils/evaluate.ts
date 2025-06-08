
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

export function evaluateCEFRLevel(questions: Question[], userAnswers: UserAnswers): {
  finalLevel: CEFRLevel;
  levelScores: Record<CEFRLevel, LevelScore>;
} {
  const levelScores: Record<CEFRLevel, LevelScore> = {
    A1: { total: 0, correct: 0 },
    A2: { total: 0, correct: 0 },
    B1: { total: 0, correct: 0 },
    B2: { total: 0, correct: 0 },
    C1: { total: 0, correct: 0 },
    C2: { total: 0, correct: 0 },
  };

  for (const q of questions) {
    levelScores[q.level].total += 1;
    const userAnswer = userAnswers[q.id];
    if (userAnswer && userAnswer.trim() === q.answer.trim()) {
      levelScores[q.level].correct += 1;
    }
  }

  const cefrOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let finalLevel: CEFRLevel = 'A1';

  for (const level of cefrOrder) {
    const { total, correct } = levelScores[level];
    if (total === 0) continue;
    const accuracy = correct / total;
    if (accuracy >= 0.6) {
      finalLevel = level;
    } else {
      break;
    }
  }

  return { finalLevel, levelScores };
}
