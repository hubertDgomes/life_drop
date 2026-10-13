import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import '../../App.css'


const formatDate = (value) => {
  if (!value) return 'Not yet'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Not available'

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const Dashboard = () => {
  const { user, loading } = useAuth()
  const allData = user?.user || user?.data || user
  const [photoUnavailable, setPhotoUnavailable] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [newDate , setNewDate] = useState("")
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [healthNotes, setHealthNotes] = useState('')
  const [noteError, setNoteError] = useState('')
  const { changeAvailable, changeDate, changeNote } = useAuth()

  if (loading) {
    return (
      <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-gradient-to-br from-rose-50 via-white to-orange-50 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white px-6 py-4 text-sm font-semibold text-slate-600 shadow-lg shadow-rose-100/60" role="status">
          <span className="size-5 animate-spin rounded-full border-2 border-rose-200 border-t-rose-600" />
          Loading your donor profile...
        </div>
      </main>
    )
  }

  if (!allData) {
    return (
      <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-gradient-to-br from-rose-50 via-white to-orange-50 px-4 py-10">
        <section className="dashboard-enter w-full max-w-lg rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-[0_24px_70px_rgba(136,19,55,0.10)]">
          <span className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-rose-100 text-rose-600">
            <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-7-4.35-7-10.2A4.3 4.3 0 0 1 12 8.3a4.3 4.3 0 0 1 7 2.5C19 16.65 12 21 12 21Z" fill="currentColor" />
            </svg>
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your profile is not available</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn&apos;t find donor details for this account. Please sign in again to continue.
          </p>
        </section>
      </main>
    )
  }

  const name = allData.name || 'Blood donor'
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
  const bloodGroup = allData.blood_group || allData.blood || 'Not set'
  const isAvailable = allData.is_available

  const toggleAvailabel = async () => {
    try {
      await changeAvailable(!isAvailable)
    }
    catch (err) {
      console.log(err || err.message);
    }
  }

  

  const handleChangeDate = async () => {
    try{
      const res = await changeDate(newDate)
      console.log(res)
      console.log(newDate)
    }
    catch(err){
      console.error(err.response?.data?.message || err.message)
    }
  }

  const handleChangeNote = async () => {
    try {
      setNoteError('')
      await changeNote(healthNotes)
      setShowNoteEditor(false)
    } catch (err) {
      setNoteError(err.response?.data?.message || err.message || 'Could not update health notes.')
    }
  }



  return (
    <main className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#fff9f8] px-4 py-10 sm:px-6 lg:py-14">
      <div aria-hidden="true" className="dashboard-orb dashboard-orb-one" />
      <div aria-hidden="true" className="dashboard-orb dashboard-orb-two" />

      <div className="relative mx-auto max-w-6xl">
        <header className="dashboard-enter mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">LifeDrop</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Donor dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Your kindness can make someone&apos;s tomorrow possible.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/90 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur">
            <span className={`size-2.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <button onClick={toggleAvailabel} className="text-sm font-semibold text-slate-700">
              {isAvailable ? 'Available to donate' : 'Currently unavailable'}
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="dashboard-enter dashboard-delay-one relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-600 via-rose-600 to-red-700 p-7 text-white shadow-[0_28px_70px_rgba(190,24,60,0.24)] sm:p-9">
            <div aria-hidden="true" className="absolute -right-16 -top-20 size-64 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-5 -top-9 size-44 rounded-full border border-white/10" />

            <div className="relative">
              <p className="text-sm font-semibold tracking-wide text-rose-100">Your donor profile</p>
              <div className="mt-7 flex items-center gap-5">
                <div className="dashboard-photo-wrap grid size-24 shrink-0 place-items-center overflow-hidden rounded-[1.75rem] border-4 border-white/25 bg-white/15 text-2xl font-black shadow-xl sm:size-28">
                  {allData.photo_url && !photoUnavailable ? (
                    <img
                      alt={`${name}'s profile`}
                      className="size-full object-cover"
                      onError={() => setPhotoUnavailable(true)}
                      src={allData.photo_url}
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-2xl font-black tracking-tight sm:text-3xl">{name}</h2>
                  <p className="mt-1 truncate text-sm text-rose-100">{allData.email || 'Email not provided'}</p>
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/20 pt-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-100">Blood group</p>
                  <p className="mt-1 text-5xl font-black tracking-tight">{bloodGroup}</p>
                </div>
                <span className="mb-1 grid size-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <svg aria-hidden="true" className="size-8" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-4.35-7-10.2A4.3 4.3 0 0 1 12 8.3a4.3 4.3 0 0 1 7 2.5C19 16.65 12 21 12 21Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
              <p className="mt-6 max-w-xs text-sm leading-6 text-rose-100">
                One donation can help save up to three lives. Thank you for being a part of that.
              </p>
            </div>
          </section>

          <section className="dashboard-enter dashboard-delay-two rounded-[2rem] border border-rose-100/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(136,19,55,0.08)] backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-rose-500">A little about you</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Your details</h2>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-rose-50 text-rose-600">
                <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                </svg>
              </span>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="dashboard-detail-card">
                <dt>Phone number</dt>
                <dd>{allData.phone || 'Not provided'}</dd>
              </div>
              <div className="dashboard-detail-card">
                <dt>Age</dt>
                <dd>{allData.age ? `${allData.age} years old` : 'Not provided'}</dd>
              </div>
              <div className="dashboard-detail-card sm:col-span-2">
                <dt>Location</dt>
                <dd>{allData.location || 'Not provided'}</dd>
              </div>
              <div className="dashboard-detail-card">
                <div className="flex items-center justify-between">
                  <dt>Last donation</dt>
                  <button onClick={()=> setShowDate(!showDate)}>Change</button>
                </div>
                {showDate && <input onChange={(e)=> setNewDate(e.target.value)} type="date" className='p-2 rounded-[6px] border' /> }
                {showDate && <button onClick={handleChangeDate}>Change The date</button> }
                <dd>{formatDate(allData.last_donation_date)}</dd>
              </div>
              <div className="dashboard-detail-card">
                <dt>Member since</dt>
                <dd>{formatDate(allData.created_at)}</dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="dashboard-enter dashboard-delay-three mt-6 grid gap-4 rounded-[2rem] border border-rose-100/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(136,19,55,0.06)] backdrop-blur sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-orange-50 text-orange-500">
            <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.06 16.94l-1.42 1.42m12.72 0-1.42-1.42M7.06 7.06 5.64 5.64M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
          </span>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold text-slate-900">Your health notes</h2>
              {!showNoteEditor && (
                <button
                  className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                  onClick={() => {
                    setHealthNotes(allData.health_notes || '')
                    setNoteError('')
                    setShowNoteEditor(true)
                  }}
                  type="button"
                >
                  Edit
                </button>
              )}
            </div>
            {showNoteEditor ? (
              <div className="mt-3 space-y-3">
                <textarea
                  aria-label="Health notes"
                  className="w-full rounded-lg border border-rose-200 p-3 text-sm text-slate-700 focus:border-rose-400 focus:outline-none"
                  onChange={(e) => setHealthNotes(e.target.value)}
                  rows={4}
                  value={healthNotes}
                />
                {noteError && <p className="text-sm text-red-600" role="alert">{noteError}</p>}
                <div className="flex gap-3">
                  <button
                    className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                    onClick={handleChangeNote}
                    type="button"
                  >
                    Save notes
                  </button>
                  <button
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    onClick={() => {
                      setNoteError('')
                      setShowNoteEditor(false)
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {allData.health_notes || 'No health notes have been added to your donor profile.'}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
