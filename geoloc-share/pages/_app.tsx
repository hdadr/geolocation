import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Geoloc Share</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/maskable_icon_x48.png" rel="icon" type="image/png" sizes="48x48" />
        <link href="/icons/maskable_icon_x72.png" rel="icon" type="image/png" sizes="72x72" />
        <meta name="theme-color" content="#3695fff5" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
