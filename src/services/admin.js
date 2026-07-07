/** Service administration (staff / CEO). Protégé côté base par RLS + is_staff(). */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { getRank, pointsForFlight } from '../utils/ranks.js';
import { getRanks } from './ranks.js';
import { notify } from './notifications.js';

export async function getPendingPireps() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('pireps')
    .select('*, routes(flight_number, departure_icao, arrival_icao), pilots(first_name, callsign, ivao_vid)')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });
  if (error) {
    console.warn('[Lagoon][admin] pireps :', error.message);
    return [];
  }
  return data;
}

/** Approuve un PIREP : statut + crédit des heures, points et grade du pilote. */
export async function approvePirep(pirep) {
  const { error: e1 } = await supabase.from('pireps').update({ status: 'approved' }).eq('id', pirep.id);
  if (e1) return { error: e1 };

  const { data: pilot, error: e2 } = await supabase
    .from('pilots')
    .select('hours, points')
    .eq('id', pirep.pilot_id)
    .single();
  if (e2) return { error: e2 };

  const newHours = Number(pilot.hours ?? 0) + Number(pirep.flight_time ?? 0);
  const newPoints = Number(pilot.points ?? 0) + pointsForFlight(pirep.flight_time);
  const ranks = await getRanks();

  const { error: e3 } = await supabase
    .from('pilots')
    .update({ hours: newHours, points: newPoints, rank: getRank(newHours, ranks).name })
    .eq('id', pirep.pilot_id);

  if (!e3) {
    await notify(
      pirep.pilot_id,
      '✅ PIREP approuvé',
      `${pirep.routes?.flight_number ?? 'Votre vol'} — +${pirep.flight_time} h et +${pointsForFlight(pirep.flight_time)} points crédités.`
    );
  }
  return { error: e3 };
}

export async function rejectPirep(pirep) {
  const { error } = await supabase.from('pireps').update({ status: 'rejected' }).eq('id', pirep.id);
  if (!error) {
    await notify(pirep.pilot_id, '❌ PIREP refusé', `${pirep.routes?.flight_number ?? 'Votre vol'} — contactez le staff pour plus de détails.`);
  }
  return { error };
}

export async function getAllPilots() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase.from('pilots').select('*').order('hours', { ascending: false });
  if (error) {
    console.warn('[Lagoon][admin] pilots :', error.message);
    return [];
  }
  return data;
}

export async function updatePilot(pilotId, fields) {
  // Si les heures changent, on resynchronise le grade automatiquement
  if (fields.hours != null) {
    const ranks = await getRanks();
    fields.rank = getRank(Number(fields.hours), ranks).name;
  }
  const { error } = await supabase.from('pilots').update(fields).eq('id', pilotId);
  return { error };
}

export async function getAllRoutesAdmin() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase.from('routes').select('*').order('flight_number');
  if (error) return [];
  return data;
}

export async function addRoute(route) {
  const { error } = await supabase.from('routes').insert(route);
  return { error };
}

export async function toggleRoute(routeId, active) {
  const { error } = await supabase.from('routes').update({ active }).eq('id', routeId);
  return { error };
}

/** Tous les PIREPs approuvés (staff) — pour les statistiques compagnie. */
export async function getApprovedPireps() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('pireps')
    .select('flight_time, routes(aircraft_code)')
    .eq('status', 'approved');
  if (error) return [];
  return data;
}
