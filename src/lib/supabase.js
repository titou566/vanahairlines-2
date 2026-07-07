import { createClient } from '@supabase/supabase-js';

/**
 * Configuration Supabase.
 * Les valeurs par défaut ci-dessous sont intégrées au site : la clé
 * "publishable" est conçue pour être publique (la sécurité est assurée
 * par les règles RLS côté base). Un fichier .env peut les surcharger.
 * ⚠️ Ne JAMAIS mettre la clé sb_secret_ ici.
 */
const DEFAULT_URL = 'https://hrwhcybbfjkrnwhqjenz.supabase.co';
const DEFAULT_KEY = 'sb_publishable_39Uy9jkFznvboWHYDrT_ug_dmCCGRqh';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_KEY;

// Nettoie les erreurs fréquentes de copier-coller (/rest/v1/, slash final)
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
