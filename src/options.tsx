import type { Provider, User } from "@supabase/supabase-js"
import { useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { supabase } from "~core/supabase"
import '~style.css';
 
function IndexOptions() {
  const [user, setUser] = useStorage<User>("user")
 
  useEffect(() => {
    initSession()
  }, []);
 
  const initSession = async () => {
    const { data, error } = await supabase.auth.getSession()
 
    if (error) {
      console.error(error)
      return
    }
    if (!!data.session) {
      console.log('Supabase data: ', data);
      setUser(data.session.user)
    }
  }

  const handleOAuthLogin = async (provider: Provider, scopes = "email") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const renderSignIn = () => (
    <>
      <h2 className="tw-pl-0 tw-pb-1 tw-border-b-2 tw-border-blue-600 tw-text-2xl tw-uppercase tw-inline-block tw-font-thin"> sign in </h2>
      <button
        className="tw-bg-blue-600 tw-text-white tw-w-full tw-py-2 tw-px-5 tw-block tw-h-10 tw-rounded-full tw-mt-8 tw-transition-all tw-duration-500 tw-ease-in-out tw-border-none tw-uppercase hover:tw-bg-blue-700 hover:tw-shadow-lg hover:tw-cursor-pointer focus:tw-outline-none"
        onClick={() => handleOAuthLogin('github')}
      >
        Sign In with GitHub
      </button>
    </>
  )

  const renderUserOptions = () => (
    <>
      <h2 className="tw-pl-0 tw-pb-1 tw-border-b-2 tw-border-blue-600 tw-text-2xl tw-uppercase tw-inline-block tw-font-thin">Hello, {user?.user_metadata?.preferred_username}!</h2>
      <div className="tw-my-8 tw-flex tw-gap-4"> 
        <h3 className="tw-text-xl">You can now close this page and use MATE on the <a href="https://github.com">GitHub</a></h3>
      </div>
      <button
        className="tw-bg-blue-600 tw-text-white tw-w-full tw-py-2 tw-px-5 tw-block tw-h-10 tw-rounded-full tw-mt-8 tw-transition-all tw-duration-500 tw-ease-in-out tw-border-none tw-uppercase hover:tw-bg-blue-700 hover:tw-shadow-lg hover:tw-cursor-pointer focus:tw-outline-none"
        onClick={() => window.close()}
      >
        Close Tab
      </button>
      <button
        className="tw-bg-white tw-text-blue-600 tw-border-2 tw-border-blue-600 tw-w-full tw-py-2 tw-px-5 tw-block tw-h-10 tw-rounded-full tw-mt-8 tw-transition-all tw-duration-500 tw-ease-in-out tw-border-none tw-uppercase hover:tw-bg-blue-700 hover:tw-shadow-lg hover:tw-cursor-pointer focus:tw-outline-none"
        onClick={handleSignOut}
      >
        Want to logout?
      </button>
    </>
  )

  return (
    <main className="tw-w-full tw-h-full tw-bg-gray-300 tw-py-20">
      <div className="tw-min-h-fit tw-max-w-fit tw-min-w-[400px] tw-m-auto tw-text-white tw-p-20 tw-bg-gray-600 tw-shadow-[0px_30px_60px_-5px_rgba(0,0,0,0.3)]">
        { !user ? renderSignIn() : renderUserOptions() }
      </div>
    </main>
  )
}
 
export default IndexOptions