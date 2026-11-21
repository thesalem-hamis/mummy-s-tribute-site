import { createClient } from '@supabase/supabase-js'
import { PAGE_SIZE, type Tribute, type TributeApi } from './types'

const db = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_ANON_KEY as string)
const COLS = 'id,name,email,location,zone,role,message,hearts,created_at'

export const supabaseApi: TributeApi = {
  async list({ role, zone, before }) {
    let q = db.from('tributes').select(COLS).order('created_at', { ascending: false }).limit(PAGE_SIZE)
    if (role && role !== 'All') q = q.eq('role', role)
    if (zone?.trim()) q = q.ilike('zone', `%${zone.trim().replace(/[%_\\]/g, '')}%`)
    if (before) q = q.lt('created_at', before)
    const { data, error } = await q
    if (error) throw error
    return data as Tribute[]
  },
  async total() {
    const { data, error } = await db.from('tribute_stats').select('total').eq('id', 1).single()
    if (error) throw error
    return Number(data.total)
  },
  async zones() {
    const { data, error } = await db.from('zone_stats').select('label,total').order('total', { ascending: false }).limit(8)
    if (error) throw error
    return data.map(r => ({ label: r.label, total: Number(r.total) }))
  },
  async post(t) { const { error } = await db.from('tributes').insert(t); return error?.message ?? null },
  async heart(id) { await db.rpc('send_heart', { tribute_id: id }) },
}