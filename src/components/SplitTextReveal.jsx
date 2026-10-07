import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitTextReveal({
  text,
  className = "",
  style = {},
  delay = 0,
  stagger = 0.05,
  as: Component = "p",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word-reveal");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -40,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: stagger,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger]);

  // Split text into words while keeping spaces
  const splitText = text.split(" ").map((word, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        marginRight: "0.25em",
        perspective: "600px",
      }}
    >
      <span
        className="word-reveal"
        style={{
          display: "inline-block",
          willChange: "transform, opacity",
          transformOrigin: "bottom center",
        }}
      >
        {word}
      </span>
    </span>
  ));

  return (
    <Component ref={containerRef} className={className} style={style}>
      {splitText}
    </Component>
  );
}
