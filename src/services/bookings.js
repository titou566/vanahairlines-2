/** Service réservations de vols (table `bookings`). */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export async function getMyBooking(userId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('bookings')
    .select('*, routes(id, flight_number, departure_icao, arrival_icao, aircraft_code, block_time)')
    .eq('pilot_id', userId)
    .eq('status', 'active')
    .maybeSingle();
  if (error) {
    console.warn('[Lagoon] Lecture réservation :', error.message);
    return null;
  }
  return data;
}

export async function bookRoute(pilotId, routeId) {
  if (!isSupabaseConfigured) return { error: { message: "Supabase n'est pas configuré." } };
  const { error } = await supabase.from('bookings').insert({ pilot_id: pilotId, route_id: routeId });
  return { error };
}

export async function cancelBooking(bookingId) {
  const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
  return { error };
}

export async function markBookingFlown(bookingId) {
  const { error } = await supabase.from('bookings').update({ status: 'flown' }).eq('id', bookingId);
  return { error };
}

/** Routes actives réservables (avec id). */
export async function getBookableRoutes() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('routes')
    .select('id, flight_number, departure_icao, arrival_icao, aircraft_code, block_time')
    .eq('active', true)
    .order('flight_number');
  if (error) return [];
  return data;
}
