import React, { useEffect, useRef } from "react";
import "./PaymentSuccess.css"; // Assume styles are defined similarly to the original

const PaymentSuccess = () => {
  const svgPathRef = useRef(null);

  // Helper function to initialize and control the SVG path animation
  const animatePath = (path, progress) => {
    if (path) {
      const strokeLength = path.getTotalLength();
      path.style.strokeDasharray = strokeLength;
      path.style.strokeDashoffset = strokeLength * (1 - progress);
    }
  };

  useEffect(() => {
    const svgPath = svgPathRef.current;
    animatePath(svgPath, 0); // Set initial progress to 0 (invisible)

    // Start animation after a delay to show full checkmark
    setTimeout(() => {
      animatePath(svgPath, 1); // Full progress (visible)
      document.body.classList.add("active");
    }, 400);

    // Click to toggle animation reset
    const handleClick = () => {
      if (document.body.classList.contains("active")) {
        document.body.classList.remove("active");
        animatePath(svgPath, 0);
      } else {
        document.body.classList.add("active");
        animatePath(svgPath, 1);
      }
    };

    document.addEventListener("click", handleClick);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="success-message">
      <svg viewBox="0 0 76 76" className="success-message__icon icon-checkmark">
        <circle cx="38" cy="38" r="36" />
        <path
          ref={svgPathRef}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M17.7,40.9l10.9,10.9l28.7-28.7"
        />
      </svg>
      <h1 className="success-message__title">Thanks for the Donation</h1>
      <div className="success-message__content">
        <p>Small help. Save many lifes</p>
        <p>
          Head back to <a href="/">Main Page</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
