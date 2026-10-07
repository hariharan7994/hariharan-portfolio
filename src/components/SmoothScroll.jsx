import { useEffect, useRef, createContext, useContext, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext({ velocity: 0, direction: 1, progress: 0 });

export const useScrollContext = () => useContext(ScrollContext);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [scrollData, setScrollData] = useState({
    velocity: 0,
    direction: 1,
    progress: 0,
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Update scroll data for child components
    lenis.on("scroll", ({ velocity, direction, progress }) => {
      setScrollData({ velocity, direction, progress });
    });

    // Use GSAP ticker for Lenis RAF loop
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Disable GSAP's default lag smoothing to keep in sync with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  );
}
