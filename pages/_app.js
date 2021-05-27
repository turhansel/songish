import Head from "next/head";
import Header from "../components/Header";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-[#dfe9f2] bg-opacity-50">
      <Head>
        <title>Song Catalog</title>
      </Head>
      <Header />
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
