import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-gradient-to-r from-lagoon to-lagoon-deep text-abyss hover:brightness-110 hover:shadow-[0_0_28px_rgba(35,196,174,0.35)]',
  sunset:
    'bg-gradient-to-r from-sunset to-coral text-abyss hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,138,76,0.35)]',
  glass: 'glass text-foam hover:bg-foam/10',
  ghost: 'text-foam/80 hover:text-foam hover:bg-foam/5',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'px-6 py-3',
  lg: 'text-lg px-8 py-4',
};

/**
 * Bouton universel.
 * - `to`   → rend un <Link> (navigation interne)
 * - `href` → rend un <a> (lien externe, nouvel onglet)
 * - sinon  → rend un <button>
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
