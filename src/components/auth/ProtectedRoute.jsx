import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

/** Protège une route : redirige vers /connexion si non authentifié. */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner label="Vérification…" />;
  if (!user) return <Navigate to="/connexion" replace />;
  return children;
}
