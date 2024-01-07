import PieChart from "~components/piechart";

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

const renderRecommendations = (recommendations, fillColor) => {
    return recommendations?.length ? recommendations.map((recommendation, index) => (
      <div key={index} className="tw-mt-8 tw-flex tw-gap-4">
        <div className="tw-w-12 tw-h-12 tw-flex tw-gap-4 tw-rounded-full tw-bg-indigo-100 tw-dark:bg-indigo-900/20">
          <div className="tw-w-6 tw-h-6 tw-m-auto">
            <svg viewBox="0 0 8 8" fill={fillColor} xmlns="http://www.w3.org/2000/svg" className="tw-w-6 tw-h-6 tw-m-auto tw-text-red-500 tw-dark:text-red-400">
              <circle cx="4" cy="4" r="4"/>
            </svg>
          </div>
        </div>
        <div className="tw-w-5/6">
          <h3 className="tw-font-semibold tw-text-lg tw-text-grey-700 tw-dark:text-indigo-300">{recommendation.title}</h3>
          <p className="tw-text-grey-500 tw-dark:text-grey-400">{recommendation.description}</p>
        </div> 
      </div> 
    )) : null;
};

const ResultView = ({
    overallScore,
    shortestFeedback,
    overallFeedback,
    mustHaveRecommendations,
    niceToHaveRecommendations
}: ResultViewProps) => {
    return (
      <div className="tw-py-16">
        <div className="tw-m-auto tw-px-6 tw-text-grey-600">
          <div className="tw-rounded-[4rem] tw-space-y-6 tw-flex tw-flex-col tw-justify-center">
            <div className="tw-text-center">
              <PieChart value={overallScore} />
            </div>
            <div>
              <h2 className="tw-text-3xl tw-font-bold tw-text-grey-900 tw-dark:text-white">
                {shortestFeedback}
              </h2>
              <p className="tw-my-8 tw-text-grey-600 tw-dark:text-grey-300">
                {overallFeedback}
              </p>
              <div className="tw-space-y-4 tw-divide-grey-100 tw-dark:divide-grey-800">
                {/* tw-divide-y */}
                {renderRecommendations(mustHaveRecommendations, "red")}
                {renderRecommendations(niceToHaveRecommendations, "orange")}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default ResultView