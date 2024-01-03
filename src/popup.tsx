import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"

const GitHubCodeAnalyzer = () => {
  const [reviewResult] = useStorage("review")

  return (
    <div className="plasmo-container">
      <div className="plasmo-mx-auto">
        {reviewResult
        ? JSON.parse(reviewResult.result).feedback
        : 'Подождите'}
      </div>
    </div>
  );
};

export default GitHubCodeAnalyzer;
