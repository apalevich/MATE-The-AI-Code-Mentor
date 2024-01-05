import { useStorage } from "@plasmohq/storage/hook"
import "~style.css"
import LoadingAnimation from "~components/loader";

const Footer = () => {
  return (
    <div className="tw-flex tw-justify-center tw-py-4">
      <button onClick={() => {}}>Clear the memory</button>
    </div>
  )
}

const Header = () => {
  return (
    <div className="tw-flex tw-justify-center tw-py-4 tw-bg-gradient-to-b tw-from-bg-secondary tw-to-bg-primary">
      <h1 className="tw-text-xl">
        MATE
      </h1>
    </div>
  )
}

const GitHubCodeAnalyzer = () => {
  // const [reviewResult, setReviewResult] = useStorage("review")

  return (
    <div className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-justify-between tw-bg-bg-primary">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        <LoadingAnimation />
      </div>
      <Footer />
    </div>
  );
};

export default GitHubCodeAnalyzer;
