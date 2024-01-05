import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"
import LoadingAnimation from "~components/loader";

const GitHubCodeAnalyzer = () => {
  const [reviewResult, setReviewResult] = useStorage("review")

  return (
    <div className="plasmo-container">
      <div className="plasmo-mx-auto">
        {reviewResult
        ? JSON.parse(reviewResult.result).feedback
        : <LoadingAnimation />}
      </div>
      <button onClick={() => {setReviewResult(null)}}>Clear the memory</button>
    </div>
  );
};

export default GitHubCodeAnalyzer;
