import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/global.css";
import "tailwindcss/tailwind.css";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Song Catalog</title>
      </Head>

      <div>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Fragment>
  );
}

export default MyApp;
