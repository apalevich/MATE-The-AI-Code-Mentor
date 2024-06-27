type RequestType = {
  id?: string,
  user_id: string,
  filename: string,
  parsedCode: string,
};

type RecommendationObject = {
  title: string;
  description: string;
};

type ResultViewProps = {
  overallScore: number | string;
  shortestFeedback: string;
  overallFeedback: string;
  mustHaveRecommendations: RecommendationObject[];
  niceToHaveRecommendations: RecommendationObject[];
};

type ReviewType = {
  id?: string,
  ok: boolean
  result?: ResultViewProps,
  error?: ErrorType
} | undefined;

type ErrorType = {
  icon?: string, // Emoji
  message?: string,
  button?: {
    url: string,
    text: string,
  }
};

export type {
  RequestType,
  ResultViewProps,
  ReviewType,
  ErrorType
};