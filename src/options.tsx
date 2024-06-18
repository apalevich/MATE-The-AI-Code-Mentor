import type { Provider, User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
 
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
 
import { supabase } from "~core/supabase"
 
function IndexOptions() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })
 
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
 
  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession()
 
      if (error) {
        console.error(error)
        return
      }
      if (!!data.session) {
        setUser(data.session.user)
      }
    }
 
    init()
  }, [])
 
  // const handleEmailLogin = async (
  //   type: "LOGIN" | "SIGNUP",
  //   username: string,
  //   password: string
  // ) => {
  //   try {
  //     const {
  //       error,
  //       data: { user }
  //     } =
  //       type === "LOGIN"
  //         ? await supabase.auth.signInWithPassword({
  //             email: username,
  //             password
  //           })
  //         : await supabase.auth.signUp({ email: username, password })
 
  //     if (error) {
  //       alert("Error with auth: " + error.message)
  //     } else if (!user) {
  //       alert("Signup successful, confirmation mail should be sent soon!")
  //     } else {
  //       setUser(user)
  //     }
  //   } catch (error) {
  //     console.log("error", error)
  //     alert(error.error_description || error)
  //   }
  // }
 
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