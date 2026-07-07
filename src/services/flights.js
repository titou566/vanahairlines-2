/**
 * Service vols / routes — V2.1
 *
 * Lit les données depuis Supabase (tables `fleet` et `routes`).
 * Si Supabase n'est pas configuré ou en cas d'erreur réseau,
 * bascule automatiquement sur les données locales de constants.js :
 * le site ne casse jamais.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { ROUTES, FLEET } from '../utils/constants.js';

/** Formate 6300 -> "6 300 km" */
function formatRange(km) {
  if (km == null) return '—';
  return `${km.toLocaleString('fr-FR')} km`;
}

export async function getFleet() {
  if (!isSupabaseConfigured) return FLEET;

  const { data, error } = await supabase
    .from('fleet')
    .select('*')
    .order('range_km', { ascending: true });

  if (error || !data?.length) {
    console.warn('[Lagoon] Lecture Supabase fleet impossible, fallback local.', error?.message);
    return FLEET;
  }

  // Normalise les colonnes SQL vers le format attendu par les composants
  return data.map((a) => ({
    name: a.name,
    code: a.code,
    manufacturer: a.manufacturer,
    role: a.role,
    description: a.description,
    range: formatRange(a.range_km),
    pax: a.pax,
    cruise: a.cruise,
  }));
}

export async function getRoutes() {
  if (!isSupabaseConfigured) return ROUTES;

  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .eq('active', true)
    .order('flight_number', { ascending: true });

  if (error || !data?.length) {
    console.warn('[Lagoon] Lecture Supabase routes impossible, fallback local.', error?.message);
    return ROUTES;
  }

  return data.map((r) => ({
    fn: r.flight_number,
    dep: r.departure_icao,
    arr: r.arrival_icao,
    aircraft: r.aircraft_code,
    block: r.block_time,
  }));
}
