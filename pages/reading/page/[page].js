// import { useState } from "react";
import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import AppFooter from "../../../components/AppFooter/AppFooter";
import ReadingList from "../../../components/ReadingList/ReadingList";
import { fetchStrapiAPI } from "../../../lib/api";


export default function Reading({ articles, pagination, categories }) {
  const { t } = useTranslation("reading");
  const paths = {
    fullPath: "/reading",
    pathNamesEn: [
      "Reading crypto researches"
    ],
    pathNamesVi: [
      "Đọc nghiên cứu crypto"
    ],
  }
  const headerContent = {
    title: "Reading crypto researches - OpenTechStack.com",
    description: "Read breakdowns of DeFi protocols, their mechanism and why they are revolutionary compared to the current financial system.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/reading",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/3f062ee1-01ef-43c8-cdf8-3999cb43f200/defi",
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle")}</h2>
          <ReadingList articles={articles} pagination={pagination} categories={categories}/>
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {

  // const categoriesRes = await fetchStrapiAPI("/categories")
  const articlesRes = await fetchStrapiAPI("/articles", { 
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
      pageSize: 25,
    }, 
  })

  return {
    props: {
      articles: articlesRes.data,
      pagination: articlesRes.meta.pagination,
      // categories: categoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "reading"])),
      // Will be passed to the page component as props
    },
  };
}
