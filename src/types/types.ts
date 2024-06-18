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
  id: string,
  reqStatus?: boolean
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

export type {ResultViewProps, ReviewType, ErrorType};