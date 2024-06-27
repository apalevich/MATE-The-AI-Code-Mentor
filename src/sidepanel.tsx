import type { User } from "@supabase/supabase-js"

import { useStorage } from "@plasmohq/storage/hook";
import "~style.css";
import LoadingAnimation from "~components/loader";
import Header from "~components/header";
import Footer from "~components/footer";
import { ResultView } from "~components/resultView";
import { ErrorView } from "~components/errorView";
import { LoginView } from "~components/loginView";

import { useEffect, useState } from "react";

function IndexSidePanel() {
  const [user, setUser] = useState<User | null>(null);
  const [currentReview, setCurrentReview] = useState<any>(null);
  const [view, setView] = useState<JSX.Element | null>(null);

  const [storedUser] = useStorage<User>("user");
  const [storedCurrentReview] = useStorage("currentReview");

  useEffect(() => {
    setUser(storedUser);
    setCurrentReview(storedCurrentReview);
  }, [storedUser, storedCurrentReview]);

  useEffect(() => {
    if (!user && !user?.user_metadata?.preferred_username) {
      setView(<LoginView />);
    } else if (!currentReview) {
      setView(<LoadingAnimation />);
    } else if (currentReview.error) {
      setView(<ErrorView {...currentReview.error} />);
    } else {
      setView(<ResultView {...currentReview.result} />);
    }
  }, [user, currentReview]);

  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
      <Header />
      <div className="tw-mx-auto tw-text-font">
        {view}
      </div>
      <Footer />
    </div>
  );
};

export default IndexSidePanel