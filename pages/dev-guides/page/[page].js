import Link from "next/link";
import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../../components/AppFooter/AppFooter";
import DevReadingList from "../../../components/DevReadingList/DevReadingList";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import { fetchStrapiAPI } from "../../../lib/api";

export default function DevGuides({ devArticles, pagination, devCategories }) {
  const { t } = useTranslation("dev-guides");
  const headerContent = {
    title: "Learn to code - OpenTechStack.com",
    description: "Learn about roadmaps to become many different tech roles and how to code in different languages.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/1f40f51c-7491-4f22-a1d6-8b41a1bb3300/defi",
  }

  const paths = {
    fullPath: "/dev-guides",
    pathNamesEn: [
      "Dev guides "
    ],
    pathNamesVi: [
      "Hướng dẫn Dev"
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
          <h2>{t("subtitle")}</h2>
          <DevReadingList articles={devArticles} pagination={pagination} categories={devCategories}/>
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  
  // const devCategoriesRes = await fetchStrapiAPI("/dev-categories")
  const devArticlesRes = await fetchStrapiAPI("/dev-articles", { 
    fields: ["title", "slug", "updatedAt", "createdAt", "publishedAt"], 
    populate: {
      image: "*",
      categories: {
        fields: ["name", "slug"],
        sort: ["name:asc"],
      },
      author: {
        populate: ["picture"],
      }
    },
    pagination: {
      page: context.query.page,
      pageSize: 60,
    }, 
  })

  return {
    props: {
      devArticles: devArticlesRes.data,
      pagination: devArticlesRes.meta.pagination,
      // devCategories: devCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "dev-guides"])),
      // Will be passed to the page component as props
    },
  };
}