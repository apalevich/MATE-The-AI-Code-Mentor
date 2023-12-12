import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"

const GitHubCodeAnalyzer = () => {
  const [reviewResult] = useStorage("review")


  return (
    <div>
      {reviewResult
      ? JSON.parse(reviewResult.responseData.choices[0].message.content).feedback
      : 'Подождите'}
    </div>
  );
};

export default GitHubCodeAnalyzer;
