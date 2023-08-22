import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../../components/AppFooter/AppFooter";
import Header from "../../../components/Header/Header";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import GeneralList from "../../../components/GeneralList/GeneralList";
import { fetchStrapiAPI } from "../../../lib/api";

export default function PortfolioManagementTools({ entities, pagination }) {
  const { t } = useTranslation("discover");

  const headerContent = {
    title: "Discover Portfolio Management Tools - OpenTechStack.com",
    description: "Learn everything about Portfolio Management Tools, their team, investors, and what they do.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/4162f9b8-76c7-4d57-5b1f-fb75a337ce00/defi",
  }

  const paths = {
    fullPath: "/discover/portfolio-management-tools",
    pathNamesEn: [
      "Discover",
      "Portfolio management tools"
    ],
    pathNamesVi: [
      "Khám phá",
      "Công cụ quản lý danh mục"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title3")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle3")}</h2>
          <GeneralList 
            items={entities} 
            pagination={pagination}
            translationFile="discover"
            indexPagePath="discover/portfolio-management-tools"
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
          $in: "portfolio-management",
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