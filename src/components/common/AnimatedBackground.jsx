/**
 * Fond lagon animé : deux nappes de couleur dérivant lentement
 * (lagon + sunset), sous un léger vignettage. Respecte
 * automatiquement `prefers-reduced-motion` (via index.css).
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-abyss" aria-hidden="true">
      <div
        className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle at center, var(--color-lagoon), transparent 65%)',
          animation: 'drift-a 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-[25%] -right-[15%] h-[75vh] w-[70vw] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle at center, var(--color-sunset), transparent 65%)',
          animation: 'drift-b 32s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[30%] left-[45%] h-[50vh] w-[45vw] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle at center, var(--color-lagoon-deep), transparent 60%)',
          animation: 'drift-b 40s ease-in-out infinite reverse',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss" />
    </div>
  );
}
