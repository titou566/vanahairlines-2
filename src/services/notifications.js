/** Notifications pilotes (table `notifications`). */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export async function getMyNotifications(userId, limit = 15) {
  if (!isSupabaseConfigured || !userId) return [];
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('pilot_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.warn('[Lagoon] Notifications :', error.message);
    return [];
  }
  return data;
}

export async function markAllRead(userId) {
  if (!isSupabaseConfigured || !userId) return;
  await supabase.from('notifications').update({ read: true }).eq('pilot_id', userId).eq('read', false);
}

/** Utilisé par le staff (approbation/refus de PIREP, annonces ciblées...). */
export async function notify(pilotId, title, body = null) {
  if (!isSupabaseConfigured) return { error: null };
  const { error } = await supabase.from('notifications').insert({ pilot_id: pilotId, title, body });
  return { error };
}
