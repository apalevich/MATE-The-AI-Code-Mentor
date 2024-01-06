import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import ResultView from "~components/resultView";

const mockObj = {
  overallScore: '66',
  shortestFeedback: 'Good!',
  overallFeedback: 'Your code contains types and abstracted enough',
  mustHaveRecommendations: [
    {
      title: 'Real Time Location',
      description: 'Asperiores nemo possimus nesciunt quam mollitia.'
    },
    {
      title: 'Real Time Location',
      description: 'Asperiores nemo possimus nesciunt quam mollitia.'
    },
  ],
  niceToHaveRecommendations: [
    {
      title: 'Real Time Location',
      description: 'Asperiores nemo possimus nesciunt quam mollitia.'
    },
    {
      title: 'Real Time Location',
      description: 'Asperiores nemo possimus nesciunt quam mollitia.'
    },
  ],
}

const GitHubCodeAnalyzer = () => {
  // const [reviewResult, setReviewResult] = useStorage("review")

  return (
    <div className="tw-h-100 tw-w-screen tw-flex tw-flex-col tw-justify-between tw-bg-bg-primary">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        <ResultView {...mockObj} />
      </div>
      <Footer />
    </div>
  );
};

export default GitHubCodeAnalyzer;
