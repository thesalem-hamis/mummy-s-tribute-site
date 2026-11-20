// import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'

// /* ------------------------------------------------------------------
//    UI ONLY. No database, no API, no extra imports.
//    Everything below is local data so you can see the design.
//    Later, swap `SAMPLE_TRIBUTES` for real data.
// ------------------------------------------------------------------- */

// type Tribute = {
//   id: string
//   name: string
//   location: string | null
//   zone: string | null
//   role: string
//   message: string
//   hearts: number
//   created_at: string
// }

// const ROLES = ['Teenager', 'Youth', 'Church member', 'Leader / Pastor', 'Family & friend']
// const TARGET = 1_000_000
// const BASE_TOTAL = 24_318 // demo number for the counter and lights
// const PAGE_SIZE = 6

// const TAGS = ['#MinistryOfTeensAndYouth', '#1MillionTributesToBigMummy', '#CelebratingBigMummysLegacy']
// const fmt = (n: number) => n.toLocaleString('en')

// /* HER PHOTO: save it in your /public folder as big-mummy.jpg (or change this path).
//    If the file is missing, a purple and gold monogram shows instead, so nothing breaks. */
// const PHOTO = '/big-mummy.jpg'
// /* The fan of three: left, centre (front), right. Save the files in /public. */
// const PHOTOS = ['/big-mummy-2.jpg', '/big-mummy.jpg', '/big-mummy-3.jpg']

// /* Palette: purple, gold, white */
// const PURPLE = '#2e1065'
// const PURPLE_MID = '#4c1d95'
// const GOLD = '#c9972b'
// const GOLD_SOFT = '#e8c46a'
// const LILAC = '#f7f3ff'

// /* Colour pops copied from the reference: gradient headline text + pill badges. */
// const GRAD_TEXT: CSSProperties = { background: 'linear-gradient(90deg, #fde68a 0%, #ffffff 50%, #fcd34d 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 22px rgba(252,211,77,0.35))' }
// const LILAC_TEXT = '#d8c4f5'

// function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
//   return (
//     <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
//       style={dark ? { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.22)', color: GOLD_SOFT } : { background: LILAC, borderColor: '#e4d6fb', color: PURPLE_MID }}>
//       <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: dark ? GOLD : '#f59e0b' }} />{children}
//     </span>
//   )
// }

// const STARTERS = [
//   'Big Mummy, thank you for…',
//   'The way she loved people taught me…',
//   'One thing I will carry from her life is…',
//   'Father, thank You for her life. Today I pray…',
// ]

// const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '♥'

// /* Edit these freely as you gather more verified details. */
// const LIFE: { when: string; title: string; text: string }[] = [
//   { when: '1938', title: 'Born', text: 'Aimiugwina Angel was born, a daughter of the Ojeme lineage of Ewu, Edo State.' },
//   { when: 'A life of faith', title: 'Devoted to Christ', text: 'A devoted Christian known for her faith, humility and kindness to all who met her.' },
//   { when: 'A mother of three', title: 'Matriarch', text: 'Mother of Pastor Chris Oyakhilome, Rev. Ken Oyakhilome and Kathy Woghiren, and mother to many more.' },
//   { when: '25 September 2026', title: 'Passed into glory', text: 'She departed this earthly realm, leaving a legacy of love that will not fade.' },
// ]

// /* Sample tributes, shown on the wall. */
// const SAMPLE_TRIBUTES: Tribute[] = [
//   { id: 't1', name: 'Adesola Uzorka', role: 'Leader / Pastor', zone: 'Lagos Sub Zone C', location: 'Lagos, Nigeria', hearts: 21, created_at: '2026-11-19T17:45:00Z',
//     message: 'Dear Big Mummy,\n\nThank you for your life of love, faith and sacrifice. You loved God, you loved the Church, and you loved children. Your legacy will never be forgotten.\n\nMy prayer: Father, thank You for her life. Give us grace to love You the way she did, to serve the way she did. Comfort and strengthen the family, in Jesus’ name. Amen.' },
//   { id: 't2', name: 'Grace Okafor', role: 'Youth', zone: 'Lagos Zone 1', location: 'Lagos, Nigeria', hearts: 12, created_at: '2026-11-19T10:00:00Z',
//     message: 'Sweet Mummy, thank you for loving us the way you do. You were so caring and made sure we never lacked anything. I will carry your smile with me always.' },
//   { id: 't3', name: 'Daniel Mensah', role: 'Teenager', zone: 'Accra Zone', location: 'Accra, Ghana', hearts: 8, created_at: '2026-11-19T08:30:00Z',
//     message: 'Big Mummy lives on. Thank you for your kindness and your passion for souls. Till we meet again.' },
//   { id: 't4', name: 'Eleanor Akhimien', role: 'Teenager', zone: 'Believers Loveworld Zone A', location: 'Ekpoma, Nigeria', hearts: 15, created_at: '2026-11-18T19:20:00Z',
//     message: 'Big Mummy, I miss your smile. Jesus is taking good care of you now. I love you and I will be a good girl.' },
//   { id: 't5', name: 'Amara Eze', role: 'Youth', zone: null, location: 'London, United Kingdom', hearts: 5, created_at: '2026-11-18T12:10:00Z',
//     message: 'Thank you for every prayer and every smile. Because of you, so many of us learned what it means to love God and to love people.' },
//   { id: 't6', name: 'Deaconess Dorothy Osaghae', role: 'Leader / Pastor', zone: 'Edmonton Zone', location: 'Edmonton, Canada', hearts: 18, created_at: '2026-11-18T09:05:00Z',
//     message: 'Big Mummy was indeed an angel who lived among us. Loving, caring and prayerful. We celebrate you today and always.' },
//   { id: 't7', name: 'Kelvin Dube', role: 'Teenager', zone: 'Harare Zone', location: 'Harare, Zimbabwe', hearts: 3, created_at: '2026-11-17T21:00:00Z',
//     message: 'Ever joyful Big Mummy. Full of love and caring. Forever missed, forever in our hearts.' },
//   { id: 't8', name: 'Esther Williams', role: 'Youth', zone: 'Cape Town Zone', location: 'Cape Town, South Africa', hearts: 9, created_at: '2026-11-17T09:15:00Z',
//     message: 'Your legacy lives on in every child you prayed for. We will make you proud. Rest well, Big Mummy.' },
//   { id: 't9', name: 'Sister Norah Veremu', role: 'Church member', zone: null, location: 'Kwekwe, Zimbabwe', hearts: 6, created_at: '2026-11-16T15:40:00Z',
//     message: 'Thank you for the greatest gift you gave us, our Man of God. Forever missed. Love you dearly, Big Mummy.' },
//   { id: 't10', name: 'Derron Akhimien', role: 'Teenager', zone: 'Believers Loveworld Zone A', location: 'Ekpoma, Nigeria', hearts: 11, created_at: '2026-11-16T11:00:00Z',
//     message: 'Big Mummy, you are my hero. You loved God and you loved me. Even though you are in heaven, I will keep smiling because you are happy. I will make you proud.' },
//   { id: 't11', name: 'Blessing Okonkwo', role: 'Family & friend', zone: null, location: 'Abuja, Nigeria', hearts: 7, created_at: '2026-11-15T18:30:00Z',
//     message: 'A mother of mothers. Your smile was always amazing. Keep resting, ma, till we meet again. ❤️' },
//   { id: 't12', name: 'Chiamaka Nwosu', role: 'Youth', zone: 'Enugu Zone', location: 'Enugu, Nigeria', hearts: 4, created_at: '2026-11-15T08:10:00Z',
//     message: 'Father, thank You for Big Mummy’s life. Today I pray that her love for souls lives in every teenager and youth who calls on Your name. Amen.' },
// ]

