import React, { useRef } from "react";

const Lottie = (props) => {
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
      src={props.animationData}
      style={props.design}
    ></lottie-player>
  );
};

export default Lottie;
