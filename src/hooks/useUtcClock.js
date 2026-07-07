import { useEffect, useState } from 'react';

/** Horloge UTC (Zulu) mise à jour chaque seconde — HH:MM:SS. */
export default function useUtcClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toISOString().slice(11, 19);
}
