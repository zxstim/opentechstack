import Header from "../../components/Header/Header";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../../components/UpButton/UpButton";
import AppFooter from "../../components/AppFooter/AppFooter";
import Backend from "../../components/LearnToCode/Backend/Backend";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function CodeBackend(props) {
  const { t } = useTranslation("backend");

  const headerContent = {
    title: "Backend roadmap and resources - OpenTechStack.com",
    description: "Check out the roadmap to become backend developers and all the resources for you to learn.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://opentechstack.com/defi.svg",
  }

  const paths = {
    fullPath: "/code/backend",
    pathNamesEn: [
      "Code",
      "Backend"
    ],
    pathNamesVi: [
      "Code",
      "Backend"
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
          <Backend />
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
      ...(await serverSideTranslations(locale, ["common", "backend"])),
      // Will be passed to the page component as props
    },
  };
}
