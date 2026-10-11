import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [disabled, setDisabled] = useState(false)
  const { handleLogin } = useAuth()

  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    setDisabled(true)
    try {
      const res = await handleLogin({ email, password })
      // console.log(res);
      
      navigate(`/db`)
    }
    catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      console.log(err)
      setError(message)
    }
    finally {
      setDisabled(false)
    }

  }
  const inputClassName =
    'mt-2 w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'

  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-gradient-to-br from-rose-50 via-white to-orange-50 px-4 py-10 sm:px-6">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-2xl rounded-3xl border border-rose-100 bg-white p-6 shadow-[0_24px_70px_rgba(136,19,55,0.10)] sm:p-10"
      >
        <header className="mb-8 flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-600">
            <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s-7-4.35-7-10.2A4.3 4.3 0 0 1 12 8.3a4.3 4.3 0 0 1 7 2.5C19 16.65 12 21 12 21Z"
                fill="currentColor"
              />
              <path
                d="M12 6.7V3m0 3.7-2-2m2 2 2-2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          <h1
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            id="login-title"
          >
            Welcome back
          </h1>
        </header>

        {error &&
          <h1 className="w-full bg-red-200 my-3 p-3 rounded-2xl">{error}</h1>
        }

        <form className="grid grid-cols-1 gap-y-5" onSubmit={login}>
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Email address
            <input
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputClassName}
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </label>

          <label className="text-sm font-semibold text-slate-700" htmlFor="password">
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={inputClassName}
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </label>

          <button
            className={disabled ? "mt-2 rounded-xl bg-rose-300 px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-rose-200 transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 active:scale-[0.99]" : "mt-2 rounded-xl bg-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 active:scale-[0.99]"}
            type="submit"
          >
            {disabled ? "Loging In" : "Log In"}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
