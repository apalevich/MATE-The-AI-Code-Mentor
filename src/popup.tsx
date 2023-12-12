import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"

const GitHubCodeAnalyzer = () => {
  const [reviewResult] = useStorage("review")


  return (
    <div>
      {reviewResult ? reviewResult.responseData.choices[0].message.content : 'Подождите'}
    </div>
  );
};

export default GitHubCodeAnalyzer;
