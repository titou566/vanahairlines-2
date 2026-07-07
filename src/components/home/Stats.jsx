import { useEffect, useRef, useState } from 'react';
import GlassCard from '../common/GlassCard.jsx';
import { STATS } from '../../utils/constants.js';

/** Compteur animé (ease-out) déclenché quand la section devient visible. */
function CountUp({ target, run }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let start = null;
    let raf;
    const duration = 1400;
    const step = (t) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return <>{value}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-4 py-10 sm:px-6">
      <div ref={ref} className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <GlassCard key={stat.label} className="flex flex-col items-center gap-1 px-4 py-8">
            <span className="font-display text-4xl font-bold text-gradient">
              <CountUp target={parseInt(stat.value, 10)} run={run} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foam/50">
              {stat.label}
            </span>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
