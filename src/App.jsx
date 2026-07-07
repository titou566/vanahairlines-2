import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { RanksProvider } from './context/RanksContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminRoute from './components/auth/AdminRoute.jsx';

// Site public
import Home from './pages/Home.jsx';
import Fleet from './pages/Fleet.jsx';
import RoutesPage from './pages/RoutesPage.jsx';
import Join from './pages/Join.jsx';
import Contact from './pages/Contact.jsx';
import Rules from './pages/Rules.jsx';
import Login from './pages/Login.jsx';
import PublicLeaderboard from './pages/PublicLeaderboard.jsx';
import PublicProfile from './pages/PublicProfile.jsx';
import NotFound from './pages/NotFound.jsx';

// LagoonOS (application pilote)
import DashboardHome from './pages/app/DashboardHome.jsx';
import BookFlight from './pages/app/BookFlight.jsx';
import NewPirep from './pages/app/NewPirep.jsx';
import Logbook from './pages/app/Logbook.jsx';
import Leaderboard from './pages/app/Leaderboard.jsx';
import Career from './pages/app/Career.jsx';
import Profile from './pages/app/Profile.jsx';
import Settings from './pages/app/Settings.jsx';
import StaffPireps from './pages/app/staff/StaffPireps.jsx';
import StaffPilots from './pages/app/staff/StaffPilots.jsx';
import StaffRoutes from './pages/app/staff/StaffRoutes.jsx';
import StaffNews from './pages/app/staff/StaffNews.jsx';
import StaffRanks from './pages/app/staff/StaffRanks.jsx';
import StaffStats from './pages/app/staff/StaffStats.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RanksProvider>
        <ScrollToTop />
        <Routes>
          {/* Site public */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/flotte" element={<Fleet />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/classement" element={<PublicLeaderboard />} />
            <Route path="/pilote/:callsign" element={<PublicProfile />} />
            <Route path="/rejoindre" element={<Join />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reglement" element={<Rules />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* LagoonOS — application pilote */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="reserver" element={<BookFlight />} />
            <Route path="pirep" element={<NewPirep />} />
            <Route path="carnet" element={<Logbook />} />
            <Route path="carriere" element={<Career />} />
            <Route path="classement" element={<Leaderboard />} />
            <Route path="profil" element={<Profile />} />
            <Route path="parametres" element={<Settings />} />
            <Route
              path="staff"
              element={
                <AdminRoute>
                  <Outlet />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="pireps" replace />} />
              <Route path="pireps" element={<StaffPireps />} />
              <Route path="pilotes" element={<StaffPilots />} />
              <Route path="routes" element={<StaffRoutes />} />
              <Route path="annonces" element={<StaffNews />} />
              <Route path="grades" element={<StaffRanks />} />
              <Route path="stats" element={<StaffStats />} />
            </Route>
          </Route>

          {/* Anciennes URLs → LagoonOS */}
          <Route path="/dashboard" element={<Navigate to="/app" replace />} />
          <Route path="/admin" element={<Navigate to="/app/staff/pireps" replace />} />
        </Routes>
        </RanksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
