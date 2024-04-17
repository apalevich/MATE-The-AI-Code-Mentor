import { useStorage } from "@plasmohq/storage/hook";
import "~style.css";
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import {ResultView} from "~components/resultView";
import {ErrorView} from "~components/errorView";
import type { ReviewType } from "~types/types";

const getCurrentView = () => {
  const [currentReview] = useStorage<ReviewType | { error: object }>("currentReview");

  if (!currentReview) {
    return <LoadingAnimation />;
  } else if ('error' in currentReview) {
    return <ErrorView {...currentReview.error} />;
  } else {
    return <ResultView {...currentReview.result} />;
  }
};

const GitHubCodeAnalyzer = () => {
  const [currentReview] = useStorage<ReviewType>("currentReview");

  return (
    <div className="tw-w-screen tw-flex tw-flex-col tw-justify-between tw-bg-bg-primary">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        {getCurrentView()}
      </div>
      <Footer />
    </div>
  );
};

export default GitHubCodeAnalyzer;
