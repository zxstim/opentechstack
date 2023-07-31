import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../components/UpButton/UpButton";
import Header from "../components/Header/Header";
import HowToBot from "../components/BotTrading/HowToBot/HowToBot";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import AppFooter from "../components/AppFooter/AppFooter";


export default function Bot(props) {
  const { t } = useTranslation("bot");
  const headerContent = {
    title: "Learn how to setup trading bot - OpenTechStack.com",
    description: "Learn how to setup trading bot, from coding languages, server setup, recommendations to open source options.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/a6d25640-36ed-4985-a8bd-0f8e1c170b00/defi",
    twDomain: "OpenTechStack.com",
  }

  const paths = {
    fullPath: "/bot",
    pathNamesEn: [
      "Bot Trading"
    ],
    pathNamesVi: [
      "Giao dịch bằng Bot"
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
          <UpButton />
          <HowToBot />
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
      ...(await serverSideTranslations(locale, ["common", "bot"])),
      // Will be passed to the page component as props
    },
  };
}