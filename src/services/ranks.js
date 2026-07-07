/** Chargement des grades depuis Supabase (table `ranks`), avec cache et fallback. */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { DEFAULT_RANKS } from '../utils/ranks.js';

let cache = null;

export async function getRanks() {
  if (cache) return cache;
  if (!isSupabaseConfigured) return DEFAULT_RANKS;

  const { data, error } = await supabase
    .from('ranks')
    .select('*')
    .order('min_hours', { ascending: true });

  if (error || !data?.length) {
    console.warn('[Lagoon] Grades : fallback local.', error?.message);
    return DEFAULT_RANKS;
  }
  cache = data;
  return data;
}

export function clearRanksCache() {
  cache = null;
}

/* ----- CRUD staff ----- */
export async function addRank(rank) {
  const { error } = await supabase.from('ranks').insert(rank);
  clearRanksCache();
  return { error };
}

export async function updateRank(id, fields) {
  const { error } = await supabase.from('ranks').update(fields).eq('id', id);
  clearRanksCache();
  return { error };
}

export async function deleteRank(id) {
  const { error } = await supabase.from('ranks').delete().eq('id', id);
  clearRanksCache();
  return { error };
}
