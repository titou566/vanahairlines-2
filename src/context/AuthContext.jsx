import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { getMyProfile } from '../services/pilots.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const refreshProfile = async (uid) => {
    const id = uid ?? user?.id;
    if (!id) {
      setProfile(null);
      return;
    }
    setProfile(await getMyProfile(id));
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) await refreshProfile(u.id);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) await refreshProfile(u.id);
      else setProfile(null);
    });

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      return { error: { message: "Supabase n'est pas configuré (fichier .env manquant)." } };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, metadata = {}) => {
    if (!isSupabaseConfigured) {
      return { error: { message: "Supabase n'est pas configuré (fichier .env manquant)." } };
    }
    // Les métadonnées (VID, simulateur, expérience) sont copiées dans le
    // profil pilote par le trigger SQL handle_new_user().
    return supabase.auth.signUp({ email, password, options: { data: metadata } });
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  const isStaff = profile?.role === 'staff' || profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, isStaff, signIn, signUp, signOut, refreshProfile, isConfigured: isSupabaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>');
  return ctx;
}
