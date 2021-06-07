import React from "react";
import Fade from "react-reveal";
import Link from "next/link";
const Footer = () => {
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="md:mt-12 md:pb-8 pb-5 text-xl">
        <p className="text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-green-400">
          Making by
          <Link href="https://github.com/turhansel">
            <a target="_blank" rel="noreferrer noopener">
              🚀 Turhan Sel
            </a>
          </Link>
        </p>
      </div>
    </Fade>
  );
};

export default Footer;
