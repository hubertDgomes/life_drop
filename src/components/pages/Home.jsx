import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const steps = [
  { number: "01", icon: "✳", title: "Create your profile", text: "A few details are all it takes to join a community ready to help." },
  { number: "02", icon: "⌕", title: "Find your match", text: "Explore nearby donors by blood group, whenever help is needed." },
  { number: "03", icon: "↗", title: "Make a connection", text: "Reach out directly and turn a moment of need into a moment of hope." },
]

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

const reasons = [
  { icon: "♡", title: "One small act. A world of difference.", text: "Your generosity could give someone the time and strength to keep going." },
  { icon: "⌂", title: "Help, close to home.", text: "A connected local community can make it easier to find help when it matters." },
  { icon: "✳", title: "Hope has a way of spreading.", text: "Every person who steps up inspires someone else to do the same." },
]

const questions = [
  { question: "Who can sign up as a donor?", answer: "People who meet local blood donation eligibility requirements can create a donor profile." },
  { question: "How do I find a donor near me?", answer: "Search by blood group and location to browse donors who may be able to help." },
  { question: "Is it free to use Life Drop?", answer: "Yes. Creating a profile and connecting with the community is free." },
  { question: "Can I choose when I'm available?", answer: "Yes. Donors can update their availability so requests reach people who are ready to help." },
  { question: "Does Life Drop replace medical advice?", answer: "No. Always follow guidance from qualified healthcare professionals and local blood services." },
]

const SectionIntro = ({ label, title, text }) => (
  <div className="mx-auto mb-12 max-w-2xl text-center">
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-rose-700">{label}</p>
    <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">{title}</h2>
    {text && <p className="mx-auto mt-4 max-w-lg leading-7 text-stone-500">{text}</p>}
  </div>
)

const Hero = ({ isAuthenticated }) => (
  <section className="relative isolate overflow-hidden bg-rose-950 text-white">
    <div aria-hidden="true" className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-rose-700/20 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-52 left-1/4 h-[30rem] w-[30rem] rounded-full bg-red-950/70 blur-3xl" />
    <div className="relative mx-auto grid min-h-[620px] w-full max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
      <div className="max-w-2xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wide text-rose-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
          A little kindness goes a long way
        </div>
        <h1 className="font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Find a blood donor <span className="italic text-rose-300">near you, fast.</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-rose-100/75 sm:text-lg">
          When every moment matters, finding the right person should feel simple. Meet your local donor community with Life Drop.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link className="group inline-flex items-center justify-center gap-3 rounded-full bg-rose-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition duration-300 hover:-translate-y-1 hover:bg-rose-500" to="/donors">
            Find a donor <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10" to={isAuthenticated ? "/profile" : "/signup"}>
            {isAuthenticated ? "My profile" : "Become a donor"}
          </Link>
        </div>
        <div className="mt-10 flex items-center gap-3 text-xs text-rose-100/65">
          <span className="flex -space-x-2" aria-hidden="true">
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-rose-950 bg-rose-200 text-sm">♡</span>
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-rose-950 bg-orange-200 text-sm">✳</span>
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-rose-950 bg-amber-100 text-sm">+</span>
          </span>
          <span>People helping people, every day</span>
        </div>
      </div>
      <div className="relative mx-auto flex aspect-square w-full max-w-[390px] items-center justify-center sm:max-w-[440px]">
        <div aria-hidden="true" className="absolute inset-4 rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute inset-12 rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute inset-20 animate-pulse rounded-full bg-rose-600/10 blur-2xl" />
        <svg aria-hidden="true" className="relative z-10 h-52 w-52 drop-shadow-[0_24px_35px_rgba(244,63,94,0.35)] transition duration-700 hover:scale-105 sm:h-64 sm:w-64" fill="none" viewBox="0 0 220 260">
          <path d="M110 14C94 45 35 113 35 164a75 75 0 0 0 150 0c0-51-59-119-75-150Z" fill="url(#drop-fill)" />
          <path d="M70 164c0 23 17 42 40 46" stroke="white" strokeLinecap="round" strokeOpacity=".65" strokeWidth="8" />
          <defs>
            <linearGradient id="drop-fill" x1="38" x2="194" y1="24" y2="232" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDA4AF" />
              <stop offset=".48" stopColor="#E11D48" />
              <stop offset="1" stopColor="#9F1239" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-8 left-0 rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-xl shadow-black/20 backdrop-blur-md sm:-left-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-500/20 text-xl text-rose-200">♡</span>
            <div><p className="text-sm font-semibold text-white">A life touched</p><p className="mt-1 text-xs text-rose-100/60">A community that cares</p></div>
          </div>
        </div>
        <div className="absolute right-0 top-10 rounded-full border border-white/10 bg-rose-900/80 px-4 py-2 text-xs font-medium text-rose-100 shadow-lg backdrop-blur-md sm:-right-2">
          Give hope. Share life.
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-rose-200/30 to-transparent" />
  </section>
)

