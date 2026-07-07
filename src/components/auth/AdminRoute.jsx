import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

/** Réservé au staff / admin (CEO, COO). */
export default function AdminRoute({ children }) {
  const { user, profile, loading, isStaff } = useAuth();

  if (loading || (user && !profile)) return <LoadingSpinner label="Vérification…" />;
  if (!user) return <Navigate to="/connexion" replace />;
  if (!isStaff) return <Navigate to="/dashboard" replace />;
  return children;
}
