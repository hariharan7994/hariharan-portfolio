import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Quick setters for zero-latency following
    const xToCursor = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    const xToFollower = gsap.quickTo(followerRef.current, "x", {
      duration: 0.5,
      ease: "power3",
    });
    const yToFollower = gsap.quickTo(followerRef.current, "y", {
      duration: 0.5,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over an interactive element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid var(--accent)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9998,
          mixBlendMode: "difference",
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
          ...(isHovering && {
            width: "60px",
            height: "60px",
            backgroundColor: "rgba(0, 245, 212, 0.1)",
          }),
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          ...(isHovering && {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.5)",
          }),
        }}
      />
    </>
  );
}
