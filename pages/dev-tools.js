import Header from "../components/Header/Header";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import DevToolsList from "../components/DevToolsList/DevToolsList";
import AppFooter from "../components/AppFooter/AppFooter";


export default function DevTools(props) {
  const { t } = useTranslation("dev-tools");

  const headerContent = {
    title: "Find your next favourite tool for development - OpenTechStack.com",
    description: "Find your next favourite tool for development, from coding languages, server setup, recommendations to open source options.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/a6d25640-36ed-4985-a8bd-0f8e1c170b00/defi",
  }

  const paths = {
    fullPath: "/dev-tools",
    pathNamesEn: [
      "Dev Tools"
    ],
    pathNamesVi: [
      "Công cụ lập trình"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths}/>
          <h2>{t("subtitle")}</h2>
          <DevToolsList />
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
      ...(await serverSideTranslations(locale, ["common", "dev-tools"])),
      // Will be passed to the page component as props
    },
  };
}