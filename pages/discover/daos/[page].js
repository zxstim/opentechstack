import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../../../components/Header/Header";
import AppFooter from "../../../components/AppFooter/AppFooter";
import GeneralList from "../../../components/GeneralList/GeneralList";
import { fetchStrapiAPI } from "../../../lib/api";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";

export default function DAOprojects({ entities, pagination }) {
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
      "DAOs"
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
          <h1 id="top">{t("title9")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle9")}</h2>
          <GeneralList 
            items={entities} 
            pagination={pagination}
            translationFile="discover"
            indexPagePath="discover/daos"
            />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const entitiesRes = await fetchStrapiAPI("/entities", {
    filters: {
      entity_categories: {
        slug: {
          $in: "dao",
        },
      },
    },
    fields: [
      "name", 
      "socials", 
      "updatedAt", 
      "slug", 
      "locale"
    ],   
    populate: {
      logo: "*",
      entity_categories: {
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
      entities: entitiesRes.data,
      pagination: entitiesRes.meta.pagination,
      // walletCategories: walletCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "discover"])),
      // Will be passed to the page component as props
    },
  };
}