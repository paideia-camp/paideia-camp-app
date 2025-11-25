export interface CoachFeedback {
  structureScore: number;
  clarityScore: number;
  mindsetScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: Array<{
    type: "structure" | "clarity" | "mindset" | "impact";
    title: string;
    message: string;
    priority: "high" | "medium" | "low";
  }>;
  highlightedIssues: Array<{
    text: string;
    issue: string;
    suggestion: string;
    startIndex: number;
    endIndex: number;
  }>;
}

export interface CoachRequest {
  essayText: string;
  context?: string;
  userId?: string;
}
