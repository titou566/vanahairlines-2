import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Plane, MessageCircle } from 'lucide-react';
import { NAV_LINKS, DISCORD_URL } from '../../utils/constants.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../common/Button.jsx';

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lagoon to-sunset transition-transform duration-300 group-hover:rotate-6">
        <Plane className="h-5 w-5 text-abyss" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">LAGOON</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lagoon-soft">
          Airways · LGN
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isStaff } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-lagoon/15 text-lagoon-soft' : 'text-foam/70 hover:bg-foam/5 hover:text-foam'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-[0_8px_32px_rgba(6,20,26,0.4)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        {/* Navigation desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkCls} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Discord Lagoon Airways"
            className="rounded-full p-2 text-foam/60 transition-colors hover:bg-foam/5 hover:text-lagoon-soft"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          {user && isStaff && (
            <Button to="/app/staff/pireps" variant="sunset" size="sm">
              Admin
            </Button>
          )}
          {user ? (
            <Button to="/app" size="sm">
              LagoonOS
            </Button>
          ) : (
            <Button to="/connexion" variant="glass" size="sm">
              Connexion
            </Button>
          )}
        </div>

        {/* Bouton menu mobile */}
        <button
          className="rounded-lg p-2 text-foam/80 hover:bg-foam/5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Panneau mobile */}
      {open && (
        <div className="glass-strong border-t border-foam/10 px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkCls}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3">
              {user ? (
                <Button to="/app" className="w-full" onClick={() => setOpen(false)}>
                  LagoonOS
                </Button>
              ) : (
                <Button to="/connexion" variant="glass" className="w-full" onClick={() => setOpen(false)}>
                  Connexion
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
