import Header from "../components/Header/Header";
import Link from "next/link";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../components/UpButton/UpButton";
import AppFooter from "../components/AppFooter/AppFooter";
import HackathonsList from "../components/HackathonsList/HackathonsList";

export default function Hackathons(props) {
  const { t } = useTranslation("hackathons");
  const headerContent = {
    title: "Find upcoming hackathons to attend - OpenTechStack.com",
    description: "Check out a global list of hackathons around the world, find out about the dates, locations and how to register.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/b394a9c7-6daa-46f2-5165-e3c336e93900/defi",
  }

  const paths = {
    fullPath: "/hackathons",
    pathNamesEn: [
      "Hackathons"
    ],
    pathNamesVi: [
      "Hackathon"
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
          <h2>{t("hackathons-list")}</h2>
          <HackathonsList />
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
      ...(await serverSideTranslations(locale, ["common", "hackathons"])),
      // Will be passed to the page component as props
    },
  };
}
