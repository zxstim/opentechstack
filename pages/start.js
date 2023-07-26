import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../components/UpButton/UpButton";
import AppFooter from "../components/AppFooter/AppFooter";
import StartPath from "../components/StartPath/StartPath";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";

export default function Start(props) {
  const { t } = useTranslation("start");
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
        <title>Start your Web3 journey here! | Bắt đầu hành trình Web3 của bạn từ đây! - OpenTechStack.com</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="../defi.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore different paths, skillsets, job roles that you can take on in the world of Web3." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Start your Web3 journey here! | Bắt đầu hành trình Web3 của bạn từ đây! - OpenTechStack.com" />
        <meta property="og:description" content="Explore different paths, skillsets, job roles that you can take on in the world of Web3." key="ogdesc" />
        <meta property="og:url" content="https://OpenTechStack.com/start" key="ogurl" />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/c2f5c7e9-19f5-4eab-25e8-daaa30166900/defi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="OpenTechStack.com" />
        <meta property="twitter:url" content="https://www.OpenTechStack.com/start" />
        <meta name="twitter:title" content="Start your Web3 journey here! | Bắt đầu hành trình Web3 của bạn từ đây! - OpenTechStack.com" />
        <meta name="twitter:description" content="Explore different paths, skillsets, job roles that you can take on in the world of Web3." />
        <meta name="twitter:image" content="https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/c2f5c7e9-19f5-4eab-25e8-daaa30166900/defi" />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <LanguageSelector />
            <NavigationGroup />
          </div>
          <UpButton />
          <h2>{t("subtitle")}</h2>
          {/* <StartPath /> */}
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
      ...(await serverSideTranslations(locale, ["common", "start"])),
      // Will be passed to the page component as props
    },
  };
}
