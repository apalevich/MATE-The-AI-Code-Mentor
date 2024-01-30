import { useStorage } from "@plasmohq/storage/hook";
import "~style.css";
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import {ResultView} from "~components/resultView";
import type { ReviewType } from "~background/messages/review";

const GitHubCodeAnalyzer = () => {
  const [currentReview] = useStorage<ReviewType>("currentReview");

  return (
    <div className="tw-h-100 tw-w-screen tw-flex tw-flex-col tw-justify-between tw-bg-bg-primary">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        {currentReview === undefined ? (
          <LoadingAnimation />
        ) : 
          <ResultView {...currentReview.result} />
        }
      </div>
      <Footer />
    </div>
  );
};

export default GitHubCodeAnalyzer;
