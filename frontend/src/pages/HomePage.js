import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { PointOfView } from '../components/PointOfView';
import { Capabilities } from '../components/Capabilities';
import { Approach } from '../components/Approach';
import { SignalAtlas } from '../components/SignalAtlas';
import { Trust } from '../components/Trust';
import { CareersBand } from '../components/CareersBand';
import { Contact } from '../components/Contact';
import { LivingField } from '../components/LivingField';

export default function HomePage() {
  return (
    <>
      <LivingField />
      <Hero />
      <Marquee />
      <PointOfView />
      <Capabilities />
      <Approach />
      <SignalAtlas />
      <Trust />
      <CareersBand />
      <Contact />
    </>
  );
}
