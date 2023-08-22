import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../../../components/Header/Header";
import AppFooter from "../../../components/AppFooter/AppFooter";
import DaosList from "../../../components/DiscoverList/DaosList/DaosList";
import { fetchStrapiAPI } from "../../../lib/api";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";

export default function DeFiProjects({ defiProjects, pagination }) {
  const { t } = useTranslation("discover");
  const headerContent = {
    title: "Discover DAO projects - OpenTechStack.com",
    description: "Learn everything about DAO projects, their team, investors, and what they do.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/4162f9b8-76c7-4d57-5b1f-fb75a337ce00/defi",
  }

  const paths = {
    fullPath: "/discover/daos",
    pathNamesEn: [
      "Discover",
      "DeFi Projects"
    ],
    pathNamesVi: [
      "Khám phá",
      "Dự án DAO"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title7")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <FloatingButton />
          <h2>{t("subtitle1")}</h2>
          <DaosList entities={defiProjects} pagination={pagination} />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {

  if (context.locale === "en") {
    var categorySlug = "defi"
  } else {
    var categorySlug = "defi-vi"
  }

  // const defiCategoriesRes = await fetchStrapiAPI("/project-categories", {
  //   locale: "all",
  //   sort: "name:asc",
  // })
  const defiProjectsRes = await fetchStrapiAPI("/projects", {
    filters: {
      project_categories: {
        slug: {
          $eq: categorySlug
        }
      },
    },
    fields: [
      "name", 
      "social", 
      "updatedAt", 
      "slug", 
      "locale"
    ],   
    populate: {
      logo: "*",
      project_categories: {
        fields: ["name", "slug", "locale"],
        sort: ["name:asc"],
      }, 
      blockchains: {
        fields: ["name", "slug", "locale"],
        sort: ["name:asc"],
      },
    },
    locale: "en", 
    pagination: {
      page: context.query.page,
      pageSize: 60,
    },
	  sort: "name:asc",
  })

  return {
    props: {
      defiProjects: defiProjectsRes.data,
      pagination: defiProjectsRes.meta.pagination,
      ...(await serverSideTranslations(context.locale, ["common", "discover"])),
      // Will be passed to the page component as props
    },
  };
}