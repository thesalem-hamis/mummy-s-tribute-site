import { mockApi } from './mock'
import { supabaseApi } from './superbase'
import type { TributeApi } from './types'

// No .env yet -> sample data, so the UI runs on its own. Add the Supabase keys and it goes live.
export const api: TributeApi = import.meta.env.VITE_SUPABASE_URL ? supabaseApi : mockApi