/** Service annonces / NOTAM de la compagnie (table `news`). */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export async function getNews(limit = 10) {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.warn('[Lagoon] Lecture annonces :', error.message);
    return [];
  }
  return data;
}

export async function addNews({ title, content, author }) {
  const { error } = await supabase.from('news').insert({ title, content, author });
  return { error };
}

export async function deleteNews(id) {
  const { error } = await supabase.from('news').delete().eq('id', id);
  return { error };
}
