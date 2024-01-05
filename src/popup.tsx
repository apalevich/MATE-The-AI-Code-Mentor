import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import ResultView from "~components/resultView";

const GitHubCodeAnalyzer = () => {
  // const [reviewResult, setReviewResult] = useStorage("review")

  return (
    <div className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-justify-between tw-bg-bg-primary">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        <ResultView />
      </div>
      <Footer />
    </div>
  );
};

export default GitHubCodeAnalyzer;
