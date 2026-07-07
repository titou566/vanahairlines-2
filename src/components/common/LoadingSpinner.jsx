/** Indicateur de chargement centré. */
export default function LoadingSpinner({ label = 'Chargement…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-foam/15 border-t-lagoon" />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-foam/50">{label}</span>
    </div>
  );
}
