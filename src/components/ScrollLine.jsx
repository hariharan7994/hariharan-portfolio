import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollLine() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Line grows as it scrolls into view
      gsap.fromTo(
        lineRef.current,
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        }
      );

      // Pulsing dot
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          scale: 1.4,
          opacity: 1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "16px 0",
        position: "relative",
      }}
    >
      <div
        ref={lineRef}
        style={{
          width: "1px",
          height: "80px",
          transform: "translate3d(0,0,0) scaleY(0)",
          transformOrigin: "top",
          background:
            "linear-gradient(to bottom, var(--accent), transparent)",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          bottom: "12px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 12px var(--accent)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}