import type { User } from "@supabase/supabase-js"
import type { ReviewType } from "~types/types";

import { useStorage } from "@plasmohq/storage/hook";
import "~style.css";
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import { ResultView } from "~components/resultView";
import { ErrorView } from "~components/errorView";
import { LoginView } from "~components/loginView";

const getCurrentView = () => {
  const [currentReview] = useStorage<ReviewType>("currentReview");
  const [user] = useStorage<User>("user");

  if (!user && !user?.user_metadata?.preferred_username) {
    return <LoginView />
  }
  if (!currentReview) {
    return <LoadingAnimation />;
  }
  if (currentReview.error) {
    return <ErrorView {...currentReview.error} />;
  }

  return <ResultView {...currentReview.result} />;
};

function IndexSidePanel() {
  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        { getCurrentView() }
      </div>
      <Footer />
    </div>
  );
};

export default IndexSidePanel