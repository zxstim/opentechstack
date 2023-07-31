import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../components/Header/Header";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import AppFooter from "../components/AppFooter/AppFooter";
import StoreInventories from "../components/Shop/StoreInventories";

export default function Shop(props) {
  const { t } = useTranslation("shop");
  const headerContent = {
    title: "Merchandise Shop - OpenTechStack.com",
    description: "Check out the latest crypto cold wallets, merchandises and daily necessities.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/1cf7e68c-4f01-47ce-c119-ff147700df00/defi",
  }

  const paths = {
    fullPath: "/shop",
    pathNamesEn: [
      "Shop"
    ],
    pathNamesVi: [
      "Cửa hàng"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle")}</h2>
          <StoreInventories />
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
      ...(await serverSideTranslations(locale, ["common", "shop"])),
      // Will be passed to the page component as props
    },
  };
}