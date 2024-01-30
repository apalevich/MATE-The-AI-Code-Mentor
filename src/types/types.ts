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
  result: ResultViewProps,
  reqStatus?: boolean
};

export type {ResultViewProps, ReviewType};