"use client";

import {
  Navbar,
  Cover,
  AtAGlance,
  TechStack,
  FrontendTrack,
  BackendTrack,
  HowClassesWork,
  Projects,
  Testimonials,
  Enroll,
  FAQ,
  FinalCTA,
} from "../components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Cover />
      <AtAGlance />
      <TechStack />
      <FrontendTrack />
      <BackendTrack />
      <HowClassesWork />
      <Projects />
      <Testimonials />
      <Enroll />
      <FAQ />
      <FinalCTA />
    </>
  );
}