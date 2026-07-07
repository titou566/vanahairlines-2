import { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import GlassCard from '../../components/common/GlassCard.jsx';
import Button from '../../components/common/Button.jsx';
import { PageHeader, inputCls, labelCls } from '../../components/app/ui.jsx';
import { updateMyProfile } from '../../services/pilots.js';

const SIMULATORS = ['MSFS 2024', 'MSFS 2020', 'X-Plane 12', 'X-Plane 11', 'Prepar3D', 'Autre'];

export default function Profile() {
  useDocumentTitle('Mon profil');
  const { user, profile, refreshProfile } = useAuth();

  const [firstName, setFirstName] = useState(profile?.first_name ?? '');
  const [vid, setVid] = useState(profile?.ivao_vid ?? '');
  const [callsign, setCallsign] = useState(profile?.callsign ?? '');
  const [simulator, setSimulator] = useState(profile?.simulator ?? '');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setStatus({ type: '', message: '' });
    setSaving(true);
    const { error } = await updateMyProfile(user.id, {
      first_name: firstName || null,
      ivao_vid: vid || null,
      callsign: callsign || null,
      simulator: simulator || null,
    });
    setSaving(false);
    if (error) {
      setStatus({ type: 'error', message: error.message });
      return;
    }
    setStatus({ type: 'success', message: 'Profil mis à jour ✅' });
    refreshProfile();
  };

  return (
    <>
      <PageHeader title="Mon profil pilote" subtitle={user?.email} />

      <GlassCard className="max-w-2xl p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Prénom / pseudo</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} placeholder="Lucas" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>VID IVAO</label>
              <input value={vid} onChange={(e) => setVid(e.target.value)} className={inputCls} placeholder="123456" />
            </div>
            <div>
              <label className={labelCls}>Callsign pilote</label>
              <input value={callsign} onChange={(e) => setCallsign(e.target.value.toUpperCase())} className={inputCls} placeholder="LGN001P" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Simulateur</label>
            <select value={simulator} onChange={(e) => setSimulator(e.target.value)} className={inputCls}>
              <option value="" className="bg-ocean">— Choisir —</option>
              {SIMULATORS.map((s) => (
                <option key={s} value={s} className="bg-ocean">{s}</option>
              ))}
            </select>
          </div>
          {profile?.experience && (
            <p className="text-xs text-foam/40">Expérience déclarée à l'inscription : {profile.experience}</p>
          )}

          {status.message && (
            <p className={`text-sm ${status.type === 'error' ? 'text-coral' : 'text-lagoon-soft'}`}>
              {status.message}
            </p>
          )}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </div>
      </GlassCard>
    </>
  );
}
