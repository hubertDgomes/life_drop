import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [location, setLocation] = useState('')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { handleSignup } = useAuth()

  const navigate  = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setError('')
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('age', age)
    formData.append('blood_group', bloodGroup)
    formData.append('location', location)
    if (photo) {
      formData.append('photo_url', photo)
    }
    setDisabled(true)
    try {
      await handleSignup(formData)
      .then(()=> navigate("/login"))
    }
    catch (err) {
      const message = err.response?.data?.message || 'Signup failed'
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
        aria-labelledby="signup-title"
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
            id="signup-title"
          >
            Create your account
          </h1>
        </header>

        <form
          className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2"
          onSubmit={signup}
        >
          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 sm:col-span-2" role="alert">
              {error}
            </p>
          )}

          <label className="text-sm font-semibold text-slate-700" htmlFor="full-name">
            Full name
            <input
              autoComplete="name"
              className={inputClassName}
              id="full-name"
              name="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              required
              type="text"
              value={name}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Email address
            <input
              autoComplete="email"
              className={inputClassName}
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700" htmlFor="password">
            Password
            <input
              autoComplete="new-password"
              className={inputClassName}
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
              type="password"
              value={password}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700" htmlFor="phone">
            Phone number
            <input
              autoComplete="tel"
              className={inputClassName}
              id="phone"
              name="phone"
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Your phone number"
              required
              type="tel"
              value={phone}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700" htmlFor="age">
            Age
            <input
              className={inputClassName}
              id="age"
              max="120"
              min="1"
              name="age"
              onChange={(event) => setAge(event.target.value)}
              placeholder="Your age"
              required
              type="number"
              value={age}
            />
          </label>

          <label className="text-sm font-semibold text-slate-700" htmlFor="blood-group">
            Blood group
            <select
              className={`${inputClassName} appearance-none`}
              id="blood-group"
              name="bloodGroup"
              onChange={(event) => setBloodGroup(event.target.value)}
              required
              value={bloodGroup}
            >
              <option disabled value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>

          <label
            className="text-sm font-semibold text-slate-700 sm:col-span-2"
            htmlFor="location"
          >
            Location
            <input
              autoComplete="address-level2"
              className={inputClassName}
              id="location"
              name="location"
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City, area, or address"
              required
              type="text"
              value={location}
            />
          </label>

          <label
            className="text-sm font-semibold text-slate-700 sm:col-span-2"
            htmlFor="photo"
          >
            Profile photo
            <input
              accept="image/*"
              className={`${inputClassName} cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-rose-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-rose-700 hover:file:bg-rose-200`}
              id="photo"
              name="photo"
              onChange={(event) => setPhoto(event.target.files?.[0] || null)}
              type="file"
            />
          </label>

          <button
            className={disabled ? "mt-2 rounded-xl bg-rose-100 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 active:scale-[0.99] sm:col-span-2" : "mt-2 rounded-xl bg-rose-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 active:scale-[0.99] sm:col-span-2"}
            type="submit"
          >
            {disabled ? 'Creating Account' : 'Create Account'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Signup
