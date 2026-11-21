export const ROLES = ['Teenager', 'Youth', 'Church member', 'Leader / Pastor', 'Family & friend'] as const
export const TARGET = 1_000_000
export const BASE_TOTAL = 24_318
export const PAGE_SIZE = 20

export type Tribute = {
  id: string
  name: string
  location: string | null
  zone: string | null
  role: (typeof ROLES)[number]
  message: string
  hearts: number
  created_at: string
}
export type NewTribute = Pick<Tribute, 'name' | 'location' | 'zone' | 'role' | 'message'>
export type ZoneRow = { label: string; total: number }
export type ListOpts = { role?: string; zone?: string; before?: string }

/** The only surface the UI talks to. Swap implementations in api.ts, never touch components. */
export interface TributeApi {
  list(o: ListOpts): Promise<Tribute[]>
  total(): Promise<number>
  zones(): Promise<ZoneRow[]>
  /** resolves to an error message, or null on success */
  post(t: NewTribute): Promise<string | null>
  heart(id: string): Promise<void>
}