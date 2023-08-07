import Header from "../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import Frontend from "../../components/LearnToCode/Frontend/Frontend";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function CodeBlockchain(props) {
  const { t } = useTranslation("frontend");

  const headerContent = {
    title: "Frontend roadmap and resources - OpenTechStack.com",
    description: "Check out the roadmap to become frontend developers and all the resources for you to learn.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://opentechstack.com/defi.svg",
  }

  const paths = {
    fullPath: "/code/blockchain",
    pathNamesEn: [
      "Code",
      "Blockchain"
    ],
    pathNamesVi: [
      "Code",
      "Blockchain"
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
          <Frontend />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="credit-note">{t("credit")}</div>
          </div>
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
      ...(await serverSideTranslations(locale, ["common", "frontend"])),
      // Will be passed to the page component as props
    },
  };
}
