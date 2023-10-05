import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Header from "../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import EventsList from "../../components/EventsList/EventsList";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function Events(props) {
  const { t } = useTranslation("events");
  const paths = {
    fullPath: "/events",
    pathNamesEn: [
      "Events",
    ],
    pathNamesVi: [
      "Sự kiện",
    ],
  }
  const headerContent = {
    title: "Discover tech events globally - OpenTechStack.com",
    description: "Check out a global list of tech events around the world, find out about the dates, locations and how to register.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/855f74a3-487f-470e-a86c-36bdc9f85a00/defi",
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("events-list")}</h2>
          <EventsList />
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
      ...(await serverSideTranslations(locale, ["common", "events"])),
      // Will be passed to the page component as props
    },
  };
}
