import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Song Catalog</title>
      </Head>
      <Header />
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
