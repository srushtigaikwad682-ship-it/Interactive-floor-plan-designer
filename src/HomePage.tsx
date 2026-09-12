import { ArrowRight, Box, Check, Compass, Grid3X3, Layers3, MousePointer2, Ruler, Save, Sparkles } from 'lucide-react';

interface HomePageProps {
  onStart: () => void;
}

const features = [
  {
    icon: Grid3X3,
    title: 'Create Layout',
    description: 'Build your vision from a clean, flexible canvas designed for clarity.',
    tone: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: MousePointer2,
    title: 'Drag & Drop',
    description: 'Place and arrange every element with intuitive, effortless controls.',
    tone: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Ruler,
    title: 'Measurements',
    description: 'Keep dimensions precise with automatic area and measurement details.',
    tone: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Save,
    title: 'Save Design',
    description: 'Save your progress locally and return to your ideas whenever you want.',
    tone: 'bg-amber-50 text-amber-600',
  },
];

export function HomePage({ onStart }: HomePageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Compass size={22} strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">PLANORA</span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          <a href="#features" className="transition hover:text-indigo-600">Features</a>
          <a href="#about" className="transition hover:text-indigo-600">About</a>
          <button onClick={onStart} className="rounded-lg bg-slate-900 px-5 py-2.5 text-white transition hover:bg-indigo-600">Open editor</button>
        </div>
        <button onClick={onStart} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:hidden">Open editor</button>
      </nav>

      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -left-48 top-10 h-96 w-96 rounded-full bg-indigo-50 blur-3xl" />
        <div className="relative z-10 animate-fade-up">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
            <Sparkles size={14} />
            A better way to plan
          </div>
          <h1 className="max-w-2xl font-display text-5xl font-bold leading-[1.06] tracking-tight text-slate-950 sm:text-6xl lg:text-[72px]">
            Design your space.<br /><span className="text-indigo-600">Visualize</span> your future.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
            PLANORA is an interactive floor plan designer that turns your ideas into clear, confident layouts — one thoughtful detail at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={onStart} className="group flex items-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">
              Start designing <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <span className="flex items-center gap-2 text-sm text-slate-400"><Check size={16} className="text-teal-500" /> Free to explore</span>
          </div>
          <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-6 text-sm text-slate-400">
            <span><strong className="font-display text-2xl text-slate-900">2D</strong><br />visual planning</span>
            <span className="h-8 w-px bg-slate-200" />
            <span><strong className="font-display text-2xl text-slate-900">100%</strong><br />browser based</span>
          </div>
        </div>

        <div className="relative animate-fade-up delay-200 [perspective:1200px]">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sky-100/80 blur-2xl" />
          <div className="relative rotate-1 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-2xl shadow-slate-200/80 transition duration-500 hover:rotate-0">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-red-300" /><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><i className="h-2.5 w-2.5 rounded-full bg-green-300" /></div>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">Apartment plan / 01</span>
                <Layers3 size={13} className="text-slate-400" />
              </div>
              <div className="relative aspect-[1.15] bg-slate-50 p-5">
                <div className="absolute inset-5 border-2 border-slate-700 bg-white">
                  <div className="absolute left-0 top-0 h-[56%] w-[52%] border-b-2 border-r-2 border-slate-700 bg-indigo-50/60 p-3"><span className="text-[8px] font-semibold text-indigo-800">LIVING ROOM</span><div className="absolute bottom-4 left-1/2 h-5 w-16 -translate-x-1/2 rounded bg-indigo-300/70" /></div>
                  <div className="absolute right-0 top-0 h-[30%] w-[48%] border-b-2 border-slate-700 bg-amber-50/70 p-3"><span className="text-[8px] font-semibold text-amber-800">KITCHEN</span><div className="absolute bottom-3 left-3 h-5 w-10 rounded border border-amber-500/40" /></div>
                  <div className="absolute bottom-0 left-0 h-[44%] w-[52%] border-r-2 border-slate-700 bg-teal-50/60 p-3"><span className="text-[8px] font-semibold text-teal-800">BEDROOM</span><div className="absolute bottom-4 left-1/2 h-12 w-16 -translate-x-1/2 rounded border border-teal-400/50 bg-teal-100" /></div>
                  <div className="absolute bottom-0 right-0 h-[70%] w-[48%] bg-sky-50/50 p-3"><span className="text-[8px] font-semibold text-sky-800">STUDY</span><div className="absolute bottom-5 right-5 h-4 w-12 rounded bg-sky-300/70" /></div>
                  <div className="absolute left-[52%] top-[48%] h-4 w-9 -translate-x-1/2 bg-amber-600/70" />
                </div>
                <div className="absolute bottom-2 right-4 flex gap-1"><div className="h-1 w-8 bg-slate-500" /><span className="text-[7px] text-slate-400">5 m</span></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 flex animate-fade-in delay-500 items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-200/70">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600"><Box size={18} /></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Live area</p><p className="font-display text-sm font-bold text-slate-900">86.4 m²</p></div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-slate-100 bg-slate-50/70 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Everything you need</p><h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Ideas into floor plans.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">A focused toolkit for creating floor plans that feel as good as they look.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description, tone }, index) => <div key={title} className={`animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 delay-${(index + 1) * 100}`}><div className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}><Icon size={21} /></div><h3 className="font-display text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 sm:flex-row sm:items-center lg:px-10">
        <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Built for clarity</p><h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-slate-900">Plan with confidence, present with pride.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-slate-500">Whether you are mapping your first idea or presenting a polished concept, PLANORA helps you communicate space clearly.</p></div>
        <button onClick={onStart} className="group flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600">Explore the editor <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button>
      </section>
      <footer className="border-t border-slate-100 px-6 py-6 text-center text-xs text-slate-400">PLANORA <span className="mx-2">·</span> Interactive Floor Plan Designer <span className="mx-2">·</span> B.Tech Project</footer>
    </main>
  );
}
