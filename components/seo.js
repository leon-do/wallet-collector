import Head from "next/head";
import React from "react";

export default function Header() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Wallet Collector</title>
      <meta name="description" content="Call protocol fees from ETCswap V3." />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:url" content="https://collect.walletsplitter.com" key="ogurl" />
      <meta property="og:image" content="/logo.png" key="ogimage" />
      <meta property="og:site_name" content="Wallet Collector" key="ogsitename" />
      <meta property="og:title" content="Wallet Collector" key="ogtitle" />
      <meta property="og:description" content="Call protocol fees from ETCswap V3." key="ogdesc" />
    </Head>
  );
}
