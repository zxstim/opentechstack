import Head from "next/head";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../components/UpButton/UpButton";
import RefreshButton from "../components/RefreshButton/RefreshButton";
import HowToBot from "../components/BotTrading/HowToBot/HowToBot";
import CryptoScanner from "../components/CryptoScanner/CryptoScanner";
import SrAnalysisComponent from "../components/SrAnalysis/SrAnalysis";
import AppFooter from "../components/AppFooter/AppFooter";
import axios from "axios";

export default function Bot(props) {
  const { t } = useTranslation("bot");

  return (
    <>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Link href="/en/bot" locale="en">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇬🇧</p>
              </a>
            </Link>
            <Link href="/bot" locale="vi">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇻🇳</p>
              </a>
            </Link>
          </div>
          <Link href="/">{t("back")}</Link>
          <UpButton />
          <RefreshButton />
          <HowToBot />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await axios.get("https://api3.pyhash.com/signal/all/sr1/");
  // Pass data to the page via props
  return {
    props: {
      data: res.data,
      ...(await serverSideTranslations(context.locale, ["common", "bot"])),
    },
  };
}
