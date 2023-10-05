import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import Checkout from "../../components/Shop/Checkout";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function CheckoutPage(props) {
  const { t } = useTranslation("checkout");
  const paths = {
    fullPath: "/shop/checkout",
    pathNamesEn: [
      "Shop",
      "Checkout"
    ],
    pathNamesVi: [
      "Cửa hàng",
      "Thanh toán"
    ],
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
        <title>Checkout</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="../../defi.svg" />
        <meta name="description" content="Checkout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Checkout" key="ogtitle" />
        <meta property="og:description" content="Checkout" key="ogdesc" />
        <meta property="og:site_name" content="Checkout" key="ogsitename" />
        <meta property="og:url" content="https://OpenTechStack.com/shop/checkout" key="ogurl" />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle")}</h2>
          <Checkout />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

// This gets called on every request
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "checkout"])),
      // Will be passed to the page component as props
    },
  };
}