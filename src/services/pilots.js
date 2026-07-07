/** Service profil pilote (table `pilots`). */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export async function getMyProfile(userId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase.from('pilots').select('*').eq('id', userId).single();
  if (error) {
    console.warn('[Lagoon] Profil pilote introuvable :', error.message);
    return null;
  }
  return data;
}

export async function updateMyProfile(userId, fields) {
  if (!isSupabaseConfigured || !userId) {
    return { error: { message: "Supabase n'est pas configuré." } };
  }
  const { error } = await supabase.from('pilots').update(fields).eq('id', userId);
  return { error };
}

/** Classement public des pilotes (vue SQL `leaderboard`). */
export async function getLeaderboard() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('points', { ascending: false })
    .order('hours', { ascending: false });
  if (error) {
    console.warn('[Lagoon] Classement indisponible :', error.message);
    return [];
  }
  return data;
}
