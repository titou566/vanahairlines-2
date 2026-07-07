import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Reveal from '../components/common/Reveal.jsx';
import Hero from '../components/home/Hero.jsx';
import Stats from '../components/home/Stats.jsx';
import NetworkMap from '../components/home/NetworkMap.jsx';
import Features from '../components/home/Features.jsx';
import Career from '../components/home/Career.jsx';
import Destinations from '../components/home/Destinations.jsx';
import CallToAction from '../components/home/CallToAction.jsx';

export default function Home() {
  useDocumentTitle('');
  return (
    <>
      <Hero />
      <Stats />
      <Reveal><NetworkMap /></Reveal>
      <Reveal><Features /></Reveal>
      <Reveal><Career /></Reveal>
      <Reveal><Destinations /></Reveal>
      <Reveal><CallToAction /></Reveal>
    </>
  );
}
