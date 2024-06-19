import type { Provider, User } from "@supabase/supabase-js"
import { useEffect } from "react"
 
import { useStorage } from "@plasmohq/storage/hook"
 
import { supabase } from "~core/supabase"
 
function IndexOptions() {
  const [user, setUser] = useStorage<User>("user")
 
  useEffect(() => {
    async function init() {
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
 
    init()
  }, []);
 
  const handleOAuthLogin = async (provider: Provider, scopes = "email") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href
      }
    })
  }
 
  return (
    <main className="tw-flex tw-justify-center tw-items-center tw-w-full tw-top-60 tw-relative">
      <div className="tw-flex tw-flex-col tw-w-60 tw-justify-between tw-space-y-1">
        {user && (
          <>
            <h3 className="tw-text-3xl">
              user.email — {user.email}<br/>
              user.id — {user.id}
            </h3>
            <button
              onClick={() => {
                supabase.auth.signOut()
                setUser(null)
              }}>
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <h3 className="tw-text-3xl tw-w-full tw-m-auto">
              Unknown user. Please sign in
            </h3>
            <button
              onClick={(e) => {
                handleOAuthLogin('github')
              }}>
              Sign in with GitHub
            </button>
          </>
        )}
      </div>
    </main>
  )
}
 
export default IndexOptions