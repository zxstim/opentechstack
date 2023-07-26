import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import UpButton from "../../../components/UpButton/UpButton";
import AppFooter from "../../../components/AppFooter/AppFooter";
import Ethereum from "../../../components/Buidl/Ethereum/Ethereum";

export default function BuidlEthereumRoadmap(props) {
  const { t } = useTranslation("ethereum");

  const paths = {
    fullPath: "/buidl/ethereum/ethereum-developer-roadmap",
    pathNamesEn: [
      "BUIDL",
      "Ethereum",
      "Ethereum Developer Roadmap",
    ],
    pathNamesVi: [
      "BUIDL",
      "Ethereum",
      "Tài liệu BUIDL trên Ethereum",
    ]
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-B3Z17PVC6F"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B3Z17PVC6F');
          `}
      </Script>
      
      <Head>
        <title>Ethereum BUIDL resources | Tài liệu BUIDL trên Ethereum - OpenTechStack.com</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="../../defi.svg" />
        <meta name="description" content="Check out the roadmap to become Ethereum developers and all the resources for you to learn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Ethereum BUIDL resources | Tài liệu BUIDL trên Ethereum - OpenTechStack.com" key="ogtitle" />
        <meta property="og:description" content="Check out the roadmap to become Ethereum developers and all the resources for you to learn." key="ogdesc" />
        <meta property="og:url" content="https://OpenTechStack.com/buidl/ethereum" key="ogurl" />
        <meta property="og:site_name" content="OpenTechStack.com | DeFi Vietnam" key="ogsitename" />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <LanguageSelector />
            <NavigationGroup paths={paths}/>
          </div>
          <UpButton />
          <h2>👇 Start from here!</h2>
          <Ethereum />
          {/* <div id="oddin-tag" style={{width: "0", height: "0"}}></div>
          <Script src={'//dev-web.oddin.ai/api/Campaign/otag.js?oid=74cc4707&h=1&cb=' + Date.now()}/> */}
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "ethereum"])),
      // Will be passed to the page component as props
    },
  };
}
