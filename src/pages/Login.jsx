import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, AlertTriangle } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useAuth } from '../context/AuthContext.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import Button from '../components/common/Button.jsx';
import Chip from '../components/common/Chip.jsx';

const inputCls =
  'w-full rounded-xl border border-foam/15 bg-foam/5 px-4 py-3 text-sm text-foam placeholder:text-foam/30 transition-colors focus:border-lagoon/60 focus:outline-none';

const labelCls = 'mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foam/45';

export const SIMULATORS = ['MSFS 2024', 'MSFS 2020', 'X-Plane 12', 'X-Plane 11', 'Prepar3D', 'Autre'];
export const EXPERIENCE_LEVELS = [
  'Débutant — je découvre le vol en ligne',
  'Intermédiaire — quelques vols IVAO/VATSIM',
  'Confirmé — je vole régulièrement en ligne',
  'Expert — IFR complet, phraséologie maîtrisée',
];

export default function Login() {
  useDocumentTitle('Espace pilote');
  const { signIn, signUp, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [vid, setVid] = useState('');
  const [simulator, setSimulator] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (m) => {
    setMode(m);
    setError('');
    setInfo('');
  };

  const handleSubmit = async () => {
    setError('');
    setInfo('');

    if (mode === 'signup') {
      if (!/^\d{4,8}$/.test(vid.trim())) {
        setError('Le VID IVAO doit être un numéro (4 à 8 chiffres).');
        return;
      }
      if (!simulator) {
        setError('Sélectionnez votre simulateur.');
        return;
      }
      if (!experience) {
        setError('Indiquez votre niveau d\'expérience.');
        return;
      }
      if (password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères.');
        return;
      }
      if (password !== confirm) {
        setError('Les deux mots de passe ne correspondent pas.');
        return;
      }
    }

    setSubmitting(true);
    const { data, error: err } =
      mode === 'login'
        ? await signIn(email, password)
        : await signUp(email, password, {
            first_name: firstName.trim() || null,
            ivao_vid: vid.trim(),
            simulator,
            experience,
          });
    setSubmitting(false);

    if (err) {
      setError(err.message);
      return;
    }

    if (mode === 'signup' && !data?.session) {
      setInfo('Compte créé ! Vérifiez votre boîte mail pour confirmer votre adresse, puis connectez-vous.');
      switchMode('login');
      return;
    }

    navigate('/dashboard');
  };

  const canSubmit =
    email &&
    password &&
    (mode === 'login' || (confirm && vid && simulator && experience)) &&
    !submitting;

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-28 sm:px-6">
      <GlassCard className="w-full max-w-md p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Chip>Espace pilote</Chip>
          <h1 className="font-display text-3xl font-bold">
            Lagoon<span className="text-gradient">OS</span>
          </h1>
          <p className="text-sm text-foam/50">
            {mode === 'login'
              ? 'Connectez-vous à votre espace pilote.'
              : 'Créez votre compte et démarrez votre carrière.'}
          </p>
        </div>

        {/* Sélecteur Connexion / Inscription */}
        <div className="glass mb-6 grid grid-cols-2 gap-1 rounded-full p-1">
          <button
            onClick={() => switchMode('login')}
            className={`rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === 'login' ? 'bg-lagoon/20 text-lagoon-soft' : 'text-foam/50 hover:text-foam'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === 'signup' ? 'bg-sunset/20 text-sunset' : 'text-foam/50 hover:text-foam'
            }`}
          >
            Inscription
          </button>
        </div>

        {!isConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-sunset/40 bg-sunset/10 p-4 text-sm text-sunset">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Supabase n'est pas encore configuré. Copiez <code>.env.example</code> en{' '}
              <code>.env</code> et renseignez vos clés.
            </span>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className={labelCls}>Prénom / pseudo (optionnel)</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputCls}
                  placeholder="Lucas"
                />
              </div>
              <div>
                <label className={labelCls}>VID IVAO *</label>
                <input
                  value={vid}
                  onChange={(e) => setVid(e.target.value)}
                  className={inputCls}
                  placeholder="123456"
                  inputMode="numeric"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Simulateur *</label>
                  <select value={simulator} onChange={(e) => setSimulator(e.target.value)} className={inputCls}>
                    <option value="" className="bg-ocean">— Choisir —</option>
                    {SIMULATORS.map((s) => (
                      <option key={s} value={s} className="bg-ocean">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Expérience *</label>
                  <select value={experience} onChange={(e) => setExperience(e.target.value)} className={inputCls}>
                    <option value="" className="bg-ocean">— Choisir —</option>
                    {EXPERIENCE_LEVELS.map((l) => (
                      <option key={l} value={l} className="bg-ocean">{l.split(' — ')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            {mode === 'signup' && <label className={labelCls}>E-mail *</label>}
            <input
              type="email"
              placeholder="pilote@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              aria-label="Adresse e-mail"
              autoComplete="email"
            />
          </div>
          <div>
            {mode === 'signup' && <label className={labelCls}>Mot de passe * (8 caractères min.)</label>}
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && mode === 'login' && canSubmit && handleSubmit()}
              className={inputCls}
              aria-label="Mot de passe"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>
          {mode === 'signup' && (
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSubmit()}
              className={inputCls}
              aria-label="Confirmer le mot de passe"
              autoComplete="new-password"
            />
          )}

          {error && <p className="text-sm text-coral">{error}</p>}
          {info && <p className="text-sm text-lagoon-soft">{info}</p>}

          <Button
            onClick={handleSubmit}
            variant={mode === 'login' ? 'primary' : 'sunset'}
            disabled={!canSubmit}
          >
            {mode === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {submitting ? 'Un instant…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </Button>

          <p className="text-center text-xs text-foam/40">
            {mode === 'login'
              ? 'Nouveau pilote ? Créez votre compte via l\'onglet Inscription.'
              : 'Votre carrière démarre au grade de Cadet du Lagon — les heures se gagnent en vol ✈️'}
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
