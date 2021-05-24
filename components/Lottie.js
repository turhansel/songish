import React, { useRef } from "react";

const Lottie = ({ design, animationData }) => {
  const ref = useRef(null);
  React.useEffect(() => {
    // for SSR
    import("@lottiefiles/lottie-player");
  });
  return (
    <lottie-player
      ref={ref}
      autoplay
      loop
      mode="normal"
      src={animationData}
      style={design}
    ></lottie-player>
  );
};

export default Lottie;
