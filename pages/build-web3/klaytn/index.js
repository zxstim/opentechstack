import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../../../components/Header/Header";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import KlaytnBuildSummary from "../../../components/BuildPlatform/Klaytn/KlaytnBuildSummary/KlaytnBuildSummary";
// import UpButton from "../../../components/UpButton/UpButton";
import AppFooter from "../../../components/AppFooter/AppFooter";

export default function BuildKlaytn(props) {
  const { t } = useTranslation("common");

  const headerContent = {
    title: "How to build on Klaytn - OpenTechStack.com",
    description: "Explore Klaytn ecosystem, development resources and roadmaps on how to become Ethereum developers.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/build/Klaytn",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/b29f135c-9a23-4085-4f57-b7390ddf5400/defi",
    twDomain: "OpenTechStack.com",
  }

  const paths = {
    fullPath: "/build/Klaytn",
    pathNamesEn: [
      "Build on Web3",
      "Klaytn"
    ],
    pathNamesVi: [
      "Xây dựng trên Web3",
      "Klaytn"
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
          <KlaytnBuildSummary />
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
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
