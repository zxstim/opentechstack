import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../../components/Header/Header";
import AppFooter from "../../components/AppFooter/AppFooter";
import MemeLordPath from "../../components/StartPath/MemeLordPath/MemeLordPath";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function MemeLord(props) {
  const { t } = useTranslation("meme-lord");
  const headerContent = {
    title: "How to be a Meme Lord - OpenTechStack.com",
    description: "Learn how to be a meme lord",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/a6d25640-36ed-4985-a8bd-0f8e1c170b00/defi",
    twDomain: "OpenTechStack.com",
  }

  const paths = {
    fullPath: "/start/meme-lord",
    pathNamesEn: [
      "Start",
      "How to be a Meme Lord"
    ],
    pathNamesVi: [
      "Bắt đầu",
      "Làm thế nào để trở thành Meme Lord"
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
          <MemeLordPath />
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
      ...(await serverSideTranslations(locale, ["common", "meme-lord"])),
      // Will be passed to the page component as props
    },
  };
}