// const FONTS = `
// @import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700&display=swap');
// .bm { font-family: 'Mona Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; font-size: 1rem; }
// .bm h1, .bm h2, .bm h3, .bm .head { font-family: 'Mona Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.01em; }
// .bm input, .bm select, .bm textarea, .bm button { font-family: inherit; }
// .bm .shimmer { background-size: 220% 100% !important; animation: bm-shimmer 7s ease-in-out infinite; }
// @keyframes bm-shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
// .bm .glow-btn { box-shadow: 0 0 0 1px rgba(252,211,77,.55), 0 8px 28px rgba(245,158,11,.5), 0 0 48px rgba(236,72,153,.3); transition: transform .2s ease, box-shadow .2s ease; }
// .bm .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(252,211,77,.8), 0 12px 36px rgba(245,158,11,.65), 0 0 70px rgba(236,72,153,.45); }
// .bm .glow-card { transition: transform .35s ease, box-shadow .35s ease; box-shadow: 0 12px 34px rgba(124,58,237,.09); }
// .bm .glow-card:hover { transform: translateY(-3px); box-shadow: 0 22px 50px rgba(124,58,237,.16), 0 0 0 1px rgba(236,72,153,.18); }
// .bm .grid-light { background-image: linear-gradient(rgba(76,29,149,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(76,29,149,.08) 1px, transparent 1px); background-size: 140px 140px; }
// .bm .grid-dark { background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px); background-size: 140px 140px; }
// @keyframes bm-ring { 0% { transform: scale(.8); opacity: .9; } 100% { transform: scale(2.6); opacity: 0; } }
// @keyframes bm-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.07); } }
// .bm .tl-item { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
// .bm .tl-item.in { opacity: 1; transform: none; }
// .bm .tl-dot { position: relative; }
// .bm .tl-dot::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; border: 2px solid #c9972b; animation: bm-ring 2.2s ease-out infinite; }
// .bm .btn-pulse { animation: bm-pulse 2.4s ease-in-out infinite; }
// @media (prefers-reduced-motion: reduce) { .bm .tl-item { opacity: 1; transform: none; transition: none; } .bm .tl-dot::after, .bm .btn-pulse { animation: none; } }
// @media (prefers-reduced-motion: reduce) { .bm .shimmer { animation: none; } .bm .glow-btn, .bm .glow-card { transition: none; } }
// `

// function Portrait({ className = '', alt = '', src = PHOTO }: { className?: string; alt?: string; src?: string }) {
//   const [bad, setBad] = useState(false)
//   if (!src || bad) {
//     return (
//       <div role="img" aria-label={alt || undefined} className={`${className} head flex items-center justify-center text-7xl`}
//         style={{ background: `linear-gradient(160deg, ${PURPLE_MID}, ${PURPLE})`, color: GOLD_SOFT }}>BM</div>
//     )
//   }
//   return <img src={src} alt={alt} onError={() => setBad(true)} className={`${className} object-cover object-top`} />
// }

// /* Hero: no background image, no "Read tributes" button, no marquee. Background comes from the shared wrapper. */
// function GridOverlay() {
//   return <div aria-hidden="true" className="grid-dark pointer-events-none absolute inset-0" />
// }

// function Aurora() {
//   return (
//     <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
//       <div className="absolute -left-24 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl" style={{ background: '#ec4899' }} />
//       <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl" style={{ background: '#7c3aed' }} />
//       <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: '#f59e0b' }} />
//     </div>
//   )
// }

// function Hero({ total }: { total: number }) {
//   const pct = Math.min(100, Math.max(total > 0 ? 1 : 0, (total / TARGET) * 100))
//   return (
//     <header id="top" className="relative overflow-hidden text-white">
//       <div className="relative mx-auto flex min-h-[34rem] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center sm:min-h-[44rem]">
//         <Pill dark>A Celebration of a Glorious Life Well Lived</Pill>
//         <h1 className="mt-6 text-5xl font-bold leading-[1.08] sm:text-7xl shimmer" style={GRAD_TEXT}>Celebrating Big Mommy’s Legacy</h1>
//         <p className="head mt-5 text-xl font-semibold sm:text-2xl"><span style={{ color: '#e9d5ff' }}>Deaconess Angel Oyakhilome</span><span style={{ color: '#fcd34d' }}> • 1938 – 2026 (88 Years)</span></p>
//         <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: LILAC_TEXT }}>Forever in our hearts • Thank you Mummy for your glorious legacy of love, faith, motherly warmth, and devotion to children around the world.</p>
//         <div className="mt-8 flex flex-wrap justify-center gap-3">
//           <a href="#write" className="glow-btn rounded-full px-8 py-3.5 font-bold" style={{ background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', color: PURPLE }}>Write a tribute</a>
//         </div>
//         <div className="mt-10 w-full max-w-md">
//           <p><span className="head text-4xl" style={{ color: GOLD_SOFT }}>{fmt(total)}</span><span className="ml-2 text-white/75">of {fmt(TARGET)} tributes</span></p>
//           <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20" role="img" aria-label={`${fmt(total)} of ${fmt(TARGET)} tributes`}>
//             <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #ec4899)', boxShadow: '0 0 14px rgba(252,211,77,.8)' }} />
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// /* Memorial: three portraits fanned like a card stack, all clearly visible. Static, no animation. */
// function Memorial() {
//   const card = 'absolute aspect-[4/5] w-[42%] overflow-hidden rounded-3xl border-2 shadow-2xl'
//   const frame: CSSProperties = { borderColor: 'rgba(232,196,106,0.85)', background: PURPLE, boxShadow: '0 0 60px rgba(236,72,153,.3), 0 0 36px rgba(245,158,11,.25), 0 20px 40px rgba(0,0,0,.35)' }
//   return (
//     <section id="life" className="relative px-5 pb-24 pt-4">
//       <div className="relative mx-auto w-full max-w-3xl" style={{ aspectRatio: '1 / 0.74' }}>
//         <div className={`${card} left-0 top-[7%]`} style={{ ...frame, transform: 'rotate(-7deg)' }}>
//           <Portrait alt="Deaconess Angel Oyakhilome" src={PHOTOS[0]} className="h-full w-full" />
//         </div>
//         <div className={`${card} right-0 top-[7%]`} style={{ ...frame, transform: 'rotate(7deg)' }}>
//           <Portrait alt="Deaconess Angel Oyakhilome" src={PHOTOS[2]} className="h-full w-full" />
//         </div>
//         <div className={`${card} left-1/2 top-0 z-10`} style={{ ...frame, transform: 'translateX(-50%)' }}>
//           <Portrait alt="Deaconess Angel Oyakhilome" src={PHOTOS[1]} className="h-full w-full" />
//         </div>
//       </div>
//       <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 rounded-[2rem] border-2 px-6 py-6 text-center" style={{ background: '#2a0a5e', borderColor: 'rgba(232,196,106,0.6)' }}>
//         <p className="flex flex-col items-center gap-3 text-xs font-bold uppercase tracking-wide sm:flex-row" style={{ color: GOLD_SOFT }}>
//           <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ background: '#fcd34d', color: PURPLE }}>88</span>
//           Celebrating 88 triumphant &amp; blessed years
//         </p>
//         <a href="#write" className="glow-btn btn-pulse rounded-full px-6 py-2.5 text-sm font-bold" style={{ background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', color: PURPLE }}>Write something beautiful ♥</a>
//       </div>
//     </section>
//   )
// }

