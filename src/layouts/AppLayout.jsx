import { useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plane,
  Award,
  LayoutDashboard,
  CalendarCheck,
  ClipboardPlus,
  BookOpen,
  Trophy,
  UserCog,
  ClipboardCheck,
  Users,
  Map as MapIcon,
  Megaphone,
  Medal,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import useUtcClock from '../hooks/useUtcClock.js';
import AnimatedBackground from '../components/common/AnimatedBackground.jsx';
import { useRanks } from '../context/RanksContext.jsx';
import NotificationsBell from '../components/app/NotificationsBell.jsx';

const OPS_LINKS = [
  { to: '/app', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/app/reserver', label: 'Réserver un vol', icon: CalendarCheck },
  { to: '/app/pirep', label: 'Nouveau PIREP', icon: ClipboardPlus },
  { to: '/app/carnet', label: 'Carnet de vol', icon: BookOpen },
];

const CAREER_LINKS = [
  { to: '/app/carriere', label: 'Ma carrière', icon: Award },
  { to: '/app/classement', label: 'Classement', icon: Trophy },
  { to: '/app/profil', label: 'Mon profil', icon: UserCog },
  { to: '/app/parametres', label: 'Paramètres', icon: SettingsIcon },
];

const STAFF_LINKS = [
  { to: '/app/staff/pireps', label: 'Validation PIREPs', icon: ClipboardCheck },
  { to: '/app/staff/pilotes', label: 'Pilotes', icon: Users },
  { to: '/app/staff/grades', label: 'Grades', icon: Medal },
  { to: '/app/staff/routes', label: 'Routes', icon: MapIcon },
  { to: '/app/staff/annonces', label: 'Annonces', icon: Megaphone },
  { to: '/app/staff/stats', label: 'Statistiques', icon: BarChart3 },
];

function NavGroup({ title, links, onNavigate }) {
  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-lagoon/15 text-lagoon-soft' : 'text-foam/60 hover:bg-foam/5 hover:text-foam'
    }`;

  return (
    <div>
      <p className="mb-2 px-4 font-mono text-[9px] uppercase tracking-[0.3em] text-foam/30">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkCls} onClick={onNavigate}>
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }) {
  const { profile, isStaff, signOut } = useAuth();
  const { getRank } = useRanks();
  const rank = getRank(Number(profile?.hours ?? 0));

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-2 pt-2" onClick={onNavigate}>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lagoon to-sunset">
          <Plane className="h-5 w-5 text-abyss" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold">
            Lagoon<span className="text-gradient">OS</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foam/40">
            Crew Center
          </span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <NavGroup title="Opérations" links={OPS_LINKS} onNavigate={onNavigate} />
        <NavGroup title="Carrière" links={CAREER_LINKS} onNavigate={onNavigate} />
        {isStaff && <NavGroup title="Staff" links={STAFF_LINKS} onNavigate={onNavigate} />}
      </nav>

      {/* Carte utilisateur */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lagoon to-sunset font-display text-sm font-bold text-abyss">
            {(profile?.first_name || '?').slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{profile?.first_name || 'Pilote'}</p>
            <p className="truncate font-mono text-[10px]" style={{ color: rank.color }}>
              {rank.icon} {rank.name}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-foam/10 py-2 text-xs font-medium text-foam/60 transition-colors hover:bg-foam/5 hover:text-foam"
        >
          <LogOut className="h-3.5 w-3.5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

/** Coquille applicative LagoonOS — sidebar permanente + topbar OPS, façon vAMSYS. */
export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { profile } = useAuth();
  const clock = useUtcClock();
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-foam/10 bg-ocean/70 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-abyss/70" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-foam/10 bg-ocean/95 backdrop-blur-xl">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Zone principale */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-foam/10 bg-ocean/60 backdrop-blur-xl">
          <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
            <button
              className="rounded-lg p-2 text-foam/70 hover:bg-foam/5 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-foam/40 sm:block">
              {profile?.callsign || 'Callsign non défini'}
            </span>

            <div className="ml-auto flex items-center gap-3">
              <NotificationsBell />
              <Link
                to="/"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-foam/50 transition-colors hover:text-lagoon-soft"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Site public</span>
              </Link>
              <span className="flex items-center gap-2 rounded-full border border-lagoon/30 bg-lagoon/10 px-3 py-1.5 font-mono text-xs text-lagoon-soft">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lagoon" />
                {clock} Z
              </span>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
