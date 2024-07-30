import PieChart from "~components/piechart";
import type { ResultViewProps } from "~types/types";
import { useState } from "react";

const renderRecommendations = (recommendations, fillColor) => {
    return recommendations?.length ? recommendations.map((recommendation, index) => (
      <div key={index} className="tw-mt-8 tw-flex tw-gap-4">
        <div className="tw-w-12 tw-h-12 tw-flex tw-gap-4 tw-rounded-full">
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

export const ResultView = ({
    overallScore,
    shortestFeedback,
    overallFeedback,
    mustHaveRecommendations,
    niceToHaveRecommendations
}: ResultViewProps) => {
    const [likeValue, setLikeValue] = useState(null);
    const [notesValue, setNotesValue] = useState("");


    const handleLikeChange = (event) => {
      setLikeValue(event.target.value === 'like');
      console.log(`Like selected: ${event.target.value}`);
    };

    const handleNotesChange = (event) => {
      setNotesValue(event.target.value);
    }

    const logState = () => {
      console.dir({
        Notes: notesValue,
        Like: likeValue
      })
    }

    return (
      <div className="tw-py-6">
        <div className="tw-m-auto tw-px-6 tw-text-grey-600">
          <div className="tw-rounded-[4rem] tw-space-y-6 tw-flex tw-flex-col tw-justify-center">
            <div className="tw-flex tw-items-end">
              <PieChart value={overallScore} />
              <div className="tw-flex tw-flex-col">
                <p className="tw-text-xl">{overallScore}%</p>
                <h2 className="tw-text-5xl tw-font-bold tw-text-grey-900 tw-dark:text-white tw-basis-2">
                  {shortestFeedback}
                </h2>
              </div>
            </div>
            <div>
              <p className="tw-my-8 tw-text-grey-600 tw-dark:text-grey-300">
                {overallFeedback}
              </p>
              <div className="tw-space-y-4 tw-divide-grey-100 tw-dark:divide-grey-800">
                {/* tw-divide-y */}
                {renderRecommendations(mustHaveRecommendations, "red")}
                {renderRecommendations(niceToHaveRecommendations, "orange")}
              </div>
            </div>
            <div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mt-8">
                <label className="tw-flex tw-items-center">
                  <input 
                    type="radio" 
                    name="feedback" 
                    value="like" 
                    className="tw-mr-2" 
                    onChange={handleLikeChange} 
                  />
                  <span className="tw-text-green-500">Like</span>
                </label>
                <label className="tw-flex tw-items-center">
                  <input 
                    type="radio" 
                    name="feedback" 
                    value="dislike" 
                    className="tw-mr-2" 
                    onChange={handleLikeChange} 
                  />
                  <span className="tw-text-red-500">Dislike</span>
                </label>
              </div>
              <div className="tw-mt-4">
                <textarea
                  className="tw-w-full tw-p-2 tw-border tw-border-grey-300 tw-rounded"
                  rows={4}
                  placeholder="Provide your feedback here..."
                  onChange={handleNotesChange}
                ></textarea>
              </div>
              <p onClick={logState}>log</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
