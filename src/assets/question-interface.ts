export interface QuestionInterface {
  id: number;
  question: string;
  explanation: string;
  subQuestions?: string[];
  weight: number;
  dependsOn?: number;
}
