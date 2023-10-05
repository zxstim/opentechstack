import Header from "../components/Header/Header";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import JobsList from "../components/JobsList/JobsList";

export default function JobsListPage({jobs}) {
  const { t } = useTranslation("jobs");
  const headerContent = {
    title: "Find your Web3 jobs - OpenTechStack.com",
    description: "Explore our job board with thousands of Web3 jobs in various roles and locations including remote options.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/5f58f0e7-6d1d-45b5-4090-81cc2caa7300/defi",
  }

  const paths = {
    fullPath: "/jobs",
    pathNamesEn: [
      "Jobs"
    ],
    pathNamesVi: [
      "Công việc"
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
          <h2 id="top">{t("subtitle")}</h2>
          <JobsList jobs={jobs}/>
          <br />
          <hr />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const jobs = await fetch(process.env.WEB3_CAREERS_API).then((res) => res.json());
  
  return {
    props : { 
      jobs : jobs[2],
      ...(await serverSideTranslations(context.locale, ["common", "jobs"]))
     },
     revalidate: 3600,
  }
}