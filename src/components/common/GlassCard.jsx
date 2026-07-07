/** Carte en verre. `hover` active l'élévation au survol. */
export default function GlassCard({ hover = false, className = '', children, ...props }) {
  return (
    <div
      className={`glass rounded-2xl ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:border-lagoon/40 hover:shadow-[0_16px_48px_rgba(6,20,26,0.55)]'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
