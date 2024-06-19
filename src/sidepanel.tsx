import type { User } from "@supabase/supabase-js"

import { useStorage } from "@plasmohq/storage/hook";
import "~style.css";
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import {ResultView} from "~components/resultView";
import {ErrorView} from "~components/errorView";

const getCurrentView = () => {
  const [currentReview] = useStorage("currentReview");

  if (!currentReview) {
    return <LoadingAnimation />;
  } else if (currentReview.error) {
    return <ErrorView {...currentReview.error} />;
  } else {
    const serializedResult = JSON.parse(currentReview.result);
    return <ResultView {...serializedResult} />;
  }
};

const getUserName = (): string => {
  const [user] = useStorage<User>("user");

  if (user && user.user_metadata.preferred_username) {
    return user.user_metadata.preferred_username
  }
  console.log('user\' name not found!', user);
  return 'Unknown';
}

const GitHubCodeAnalyzer = () => {
  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        {getCurrentView()}
      </div>
      <Footer username={getUserName()} />
    </div>
  );
};

function IndexSidePanel() {
  return GitHubCodeAnalyzer()
}

export default IndexSidePanel