import { PAGE_SIZE, ROLES, type Tribute, type TributeApi } from './types'

// Sample data for building the UI. Names and messages are invented placeholders.
const MSGS = [
  'Thank you, Big Mummy, for a life that made love look easy.',
  'I am 16 and I want to grow up to be as faithful as you were. Rest well, ma.',
  'Our zone gathered tonight to celebrate you. We sang, we laughed, we thanked God for your life.',
  'You loved children like they were your own. I felt that every time I saw you smile.',
  'Father, thank You for her life. Let this generation carry her kindness to the ends of the earth.',
  'From Accra to Abuja to Atlanta, young people are saying the same thing: thank you.',
  'I never met you, ma, but your legacy reached me through the people who love you.',
  'My little sister drew you a picture today. She said it is for Big Mummy in heaven.',
]
const NAMES = ['Tola A.', 'Chidi O.', 'Naledi M.', 'Esther K.', 'David N.', 'Grace T.', 'Samuel B.', 'Ruth E.', 'Isaac P.', 'Amara U.']
const ZONES = ['Lagos Zone 1', 'Abuja Zone 1', 'South Africa Zone 2', 'UK Zone 1', 'Ghana Zone', 'Kenya Zone', 'Canada Zone', null]
const PLACES = ['Lagos, Nigeria', 'Accra, Ghana', 'Pretoria, South Africa', 'London, UK', 'Nairobi, Kenya', 'Toronto, Canada', null]

const now = Date.now()
const seed: Tribute[] = Array.from({ length: 64 }, (_, i) => ({
  id: `mock-${i}`, name: NAMES[i % NAMES.length], location: PLACES[i % PLACES.length], zone: ZONES[(i * 3) % ZONES.length],
  role: ROLES[(i * 2) % ROLES.length], message: MSGS[(i * 5) % MSGS.length], hearts: (i * 7) % 23,
  created_at: new Date(now - i * 7 * 60_000).toISOString(),
}))

const wait = <T,>(v: T, ms = 350) => new Promise<T>(r => setTimeout(() => r(v), ms))
let extra = 0

export const mockApi: TributeApi = {
  list: ({ role, zone, before }) => wait(
    seed.filter(t => (!role || role === 'All' || t.role === role)
      && (!zone || (t.zone ?? '').toLowerCase().includes(zone.toLowerCase()))
      && (!before || t.created_at < before)).slice(0, PAGE_SIZE)),
  total: () => wait(312_480 + extra, 150),
  zones: () => wait([['Lagos Zone 1', 41200], ['Abuja Zone 1', 36850], ['South Africa Zone 2', 29400], ['UK Zone 1', 22110],
    ['Ghana Zone', 18975], ['Kenya Zone', 12300], ['Canada Zone', 9420], ['Ekpoma Zone', 6100]].map(([label, total]) => ({ label: label as string, total: total as number })), 200),
  post: async t => { extra++; seed.unshift({ ...t, id: crypto.randomUUID(), hearts: 0, created_at: new Date().toISOString() }); return wait(null, 500) },
  heart: async id => { const t = seed.find(s => s.id === id); if (t) t.hearts++ },
}