// function QuoteBand() {
//   return (
//     <section className="relative text-white" style={{ background: `linear-gradient(120deg, ${PURPLE}, ${PURPLE_MID})` }}>
//       <GridOverlay />
//       <blockquote className="relative mx-auto max-w-3xl px-5 py-16 text-center">
//         <span aria-hidden="true" className="head text-7xl leading-none" style={{ color: GOLD }}>“</span>
//         <p className="head -mt-5 text-2xl leading-snug sm:text-3xl">Her children arise up, and call her blessed; her husband also, and he praiseth her. Many daughters have done virtuously, but thou excellest them all.</p>
//         <footer className="mt-5 text-sm uppercase tracking-widest" style={{ color: GOLD_SOFT }}>Proverbs 31:28-29</footer>
//       </blockquote>
//     </section>
//   )
// }

// function TLItem({ className, children }: { className: string; children: ReactNode }) {
//   const ref = useRef<HTMLLIElement>(null)
//   const [on, setOn] = useState(false)
//   useEffect(() => {
//     const el = ref.current
//     if (!el) return
//     const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.25 })
//     io.observe(el)
//     return () => io.disconnect()
//   }, [])
//   return <li ref={ref} className={`${className} tl-item ${on ? 'in' : ''}`}>{children}</li>
// }

// function Timeline() {
//   return (
//     <section className="mx-auto max-w-4xl px-5 py-20">
//       <h2 className="text-center text-4xl font-semibold" style={{ color: PURPLE }}>Her life, remembered</h2>
//       <ol className="relative mt-12">
//         <div aria-hidden="true" className="absolute bottom-2 left-3 top-2 w-px -translate-x-1/2 md:left-1/2" style={{ background: GOLD }} />
//         {LIFE.map((e, i) => {
//           const even = i % 2 === 0
//           const date = <p className={`head text-xl ${even ? 'md:text-right' : ''}`} style={{ color: PURPLE_MID }}>{e.when}</p>
//           const body = <div className={even ? '' : 'md:text-right'}><h3 className="font-semibold" style={{ color: PURPLE }}>{e.title}</h3><p className="mt-1 text-neutral-700">{e.text}</p></div>
//           return (
//             <TLItem key={e.when} className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-12 md:grid-cols-[1fr_1.5rem_1fr]">
//               <div className="hidden md:block">{even ? date : body}</div>
//               <div className="relative flex justify-center pt-1.5"><span className="tl-dot h-3 w-3 rounded-full" style={{ background: GOLD, boxShadow: `0 0 0 4px ${LILAC}` }} /></div>
//               <div>
//                 <div className="md:hidden">{date}<div className="mt-1">{body}</div></div>
//                 <div className="hidden md:block">{even ? body : date}</div>
//               </div>
//             </TLItem>
//           )
//         })}
//       </ol>
//     </section>
//   )
// }

// /* Each light = 10,000 tributes; lights glow brighter as the count rises. */
// function Lights({ total }: { total: number }) {
//   return (
//     <div role="img" aria-label={`${fmt(total)} of ${fmt(TARGET)} tributes`} className="grid w-full max-w-sm grid-cols-10 gap-2.5">
//       {Array.from({ length: 100 }, (_, i) => {
//         const f = Math.min(1, Math.max(0, total / 10_000 - i))
//         return <span key={i} className="aspect-square rounded-full transition-all duration-700"
//           style={{ background: i % 3 === 1 ? '#f9a8d4' : GOLD_SOFT, opacity: 0.18 + 0.82 * f, boxShadow: f > 0 ? `0 0 ${8 + 16 * f}px ${i % 3 === 1 ? '#ec4899' : GOLD}, 0 0 ${28 * f}px rgba(252,211,77,.35)` : 'none' }} />
//       })}
//     </div>
//   )
// }

// /* Lights block: now lives inside the same section as the form (no section wrapper of its own). */
// function Counter({ total }: { total: number }) {
//   return (
//     <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
//       <div>
//         <Pill dark>Lights of remembrance</Pill>
//         <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl shimmer" style={GRAD_TEXT}>One million lights for Big Mummy</h2>
//         <p className="mt-4 max-w-md" style={{ color: LILAC_TEXT }}>Every tribute lights one light. Each glowing light stands for 10,000 tributes.</p>
//       </div>
//       <div className="md:justify-self-end"><Lights total={total} /></div>
//     </div>
//   )
// }

// function Share({ zone, onClose }: { zone: string; onClose: () => void }) {
//   const z = zone.replace(/[^a-z0-9]/gi, '')
//   const text = `I just wrote a tribute for Big Mummy. Add yours! ${[...TAGS, z && `#${z}`].filter(Boolean).join(' ')} ${location.href}`
//   const [copied, setCopied] = useState(false)
//   const go = async () => {
//     if (navigator.share) { try { await navigator.share({ text }); return } catch { /* cancelled */ } }
//     await navigator.clipboard.writeText(text); setCopied(true)
//   }
//   return (
//     <div role="status" className="rounded-2xl p-6 text-white" style={{ background: PURPLE }}>
//       <h3 className="text-2xl font-semibold">Thank you. Your tribute is on the wall</h3>
//       <p className="mt-2 text-white/85">Share it on KingsChat so others add theirs.</p>
//       <p className="mt-4 break-words rounded-xl bg-white/10 p-4 text-sm">{text}</p>
//       <div className="mt-4 flex flex-wrap gap-3">
//         <button onClick={go} className="rounded-full px-6 py-2.5 font-semibold" style={{ background: GOLD, color: PURPLE }}>{copied ? 'Copied' : 'Share or copy'}</button>
//         <button onClick={onClose} className="rounded-full border border-white/40 px-6 py-2.5">Write another</button>
//       </div>
//     </div>
//   )
// }

// /* One section: One million lights + the tribute form.
//    Posting only adds the tribute to the page in memory. Nothing is saved anywhere yet. */
// function LightsAndForm({ total, onPosted }: { total: number; onPosted: (t: Tribute) => void }) {
//   const [msg, setMsg] = useState('')
//   const [role, setRole] = useState<string>('Youth')
//   const [done, setDone] = useState<string | null>(null)
//   const area = useRef<HTMLTextAreaElement>(null)

