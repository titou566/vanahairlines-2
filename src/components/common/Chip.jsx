const tones = {
  lagoon: 'border-lagoon/40 text-lagoon-soft bg-lagoon/10',
  sunset: 'border-sunset/40 text-sunset bg-sunset/10',
  neutral: 'border-foam/20 text-foam/70 bg-foam/5',
};

/** Étiquette "flight strip" en police mono — signature graphique Lagoon. */
export default function Chip({ tone = 'lagoon', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] px-3 py-1.5 rounded border ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
