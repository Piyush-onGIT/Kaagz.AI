import { SessionProvider } from "next-auth/react";
import "./styles.css";
import "../styles/demo.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider>
      <Head>
        <title>KaaGzAI</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Add other meta tags, stylesheets, etc. as needed */}
      </Head>
      <ToastContainer style={{ zIndex: 100 }} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