//   function submit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     const f = e.currentTarget, d = new FormData(f)
//     if (d.get('website')) return
//     const row = { name: String(d.get('name')).trim(), location: String(d.get('location')).trim() || null,
//       zone: String(d.get('zone')).trim() || null, role, message: msg.trim() }
//     onPosted({ ...row, id: `new-${Date.now()}`, hearts: 0, created_at: new Date().toISOString() })
//     setDone(row.zone ?? ''); setMsg(''); f.reset()
//   }
//   const inp = 'w-full rounded-2xl border px-5 py-3.5 text-white placeholder:text-white/45 focus:outline-none focus:ring-2'
//   const field: CSSProperties = { background: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.22)', '--tw-ring-color': GOLD } as CSSProperties
//   const label = 'grid gap-2 text-sm font-semibold uppercase tracking-wider'
//   const star = <span style={{ color: GOLD }}> *</span>
//   return (
//     <section id="write" className="relative scroll-mt-4 overflow-hidden px-5 py-20" style={{ background: `linear-gradient(160deg, #1b0840, ${PURPLE})` }}>
//       <GridOverlay />
//       <Aurora />
//       <div className="relative"><Counter total={total} /></div>

//       <div id="tribute-form" className="relative mx-auto mt-20 max-w-3xl scroll-mt-4">
//         <div className="text-center"><Pill dark>Celebration wall</Pill></div>
//         <h2 className="mt-4 text-center text-4xl font-bold sm:text-5xl shimmer" style={GRAD_TEXT}>Write a tribute</h2>
//         <p className="mt-3 text-center" style={{ color: LILAC_TEXT }}>Say thank you to Big Mummy in your own words. A sentence is enough. A prayer is welcome too.</p>
//         <div className="mt-10 rounded-[2rem] border p-6 shadow-2xl sm:p-10" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(14px)', boxShadow: '0 0 70px rgba(124,58,237,.45), inset 0 1px 0 rgba(255,255,255,.15)' }}>
//           {done !== null ? <Share zone={done} onClose={() => setDone(null)} /> : (
//             <form onSubmit={submit} className="grid gap-6">
//               <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <label className={label} style={{ color: GOLD_SOFT }}><span>Your full name{star}</span>
//                   <input name="name" required minLength={2} maxLength={80} placeholder="e.g. Grace Okafor" className={inp} style={field} /></label>
//                 <label className={label} style={{ color: GOLD_SOFT }}><span>City / country</span>
//                   <input name="location" maxLength={80} placeholder="e.g. Lagos, Nigeria" className={inp} style={field} /></label>
//               </div>
//               <label className={label} style={{ color: GOLD_SOFT }}><span>Zone <span className="font-normal normal-case tracking-normal text-white/60">(optional)</span></span>
//                 <input name="zone" maxLength={60} placeholder="Becomes your #ZoneName" className={inp} style={field} /></label>
//               <div>
//                 <p className={label} style={{ color: GOLD_SOFT }}>I am a</p>
//                 <div className="mt-2 flex flex-wrap gap-2.5">
//                   {ROLES.map(r => (
//                     <button type="button" key={r} onClick={() => setRole(r)} aria-pressed={role === r}
//                       className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
//                       style={role === r ? { background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', borderColor: '#f59e0b', color: PURPLE } : { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>{r}</button>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className={label} style={{ color: GOLD_SOFT }}><span>Write something beautiful about Big Mummy{star}</span>
//                   <textarea ref={area} value={msg} onChange={e => setMsg(e.target.value)} required minLength={5} maxLength={1500} rows={6}
//                     placeholder="Write your thoughts, prayers, thanksgiving and treasured memories of Mummy…" className={`${inp} normal-case tracking-normal font-normal`} style={field} /></label>
//                 <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
//                   <div className="flex flex-wrap gap-2">
//                     {STARTERS.map(s => <button type="button" key={s} onClick={() => { setMsg(msg ? `${msg} ${s}` : s); area.current?.focus() }}
//                       className="rounded-full border px-3 py-1 text-xs transition-colors hover:bg-white/10" style={{ borderColor: 'rgba(232,196,106,0.5)', color: GOLD_SOFT }}>{s}</button>)}
//                   </div>
//                   <span className="text-xs text-white/60">{msg.length} / 1500</span>
//                 </div>
//               </div>
//               <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <p className="text-sm text-white/65">Your tribute will be proudly displayed on the wall of lights.</p>
//                 <button className="glow-btn inline-flex shrink-0 items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider"
//                   style={{ background: `linear-gradient(90deg, ${GOLD_SOFT}, ${GOLD})`, color: PURPLE, }}>
//                   Post tribute
//                   <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
//                 </button>
//               </div>
//             </form>)}
//         </div>
//       </div>
//     </section>
//   )
// }

// function Card({ t }: { t: Tribute }) {
//   const [liked, setLiked] = useState(false)
//   const [n, setN] = useState(t.hearts)
//   const like = () => { if (liked) return; setLiked(true); setN(v => v + 1) }
//   return (
//     <li className="glow-card relative mb-5 break-inside-avoid overflow-hidden rounded-[2rem] border p-7" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fbf8ff 100%)', borderColor: '#efe6ff' }}>
//       <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: 'linear-gradient(90deg, #fcd34d, #f9a8d4, #c4b5fd)' }} />
//       <div className="flex items-center gap-3">
//         <span aria-hidden="true" className="head flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899 60%, #7c3aed)', boxShadow: '0 0 18px rgba(236,72,153,.45)' }}>{initials(t.name)}</span>
//         <div className="min-w-0">
//           <p className="truncate font-semibold">{t.name}</p>
//           <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
//             <span className="rounded-full px-3 py-0.5 text-xs font-semibold" style={{ background: '#fff4d6', color: '#8a5a00' }}>{t.role}</span>
//             {[t.zone, t.location].filter(Boolean).map(x => <span key={x}>{x}</span>)}
//           </p>
//         </div>
//       </div>
//       <p className="mt-5 whitespace-pre-line text-[1.02rem] leading-7 text-neutral-600">{t.message}</p>
//       <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: '#f1e8ff' }}>
//         <span className="text-xs text-neutral-400">{new Date(t.created_at).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
//         <button onClick={like} aria-pressed={liked} aria-label="Send love" className="rounded-full px-3 py-1.5 text-sm"
//           style={{ background: liked ? '#ffdcec' : '#fff1f7', color: PURPLE }}>
//           <span className={liked ? 'pop inline-block' : ''} style={{ color: '#ec4899' }}>{liked ? '♥' : '♡'}</span> {n}</button>
//       </div>
//     </li>
//   )
// }

// export default function App() {
//   const [items, setItems] = useState<Tribute[]>(SAMPLE_TRIBUTES)
//   const [role, setRole] = useState('All')
//   const [visible, setVisible] = useState(PAGE_SIZE)

//   const total = BASE_TOTAL + (items.length - SAMPLE_TRIBUTES.length)
//   const filtered = useMemo(() => items.filter(t =>
//     (role === 'All' || t.role === role)
//   ), [items, role])

//   return (
//     <div className="bm grid-light bg-white text-neutral-800">
//       <style>{FONTS}</style>
//       <div className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, #1b0840 0%, ${PURPLE} 60%, ${PURPLE_MID} 100%)` }}>
//         <GridOverlay />
//         <Aurora />
//         <Hero total={total} />
//         <Memorial />
//       </div>
//       <QuoteBand />
//       <Timeline />

//       <LightsAndForm total={total} onPosted={t => { setItems(p => [t, ...p]); setRole('All') }} />

