import { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { getMyNotifications, markAllRead } from '../../services/notifications.js';

/** Cloche de notifications LagoonOS : compteur non-lus + panneau déroulant. */
export default function NotificationsBell() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const unread = items.filter((n) => !n.read).length;

  const load = () => {
    if (user) getMyNotifications(user.id).then(setItems);
  };

  useEffect(load, [user]);

  // Fermer au clic extérieur
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) {
      await markAllRead(user.id);
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggle}
        className="relative rounded-full p-2 text-foam/60 transition-colors hover:bg-foam/5 hover:text-foam"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sunset px-1 font-mono text-[9px] font-bold text-abyss">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="glass-strong absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-foam/10"
          >
            <p className="border-b border-foam/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foam/45">
              Notifications
            </p>
            <div className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-6 text-center text-xs text-foam/45">
                  Rien pour le moment — bon vol ! ✈️
                </p>
              ) : (
                items.map((n) => (
                  <div key={n.id} className="border-b border-foam/5 px-4 py-3">
                    <p className="text-sm font-semibold">{n.title}</p>
                    {n.body && <p className="mt-0.5 text-xs leading-relaxed text-foam/55">{n.body}</p>}
                    <p className="mt-1 font-mono text-[9px] text-foam/30">
                      {new Date(n.created_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
