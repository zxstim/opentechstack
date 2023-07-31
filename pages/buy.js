import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import AppFooter from "../components/AppFooter/AppFooter";
import RampProviders from "../components/RampProviders/RampProviders";
import Header from "../components/Header/Header";


export default function BuyCrypto(props) {
  const { t } = useTranslation("buy");
  const headerContent = {
    title: "Buy and Sell crypto - OpenTechStack.com",
    description: "Buy and Sell crypto with the following ramp providers in different regions around the world.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/a81ca87b-7138-4dd1-4a8c-e9fdcdbaa500/defi",
  }

  const paths = {
    fullPath: "/buy",
    pathNamesEn: [
      "Buy Crypto"
    ],
    pathNamesVi: [
      "Mua Crypto"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector path="/buy"/>
          <NavigationGroup paths={paths} />
          <RampProviders />
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
      ...(await serverSideTranslations(locale, ["common", "buy"])),
      // Will be passed to the page component as props
    },
  };
}