//       <section id="tributes" className="mx-auto max-w-6xl px-5 py-20">
//         <div className="flex flex-wrap items-end justify-between gap-4">
//           <div>
//             <Pill>Celebration wall</Pill>
//             <h2 className="mt-3 text-4xl font-bold sm:text-5xl" style={{ color: PURPLE }}>Tributes</h2>
//             <p className="mt-2 text-neutral-600">Words of love from teenagers and youths around the world.</p>
//           </div>
//           <a href="#write" className="glow-btn rounded-full px-6 py-3 font-bold text-white" style={{ background: `linear-gradient(90deg, ${PURPLE_MID}, #7c3aed)`, boxShadow: '0 8px 26px rgba(124,58,237,.5)' }}>Write a tribute</a>
//         </div>
//         <div className="mt-8 flex flex-wrap items-center gap-2">
//           {['All', ...ROLES].map(r => <button key={r} onClick={() => { setRole(r); setVisible(PAGE_SIZE) }} aria-pressed={role === r}
//             className="rounded-full border px-4 py-1.5 text-sm"
//             style={role === r ? { background: PURPLE, color: '#fff', borderColor: PURPLE } : { background: '#fff', color: PURPLE, borderColor: GOLD }}>{r}</button>)}
//         </div>
//         {!filtered.length && <p className="mt-6">No tributes match yet. Be the first to write one.</p>}
//         <ul className="mt-8 columns-1 gap-5 md:columns-2 lg:columns-3">{filtered.slice(0, visible).map(t => <Card key={t.id} t={t} />)}</ul>
//         {filtered.length > visible && <div className="mt-4 text-center"><button onClick={() => setVisible(v => v + PAGE_SIZE)}
//           className="rounded-full border-2 px-8 py-3 font-semibold" style={{ borderColor: PURPLE, color: PURPLE }}>View more tributes</button></div>}
//       </section>

//       <footer className="relative px-5 py-10 text-white" style={{ background: PURPLE }}>
//         <GridOverlay />
//         <div className="relative mx-auto flex max-w-6xl flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
//           <p>Deaconess Angel Oyakhilome • A Glorious Celebration of 88 Triumphant Years.</p>
//           <p>© 2026 LoveWorld Teens &amp; Youth Ministry. All Rights Reserved.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }


import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import dcnImage from './assets/dcn.png'

/* ------------------------------------------------------------------
   UI ONLY. No database, no API, no extra imports.
   Everything below is local data so you can see the design.
   Later, swap `SAMPLE_TRIBUTES` for real data.
------------------------------------------------------------------- */

type Tribute = {
  id: string
  name: string
  location: string | null
  zone: string | null
  role: string
  message: string
  hearts: number
  created_at: string
}

const ROLES = ['Teenager', 'Youth', 'Church member', 'Leader / Pastor', 'Family & friend']
const TARGET = 1_000_000
const BASE_TOTAL = 24_318 // demo number for the counter and lights
const PAGE_SIZE = 6

const TAGS = ['#MinistryOfTeensAndYouth', '#1MillionTributesToBigMummy', '#CelebratingBigMummysLegacy']
const fmt = (n: number) => n.toLocaleString('en')

/* Single portrait image imported from src/assets/dcn.png. */
const PHOTO = dcnImage

/* Palette: purple, gold, white */
const PURPLE = '#2e1065'
const PURPLE_MID = '#4c1d95'
const GOLD = '#c9972b'
const GOLD_SOFT = '#e8c46a'
const LILAC = '#f7f3ff'

/* Colour pops copied from the reference: gradient headline text + pill badges. */
const GRAD_TEXT: CSSProperties = { background: 'linear-gradient(90deg, #fde68a 0%, #ffffff 50%, #fcd34d 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 22px rgba(252,211,77,0.35))' }
const LILAC_TEXT = '#d8c4f5'

function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
      style={dark ? { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.22)', color: GOLD_SOFT } : { background: LILAC, borderColor: '#e4d6fb', color: PURPLE_MID }}>
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: dark ? GOLD : '#f59e0b' }} />{children}
    </span>
  )
}

const STARTERS = [
  'Big Mummy, thank you for…',
  'The way she loved people taught me…',
  'One thing I will carry from her life is…',
  'Father, thank You for her life. Today I pray…',
]

const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '♥'

/* Edit these freely as you gather more verified details. */
const LIFE: { when: string; title: string; text: string }[] = [
  { when: '1938', title: 'Born', text: 'Aimiugwina Angel was born, a daughter of the Ojeme lineage of Ewu, Edo State.' },
  { when: 'A life of faith', title: 'Devoted to Christ', text: 'A devoted Christian known for her faith, humility and kindness to all who met her.' },
  { when: 'A mother of three', title: 'Matriarch', text: 'Mother of Pastor Chris Oyakhilome, Rev. Ken Oyakhilome and Kathy Woghiren, and mother to many more.' },
  { when: '25 September 2026', title: 'Passed into glory', text: 'She departed this earthly realm, leaving a legacy of love that will not fade.' },
]

