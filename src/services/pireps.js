/** Service PIREPs (table `pireps`). */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export async function getMyPireps(userId) {
  if (!isSupabaseConfigured || !userId) return [];
  const { data, error } = await supabase
    .from('pireps')
    .select('*, routes(flight_number, departure_icao, arrival_icao)')
    .eq('pilot_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[Lagoon] Lecture PIREPs impossible :', error.message);
    return [];
  }
  return data;
}

export async function submitPirep({ pilotId, routeId, flightDate, flightTime, comments }) {
  if (!isSupabaseConfigured) {
    return { error: { message: "Supabase n'est pas configuré." } };
  }
  const { error } = await supabase.from('pireps').insert({
    pilot_id: pilotId,
    route_id: routeId,
    flight_date: flightDate,
    flight_time: flightTime,
    comments,
  });
  return { error };
}

/** Récupère les routes actives avec leur id (pour le formulaire PIREP). */
export async function getRoutesForPirep() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('routes')
    .select('id, flight_number, departure_icao, arrival_icao, block_time')
    .eq('active', true)
    .order('flight_number');
  if (error) return [];
  return data;
}
