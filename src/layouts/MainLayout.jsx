import { Outlet } from 'react-router-dom';
import AnimatedBackground from '../components/common/AnimatedBackground.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ScrollTopButton from '../components/common/ScrollTopButton.jsx';

export default function MainLayout() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton />
    </>
  );
}