/* Sample tributes, shown on the wall. */
const SAMPLE_TRIBUTES: Tribute[] = [
  { id: 't1', name: 'Adesola Uzorka', role: 'Leader / Pastor', zone: 'Lagos Sub Zone C', location: 'Lagos, Nigeria', hearts: 21, created_at: '2026-11-19T17:45:00Z',
    message: 'Dear Big Mummy,\n\nThank you for your life of love, faith and sacrifice. You loved God, you loved the Church, and you loved children. Your legacy will never be forgotten.\n\nMy prayer: Father, thank You for her life. Give us grace to love You the way she did, to serve the way she did. Comfort and strengthen the family, in Jesus’ name. Amen.' },
  { id: 't2', name: 'Grace Okafor', role: 'Youth', zone: 'Lagos Zone 1', location: 'Lagos, Nigeria', hearts: 12, created_at: '2026-11-19T10:00:00Z',
    message: 'Sweet Mummy, thank you for loving us the way you do. You were so caring and made sure we never lacked anything. I will carry your smile with me always.' },
  { id: 't3', name: 'Daniel Mensah', role: 'Teenager', zone: 'Accra Zone', location: 'Accra, Ghana', hearts: 8, created_at: '2026-11-19T08:30:00Z',
    message: 'Big Mummy lives on. Thank you for your kindness and your passion for souls. Till we meet again.' },
  { id: 't4', name: 'Eleanor Akhimien', role: 'Teenager', zone: 'Believers Loveworld Zone A', location: 'Ekpoma, Nigeria', hearts: 15, created_at: '2026-11-18T19:20:00Z',
    message: 'Big Mummy, I miss your smile. Jesus is taking good care of you now. I love you and I will be a good girl.' },
  { id: 't5', name: 'Amara Eze', role: 'Youth', zone: null, location: 'London, United Kingdom', hearts: 5, created_at: '2026-11-18T12:10:00Z',
    message: 'Thank you for every prayer and every smile. Because of you, so many of us learned what it means to love God and to love people.' },
  { id: 't6', name: 'Deaconess Dorothy Osaghae', role: 'Leader / Pastor', zone: 'Edmonton Zone', location: 'Edmonton, Canada', hearts: 18, created_at: '2026-11-18T09:05:00Z',
    message: 'Big Mummy was indeed an angel who lived among us. Loving, caring and prayerful. We celebrate you today and always.' },
  { id: 't7', name: 'Kelvin Dube', role: 'Teenager', zone: 'Harare Zone', location: 'Harare, Zimbabwe', hearts: 3, created_at: '2026-11-17T21:00:00Z',
    message: 'Ever joyful Big Mummy. Full of love and caring. Forever missed, forever in our hearts.' },
  { id: 't8', name: 'Esther Williams', role: 'Youth', zone: 'Cape Town Zone', location: 'Cape Town, South Africa', hearts: 9, created_at: '2026-11-17T09:15:00Z',
    message: 'Your legacy lives on in every child you prayed for. We will make you proud. Rest well, Big Mummy.' },
  { id: 't9', name: 'Sister Norah Veremu', role: 'Church member', zone: null, location: 'Kwekwe, Zimbabwe', hearts: 6, created_at: '2026-11-16T15:40:00Z',
    message: 'Thank you for the greatest gift you gave us, our Man of God. Forever missed. Love you dearly, Big Mummy.' },
  { id: 't10', name: 'Derron Akhimien', role: 'Teenager', zone: 'Believers Loveworld Zone A', location: 'Ekpoma, Nigeria', hearts: 11, created_at: '2026-11-16T11:00:00Z',
    message: 'Big Mummy, you are my hero. You loved God and you loved me. Even though you are in heaven, I will keep smiling because you are happy. I will make you proud.' },
  { id: 't11', name: 'Blessing Okonkwo', role: 'Family & friend', zone: null, location: 'Abuja, Nigeria', hearts: 7, created_at: '2026-11-15T18:30:00Z',
    message: 'A mother of mothers. Your smile was always amazing. Keep resting, ma, till we meet again. ❤️' },
  { id: 't12', name: 'Chiamaka Nwosu', role: 'Youth', zone: 'Enugu Zone', location: 'Enugu, Nigeria', hearts: 4, created_at: '2026-11-15T08:10:00Z',
    message: 'Father, thank You for Big Mummy’s life. Today I pray that her love for souls lives in every teenager and youth who calls on Your name. Amen.' },
]

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700&display=swap');
.bm { font-family: 'Mona Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; font-size: 1rem; }
.bm h1, .bm h2, .bm h3, .bm .head { font-family: 'Mona Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.01em; }
.bm input, .bm select, .bm textarea, .bm button { font-family: inherit; }
.bm .shimmer { background-size: 220% 100% !important; animation: bm-shimmer 7s ease-in-out infinite; }
@keyframes bm-shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.bm .glow-btn { box-shadow: 0 0 0 1px rgba(252,211,77,.55), 0 8px 28px rgba(245,158,11,.5), 0 0 48px rgba(236,72,153,.3); transition: transform .2s ease, box-shadow .2s ease; }
.bm .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(252,211,77,.8), 0 12px 36px rgba(245,158,11,.65), 0 0 70px rgba(236,72,153,.45); }
.bm .glow-card { transition: transform .35s ease, box-shadow .35s ease; box-shadow: 0 12px 34px rgba(124,58,237,.09); }
.bm .glow-card:hover { transform: translateY(-3px); box-shadow: 0 22px 50px rgba(124,58,237,.16), 0 0 0 1px rgba(236,72,153,.18); }
.bm .grid-light { background-image: linear-gradient(rgba(76,29,149,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(76,29,149,.08) 1px, transparent 1px); background-size: 140px 140px; }
.bm .grid-dark { background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px); background-size: 140px 140px; }
@keyframes bm-ring { 0% { transform: scale(.8); opacity: .9; } 100% { transform: scale(2.6); opacity: 0; } }
@keyframes bm-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.07); } }
.bm .tl-item { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
.bm .tl-item.in { opacity: 1; transform: none; }
.bm .tl-dot { position: relative; }
.bm .tl-dot::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; border: 2px solid #c9972b; animation: bm-ring 2.2s ease-out infinite; }
.bm .btn-pulse { animation: bm-pulse 2.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .bm .tl-item { opacity: 1; transform: none; transition: none; } .bm .tl-dot::after, .bm .btn-pulse { animation: none; } }
@media (prefers-reduced-motion: reduce) { .bm .shimmer { animation: none; } .bm .glow-btn, .bm .glow-card { transition: none; } }
`

/* Hero: no background image, no "Read tributes" button, no marquee. Background comes from the shared wrapper. */
function GridOverlay() {
  return <div aria-hidden="true" className="grid-dark pointer-events-none absolute inset-0" />
}

function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl" style={{ background: '#ec4899' }} />
      <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl" style={{ background: '#7c3aed' }} />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: '#f59e0b' }} />
    </div>
  )
}

function Hero({ total }: { total: number }) {
  const pct = Math.min(100, Math.max(total > 0 ? 1 : 0, (total / TARGET) * 100))
  return (
    <header id="top" className="relative overflow-hidden text-white">
      <div className="relative mx-auto flex min-h-[34rem] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center sm:min-h-[44rem]">
        <Pill dark>A Celebration of a Glorious Life Well Lived</Pill>
        <h1 className="mt-6 text-5xl font-bold leading-[1.08] sm:text-7xl shimmer" style={GRAD_TEXT}>Celebrating Big Mommy’s Legacy</h1>
        <p className="head mt-5 text-xl font-semibold sm:text-2xl"><span style={{ color: '#e9d5ff' }}>Deaconess Angel Oyakhilome</span><span style={{ color: '#fcd34d' }}> • 1938 – 2026 (88 Years)</span></p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: LILAC_TEXT }}>Forever in our hearts • Thank you Mummy for your glorious legacy of love, faith, motherly warmth, and devotion to children around the world.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#write" className="glow-btn rounded-full px-8 py-3.5 font-bold" style={{ background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', color: PURPLE }}>Write a tribute</a>
        </div>
        <div className="mt-10 w-full max-w-md">
          <p><span className="head text-4xl" style={{ color: GOLD_SOFT }}>{fmt(total)}</span><span className="ml-2 text-white/75">of {fmt(TARGET)} tributes</span></p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20" role="img" aria-label={`${fmt(total)} of ${fmt(TARGET)} tributes`}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #ec4899)', boxShadow: '0 0 14px rgba(252,211,77,.8)' }} />
          </div>
        </div>
      </div>
    </header>
  )
}

/* Memorial: three portraits fanned like a card stack, all clearly visible. Static, no animation. */
function Memorial() {
  return (
    <section id="life" className="relative px-5 pb-24 pt-4">
      <div
        className="mx-auto w-fit max-w-full overflow-hidden rounded-[2rem] border-[3px] shadow-[0_18px_60px_rgba(0,0,0,.35)]"
        style={{
          borderColor: 'rgba(232,196,106,.8)',
          background: '#2e0755',
        }}
      >
        {/* One wide memorial image, presented as a single banner */}
        <div className="relative w-full overflow-hidden bg-[#2e0755]">
          <img
            src={PHOTO}
            alt="Deaconess Angel Oyakhilome"
            className="mx-auto block h-auto max-h-[26rem] w-auto max-w-full object-contain object-center sm:max-h-[30rem]"
          />
        </div>

        {/* Anniversary badge strip styled like the supplied reference */}
        <div className="flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
              style={{ background: '#fbbf24', color: '#2e1065' }}
            >
              88
            </span>
            <p
              className="text-sm font-extrabold uppercase tracking-wide sm:text-base"
              style={{ color: '#fde047' }}
            >
              Celebrating 88 Triumphant &amp; Blessed Years
            </p>
          </div>

          <a
            href="#write"
            className="glow-btn btn-pulse inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-sm font-extrabold text-white"
            style={{ background: '#ff850f' }}
          >
            Write Something Beautiful <span aria-hidden="true">♥</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function QuoteBand() {
  return (
    <section className="relative text-white" style={{ background: `linear-gradient(120deg, ${PURPLE}, ${PURPLE_MID})` }}>
      <GridOverlay />
      <blockquote className="relative mx-auto max-w-3xl px-5 py-16 text-center">
        <span aria-hidden="true" className="head text-7xl leading-none" style={{ color: GOLD }}>“</span>
        <p className="head -mt-5 text-2xl leading-snug sm:text-3xl">Her children arise up, and call her blessed; her husband also, and he praiseth her. Many daughters have done virtuously, but thou excellest them all.</p>
        <footer className="mt-5 text-sm uppercase tracking-widest" style={{ color: GOLD_SOFT }}>Proverbs 31:28-29</footer>
      </blockquote>
    </section>
  )
}

function TLItem({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <li ref={ref} className={`${className} tl-item ${on ? 'in' : ''}`}>{children}</li>
}

function Timeline() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <h2 className="text-center text-4xl font-semibold" style={{ color: PURPLE }}>Her life, remembered</h2>
      <ol className="relative mt-12">
        <div aria-hidden="true" className="absolute bottom-2 left-3 top-2 w-px -translate-x-1/2 md:left-1/2" style={{ background: GOLD }} />
        {LIFE.map((e, i) => {
          const even = i % 2 === 0
          const date = <p className={`head text-xl ${even ? 'md:text-right' : ''}`} style={{ color: PURPLE_MID }}>{e.when}</p>
          const body = <div className={even ? '' : 'md:text-right'}><h3 className="font-semibold" style={{ color: PURPLE }}>{e.title}</h3><p className="mt-1 text-neutral-700">{e.text}</p></div>
          return (
            <TLItem key={e.when} className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-12 md:grid-cols-[1fr_1.5rem_1fr]">
              <div className="hidden md:block">{even ? date : body}</div>
              <div className="relative flex justify-center pt-1.5"><span className="tl-dot h-3 w-3 rounded-full" style={{ background: GOLD, boxShadow: `0 0 0 4px ${LILAC}` }} /></div>
              <div>
                <div className="md:hidden">{date}<div className="mt-1">{body}</div></div>
                <div className="hidden md:block">{even ? body : date}</div>
              </div>
            </TLItem>
          )
        })}
      </ol>
    </section>
  )
}

/* Each light = 10,000 tributes; lights glow brighter as the count rises. */
function Lights({ total }: { total: number }) {
  return (
    <div role="img" aria-label={`${fmt(total)} of ${fmt(TARGET)} tributes`} className="grid w-full max-w-sm grid-cols-10 gap-2.5">
      {Array.from({ length: 100 }, (_, i) => {
        const f = Math.min(1, Math.max(0, total / 10_000 - i))
        return <span key={i} className="aspect-square rounded-full transition-all duration-700"
          style={{ background: i % 3 === 1 ? '#f9a8d4' : GOLD_SOFT, opacity: 0.18 + 0.82 * f, boxShadow: f > 0 ? `0 0 ${8 + 16 * f}px ${i % 3 === 1 ? '#ec4899' : GOLD}, 0 0 ${28 * f}px rgba(252,211,77,.35)` : 'none' }} />
      })}
    </div>
  )
}

/* Lights block: now lives inside the same section as the form (no section wrapper of its own). */
function Counter({ total }: { total: number }) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
      <div>
        <Pill dark>Lights of remembrance</Pill>
        <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl shimmer" style={GRAD_TEXT}>One million lights for Big Mummy</h2>
        <p className="mt-4 max-w-md" style={{ color: LILAC_TEXT }}>Every tribute lights one light. Each glowing light stands for 10,000 tributes.</p>
      </div>
      <div className="md:justify-self-end"><Lights total={total} /></div>
    </div>
  )
}

function Share({ zone, onClose }: { zone: string; onClose: () => void }) {
  const z = zone.replace(/[^a-z0-9]/gi, '')
  const text = `I just wrote a tribute for Big Mummy. Add yours! ${[...TAGS, z && `#${z}`].filter(Boolean).join(' ')} ${location.href}`
  const [copied, setCopied] = useState(false)
  const go = async () => {
    if (navigator.share) { try { await navigator.share({ text }); return } catch { /* cancelled */ } }
    await navigator.clipboard.writeText(text); setCopied(true)
  }
  return (
    <div role="status" className="rounded-2xl p-6 text-white" style={{ background: PURPLE }}>
      <h3 className="text-2xl font-semibold">Thank you. Your tribute is on the wall</h3>
      <p className="mt-2 text-white/85">Share it on KingsChat so others add theirs.</p>
      <p className="mt-4 break-words rounded-xl bg-white/10 p-4 text-sm">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={go} className="rounded-full px-6 py-2.5 font-semibold" style={{ background: GOLD, color: PURPLE }}>{copied ? 'Copied' : 'Share or copy'}</button>
        <button onClick={onClose} className="rounded-full border border-white/40 px-6 py-2.5">Write another</button>
      </div>
    </div>
  )
}

/* One section: One million lights + the tribute form.
   Posting only adds the tribute to the page in memory. Nothing is saved anywhere yet. */
function LightsAndForm({ total, onPosted }: { total: number; onPosted: (t: Tribute) => void }) {
  const [msg, setMsg] = useState('')
  const [role, setRole] = useState<string>('Youth')
  const [done, setDone] = useState<string | null>(null)
  const area = useRef<HTMLTextAreaElement>(null)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget, d = new FormData(f)
    if (d.get('website')) return
    const row = { name: String(d.get('name')).trim(), location: String(d.get('location')).trim() || null,
      zone: String(d.get('zone')).trim() || null, role, message: msg.trim() }
    onPosted({ ...row, id: `new-${Date.now()}`, hearts: 0, created_at: new Date().toISOString() })
    setDone(row.zone ?? ''); setMsg(''); f.reset()
  }
  const inp = 'w-full rounded-2xl border px-5 py-3.5 text-white placeholder:text-white/45 focus:outline-none focus:ring-2'
  const field: CSSProperties = { background: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.22)', '--tw-ring-color': GOLD } as CSSProperties
  const label = 'grid gap-2 text-sm font-semibold uppercase tracking-wider'
  const star = <span style={{ color: GOLD }}> *</span>
  return (
    <section id="write" className="relative scroll-mt-4 overflow-hidden px-5 py-20" style={{ background: `linear-gradient(160deg, #1b0840, ${PURPLE})` }}>
      <GridOverlay />
      <Aurora />
      <div className="relative"><Counter total={total} /></div>

      <div id="tribute-form" className="relative mx-auto mt-20 max-w-3xl scroll-mt-4">
        <div className="text-center"><Pill dark>Celebration wall</Pill></div>
        <h2 className="mt-4 text-center text-4xl font-bold sm:text-5xl shimmer" style={GRAD_TEXT}>Write a tribute</h2>
        <p className="mt-3 text-center" style={{ color: LILAC_TEXT }}>Say thank you to Big Mummy in your own words. A sentence is enough. A prayer is welcome too.</p>
        <div className="mt-10 rounded-[2rem] border p-6 shadow-2xl sm:p-10" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(14px)', boxShadow: '0 0 70px rgba(124,58,237,.45), inset 0 1px 0 rgba(255,255,255,.15)' }}>
          {done !== null ? <Share zone={done} onClose={() => setDone(null)} /> : (
            <form onSubmit={submit} className="grid gap-6">
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={label} style={{ color: GOLD_SOFT }}><span>Your full name{star}</span>
                  <input name="name" required minLength={2} maxLength={80} placeholder="e.g. Grace Okafor" className={inp} style={field} /></label>
                <label className={label} style={{ color: GOLD_SOFT }}><span>City / country</span>
                  <input name="location" maxLength={80} placeholder="e.g. Lagos, Nigeria" className={inp} style={field} /></label>
              </div>
              <label className={label} style={{ color: GOLD_SOFT }}><span>Zone <span className="font-normal normal-case tracking-normal text-white/60">(optional)</span></span>
                <input name="zone" maxLength={60} placeholder="Becomes your #ZoneName" className={inp} style={field} /></label>
              <div>
                <p className={label} style={{ color: GOLD_SOFT }}>I am a</p>
                <div className="mt-2 flex flex-wrap gap-2.5">
                  {ROLES.map(r => (
                    <button type="button" key={r} onClick={() => setRole(r)} aria-pressed={role === r}
                      className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                      style={role === r ? { background: 'linear-gradient(90deg, #fcd34d, #f59e0b)', borderColor: '#f59e0b', color: PURPLE } : { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={label} style={{ color: GOLD_SOFT }}><span>Write something beautiful about Big Mummy{star}</span>
                  <textarea ref={area} value={msg} onChange={e => setMsg(e.target.value)} required minLength={5} maxLength={1500} rows={6}
                    placeholder="Write your thoughts, prayers, thanksgiving and treasured memories of Mummy…" className={`${inp} normal-case tracking-normal font-normal`} style={field} /></label>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {STARTERS.map(s => <button type="button" key={s} onClick={() => { setMsg(msg ? `${msg} ${s}` : s); area.current?.focus() }}
                      className="rounded-full border px-3 py-1 text-xs transition-colors hover:bg-white/10" style={{ borderColor: 'rgba(232,196,106,0.5)', color: GOLD_SOFT }}>{s}</button>)}
                  </div>
                  <span className="text-xs text-white/60">{msg.length} / 1500</span>
                </div>
              </div>
              <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/65">Your tribute will be proudly displayed on the wall of lights.</p>
                <button className="glow-btn inline-flex shrink-0 items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider"
                  style={{ background: `linear-gradient(90deg, ${GOLD_SOFT}, ${GOLD})`, color: PURPLE, }}>
                  Post tribute
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
                </button>
              </div>
            </form>)}
        </div>
      </div>
    </section>
  )
}

function Card({ t }: { t: Tribute }) {
  const [liked, setLiked] = useState(false)
  const [n, setN] = useState(t.hearts)
  const like = () => { if (liked) return; setLiked(true); setN(v => v + 1) }
  return (
    <li className="glow-card relative mb-5 break-inside-avoid overflow-hidden rounded-[2rem] border p-7" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fbf8ff 100%)', borderColor: '#efe6ff' }}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: 'linear-gradient(90deg, #fcd34d, #f9a8d4, #c4b5fd)' }} />
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="head flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899 60%, #7c3aed)', boxShadow: '0 0 18px rgba(236,72,153,.45)' }}>{initials(t.name)}</span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{t.name}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
            <span className="rounded-full px-3 py-0.5 text-xs font-semibold" style={{ background: '#fff4d6', color: '#8a5a00' }}>{t.role}</span>
            {[t.zone, t.location].filter(Boolean).map((x, i) => <span key={`${i}-${x}`}>{x}</span>)}
          </p>
        </div>
      </div>
      <p className="mt-5 whitespace-pre-line text-[1.02rem] leading-7 text-neutral-600">{t.message}</p>
      <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: '#f1e8ff' }}>
        <span className="text-xs text-neutral-400">{new Date(t.created_at).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <button onClick={like} aria-pressed={liked} aria-label="Send love" className="rounded-full px-3 py-1.5 text-sm"
          style={{ background: liked ? '#ffdcec' : '#fff1f7', color: PURPLE }}>
          <span className={liked ? 'pop inline-block' : ''} style={{ color: '#ec4899' }}>{liked ? '♥' : '♡'}</span> {n}</button>
      </div>
    </li>
  )
}

export default function App() {
  const [items, setItems] = useState<Tribute[]>(SAMPLE_TRIBUTES)
  const [role, setRole] = useState('All')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const total = BASE_TOTAL + (items.length - SAMPLE_TRIBUTES.length)
  const filtered = useMemo(() => items.filter(t =>
    (role === 'All' || t.role === role)
  ), [items, role])

  return (
    <div className="bm grid-light bg-white text-neutral-800">
      <style>{FONTS}</style>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, #1b0840 0%, ${PURPLE} 60%, ${PURPLE_MID} 100%)` }}>
        <GridOverlay />
        <Aurora />
        <Hero total={total} />
        <Memorial />
      </div>
      <QuoteBand />
      <Timeline />

      <LightsAndForm total={total} onPosted={t => { setItems(p => [t, ...p]); setRole('All') }} />

      <section id="tributes" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Pill>Celebration wall</Pill>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl" style={{ color: PURPLE }}>Tributes</h2>
            <p className="mt-2 text-neutral-600">Words of love from teenagers and youths around the world.</p>
          </div>
          <a href="#write" className="glow-btn rounded-full px-6 py-3 font-bold text-white" style={{ background: `linear-gradient(90deg, ${PURPLE_MID}, #7c3aed)`, boxShadow: '0 8px 26px rgba(124,58,237,.5)' }}>Write a tribute</a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {['All', ...ROLES].map(r => <button key={r} onClick={() => { setRole(r); setVisible(PAGE_SIZE) }} aria-pressed={role === r}
            className="rounded-full border px-4 py-1.5 text-sm"
            style={role === r ? { background: PURPLE, color: '#fff', borderColor: PURPLE } : { background: '#fff', color: PURPLE, borderColor: GOLD }}>{r}</button>)}
        </div>
        {!filtered.length && <p className="mt-6">No tributes match yet. Be the first to write one.</p>}
        <ul className="mt-8 columns-1 gap-5 md:columns-2 lg:columns-3">{filtered.slice(0, visible).map(t => <Card key={t.id} t={t} />)}</ul>
        {filtered.length > visible && <div className="mt-4 text-center"><button onClick={() => setVisible(v => v + PAGE_SIZE)}
          className="rounded-full border-2 px-8 py-3 font-semibold" style={{ borderColor: PURPLE, color: PURPLE }}>View more tributes</button></div>}
      </section>

      <footer className="relative px-5 py-10 text-white" style={{ background: PURPLE }}>
        <GridOverlay />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>Deaconess Angel Oyakhilome • A Glorious Celebration of 88 Triumphant Years.</p>
          <p>© 2026 LoveWorld Teens &amp; Youth Ministry. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}