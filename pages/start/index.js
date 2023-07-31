import Header from "../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import StartPath from "../../components/StartPath/StartPath";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function Start(props) {
  const { t } = useTranslation("start");
  const headerContent = {
    title: "Start your Tech journey here! - OpenTechStack.com",
    description: "Explore different paths, skillsets, job roles that you can take on in the world of Tech.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/c2f5c7e9-19f5-4eab-25e8-daaa30166900/defi",
  }

  const paths = {
    fullPath: "/start",
    pathNamesEn: [
      "Start"
    ],
    pathNamesVi: [
      "Bắt đầu"
    ],
  }
  
  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <LanguageSelector />
            <NavigationGroup paths={paths}/>
          </div>
          <h2>{t("subtitle")}</h2>
          <StartPath />
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
