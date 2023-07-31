import Header from "../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import AppFooter from "../components/AppFooter/AppFooter";
// import DevsList from "../components/DevsList/DevsList";

export default function Hiring(props) {
  const { t } = useTranslation("pros-for-hire");
  const headerContent = {
    title: "Hire crypto professionals | Tuyển dụng nhân viên crypto - OpenTechStack.com",
    description: "Find your next crypto employees, freelancers, whether they are developers, sales person or marketer.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/9cf26e72-dc40-4d93-823b-da167198ae00/defi",
  }

  const paths = {
    fullPath: "/pros-for-hire",
    pathNamesEn: [
      "Pros for hire!"
    ],
    pathNamesVi: [
      "Pro cho thuê!"
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
      ...(await serverSideTranslations(locale, ["common", "pros-for-hire"])),
      // Will be passed to the page component as props
    },
  };
}
