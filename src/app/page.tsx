import Image from 'next/image';
import Hero from './components/Hero';
import InstantBooking from './components/InstantBooking';
import Partners from './components/Partners';
import FleetSection from "./components/FleetSection";
import OurServices from "./components/OurServices";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <>
     <Hero />
     <Partners/>
     <InstantBooking />
     <FleetSection/>
     <OurServices/>
     <Reviews/>
     <FAQ/>


    </>
  );
}