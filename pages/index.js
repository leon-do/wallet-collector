import Link from "next/link";
import styles from "../styles/Home.module.css";
import SEO from "../components/seo";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <SEO />

      <main className={styles.main}>
        <h1 className={styles.title}>
        WalletCollector
        </h1>

        <p className={styles.code}>collectProtocol()</p>
        <img src="/logo.svg" alt="wallet splitter logo" width={256} height={256}></img>
        <p className={styles.code}>Transfer funds to WalletSplitter</p>

        <div className={styles.grid}>
          <Link href="/split" passHref>
            <a className={styles.card}>
              <h2 className={styles.underline}>Collect &rarr;</h2>
              <p>Call protocol fees from ETCSwap V3.</p>
            </a>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