const Stats = () => {
  const [stats] = useState({ registeredDonors: 12500, availableNow: 850, successfulRequests: 3200 })

  // TODO: API - replace with real data from backend
  // useEffect(() => {
  //   // Fetch the latest donation statistics here.
  // }, [])

  const items = [
    { value: stats.registeredDonors, label: "Registered donors" },
    { value: stats.availableNow, label: "Available now" },
    { value: stats.successfulRequests, label: "Successful requests" },
  ]

  return (
    <section className="relative z-10 -mt-8 px-4">
      <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl sm:grid-cols-3">
        {items.map((item, index) => (
          <div className={`px-6 py-7 text-center ${index > 0 ? "border-t border-stone-100 sm:border-l sm:border-t-0" : ""}`} key={item.label}>
            <p className="font-serif text-3xl text-rose-800">{item.value.toLocaleString()}<span className="text-rose-500">+</span></p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const HowItWorks = () => (
  <section className="bg-[#faf8f5] px-4 py-24 sm:py-28">
    <div className="mx-auto max-w-6xl">
      <SectionIntro label="A few simple steps" title="Good things happen when we connect." text="Finding a donor or becoming one is straightforward. Here's how Life Drop brings people together." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <article className="group rounded-2xl border border-stone-200/80 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-rose-200 hover:shadow-[0_20px_45px_rgba(112,32,45,0.09)] sm:p-8" key={step.number}>
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 font-serif text-2xl text-rose-700 transition duration-300 group-hover:scale-110 group-hover:bg-rose-100">{step.icon}</span>
              <span className="font-serif text-sm text-stone-300">{step.number}</span>
            </div>
            <h3 className="mt-8 font-serif text-xl text-stone-900">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-500">{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const BloodGroups = () => (
  <section className="bg-white px-4 py-24 sm:py-28">
    <div className="mx-auto max-w-6xl">
      <SectionIntro label="Find your match" title="Every type. Every chance." text="Choose a blood group to discover donors who may be able to help." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {bloodGroups.map((group, index) => (
          <Link className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-[#fdfcfb] p-5 transition duration-300 hover:-translate-y-1.5 hover:border-rose-300 hover:shadow-[0_18px_40px_rgba(112,32,45,0.10)] sm:p-6" key={group} to={`/donors?blood_group=${encodeURIComponent(group)}`}>
            <span className="absolute -right-5 -top-8 font-serif text-8xl text-rose-50 transition duration-300 group-hover:scale-110 group-hover:text-rose-100">{index + 1}</span>
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-rose-100 text-xs font-bold tracking-wide text-rose-800">BLOOD</span>
            <span className="relative mt-5 block font-serif text-3xl text-stone-900">{group}</span>
            <span className="relative mt-2 flex items-center gap-2 text-xs text-stone-500">View donors <span className="transition-transform group-hover:translate-x-1">→</span></span>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

const WhyDonate = () => (
  <section className="bg-[#f5efeb] px-4 py-24 sm:py-28">
    <div className="mx-auto max-w-6xl">
      <SectionIntro label="More than a donation" title="The smallest gesture can mean everything." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => (
          <article className="rounded-2xl border border-white/80 bg-white/75 p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:p-8" key={reason.title}>
            <span aria-hidden="true" className="font-serif text-4xl text-rose-700">{reason.icon}</span>
            <h3 className="mt-6 font-serif text-xl leading-snug text-stone-900">{reason.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-500">{reason.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link className="group inline-flex items-center gap-3 rounded-full bg-rose-950 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-rose-800 hover:shadow-lg" to="/signup">
          Join as a donor <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  </section>
)

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="bg-white px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionIntro label="Here to help" title="A few things you might be wondering." />
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {questions.map((item, index) => (
            <article key={item.question}>
              <button aria-expanded={openIndex === index} className="flex w-full items-center justify-between gap-5 py-5 text-left font-medium text-stone-800 transition-colors hover:text-rose-800 sm:py-6" onClick={() => setOpenIndex(openIndex === index ? null : index)} type="button">
                <span>{item.question}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-stone-200 text-lg text-rose-700 transition duration-300 ${openIndex === index ? "rotate-45 bg-rose-50" : ""}`}>+</span>
              </button>
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <p className="overflow-hidden pb-5 pr-10 text-sm leading-7 text-stone-500 sm:pb-6">{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const CtaBanner = () => (
  <section className="relative isolate overflow-hidden bg-rose-950 px-5 py-16 text-white sm:px-8 sm:py-20">
    <div aria-hidden="true" className="absolute -right-28 -top-52 -z-10 h-96 w-96 animate-pulse rounded-full bg-rose-700/20 blur-3xl" />
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-rose-300">Your kindness matters</p>
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Be someone's reason to smile today.</h2>
        <p className="mt-4 text-sm leading-7 text-rose-100/65">One thoughtful choice can be the start of someone's brighter tomorrow.</p>
      </div>
      <Link className="group inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-rose-600 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-rose-500 hover:shadow-lg sm:w-auto" to="/signup">
        Sign up today <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  </section>
)

const Home = () => {
  const { user } = useAuth()

  return (
    <main className="overflow-hidden bg-white font-sans text-stone-900">
      <Hero isAuthenticated={Boolean(user)} />
      <Stats />
      <HowItWorks />
      <BloodGroups />
      <WhyDonate />
      <Faq />
      <CtaBanner />
    </main>
  )
}

export default Home
