import { useState } from 'react';
import { KeyRound, LogOut } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { supabase } from '../../lib/supabase.js';
import GlassCard from '../../components/common/GlassCard.jsx';
import Button from '../../components/common/Button.jsx';
import { PageHeader, inputCls, labelCls } from '../../components/app/ui.jsx';

export default function Settings() {
  useDocumentTitle('Paramètres');
  const { user, signOut } = useAuth();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);

  const changePassword = async () => {
    setStatus({ type: '', message: '' });
    if (password.length < 8) {
      setStatus({ type: 'error', message: 'Le mot de passe doit contenir au moins 8 caractères.' });
      return;
    }
    if (password !== confirm) {
      setStatus({ type: 'error', message: 'Les deux mots de passe ne correspondent pas.' });
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) {
      setStatus({ type: 'error', message: error.message });
      return;
    }
    setStatus({ type: 'success', message: 'Mot de passe mis à jour ✅' });
    setPassword('');
    setConfirm('');
  };

  return (
    <>
      <PageHeader title="Paramètres" subtitle={`Compte : ${user?.email}`} />

      <div className="flex max-w-2xl flex-col gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lagoon/15">
              <KeyRound className="h-5 w-5 text-lagoon-soft" />
            </span>
            <h3 className="font-display text-lg font-bold">Changer le mot de passe</h3>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div>
              <label className={labelCls}>Nouveau mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} autoComplete="new-password" />
            </div>
            <div>
              <label className={labelCls}>Confirmer</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} autoComplete="new-password" />
            </div>
            {status.message && (
              <p className={`text-sm ${status.type === 'error' ? 'text-coral' : 'text-lagoon-soft'}`}>{status.message}</p>
            )}
            <Button onClick={changePassword} disabled={!password || !confirm || saving}>
              {saving ? 'Mise à jour…' : 'Mettre à jour'}
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center justify-between p-6">
          <div>
            <h3 className="font-display text-lg font-bold">Session</h3>
            <p className="mt-1 text-sm text-foam/50">Se déconnecter de LagoonOS sur cet appareil.</p>
          </div>
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </GlassCard>
      </div>
    </>
  );
}
