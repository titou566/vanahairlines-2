import { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import Button from '../components/common/Button.jsx';
import Chip from '../components/common/Chip.jsx';
import { DISCORD_URL, CEO_EMAIL, COO_EMAIL } from '../utils/constants.js';

const inputCls =
  'w-full rounded-xl border border-foam/15 bg-foam/5 px-4 py-3 text-sm text-foam placeholder:text-foam/30 transition-colors focus:border-lagoon/60 focus:outline-none';

export default function Contact() {
  useDocumentTitle('Contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    const subject = encodeURIComponent(`[Lagoon Airways] Message de ${form.name || 'un visiteur'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${CEO_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Contact"
          title="Une question ? Une candidature ?"
          subtitle="Le staff répond généralement sous 48h. Pour les candidatures, pensez à indiquer votre VID IVAO."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {/* Formulaire */}
          <GlassCard className="p-7 md:col-span-3">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={update('name')}
                className={inputCls}
                aria-label="Votre nom"
              />
              <input
                type="email"
                placeholder="Votre e-mail"
                value={form.email}
                onChange={update('email')}
                className={inputCls}
                aria-label="Votre e-mail"
              />
              <textarea
                placeholder="Votre message (VID IVAO, simulateur, expérience…)"
                value={form.message}
                onChange={update('message')}
                rows={6}
                className={`${inputCls} resize-none`}
                aria-label="Votre message"
              />
              <Button onClick={handleSubmit} disabled={!form.message.trim()}>
                <Send className="h-4 w-4" />
                Envoyer le message
              </Button>
              <p className="text-xs text-foam/40">
                Le bouton ouvre votre client mail — l'envoi direct depuis le site arrivera avec le
                backend (V2.3).
              </p>
            </div>
          </GlassCard>

          {/* Autres canaux */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <GlassCard hover className="flex flex-col gap-3 p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lagoon/15">
                  <Mail className="h-5 w-5 text-lagoon-soft" />
                </span>
                <Chip tone="neutral">Direction</Chip>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foam/40">CEO</span>
                  <a href={`mailto:${CEO_EMAIL}`} className="block break-all font-mono text-lagoon-soft hover:underline">
                    {CEO_EMAIL}
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foam/40">COO</span>
                  <a href={`mailto:${COO_EMAIL}`} className="block break-all font-mono text-lagoon-soft hover:underline">
                    {COO_EMAIL}
                  </a>
                </div>
              </div>
            </GlassCard>

            <GlassCard hover className="flex flex-col gap-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sunset/15">
                <MessageCircle className="h-5 w-5 text-sunset" />
              </span>
              <h3 className="font-display font-bold">Discord</h3>
              <p className="text-sm text-foam/55">
                Le cœur de la communauté : annonces, événements, entraide et vols de groupe.
              </p>
              <Button href={DISCORD_URL} variant="sunset" size="sm" className="mt-1">
                Rejoindre le Discord
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
