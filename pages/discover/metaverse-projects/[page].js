import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../../components/AppFooter/AppFooter";
import GeneralList from "../../../components/GeneralList/GeneralList";
import { fetchStrapiAPI } from "../../../lib/api";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";

export default function MetaversePage({ entities, pagination }) {
  const { t } = useTranslation("discover");

  const headerContent = {
    title: "Discover Metaverse projects - OpenTechStack.com",
    description: "Learn everything about Metaverse projects, their team, investors, and what they do.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/4162f9b8-76c7-4d57-5b1f-fb75a337ce00/defi",
  }

  const paths = {
    fullPath: "/discover/metaverse-projects",
    pathNamesEn: [
      "Discover",
      "Metaverse Projects"
    ],
    pathNamesVi: [
      "Khám phá",
      "Dự án Metaverse"
    ],
  }


  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title6")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle6")}</h2>
          <GeneralList 
            items={entities} 
            pagination={pagination}
            translationFile="discover"
            indexPagePath="discover/metaverse-projects"
            />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

// export async function getStaticPaths({ locales }) {
//   // Get total number of posts from API.
//   const totalPages = await fetchStrapiAPI("/wallets", {
//     populate: ["wallet_categories"], 
//     pagination: {
//       page: 1,
//       pageSize: 100,
//     }
//   })
//   const numberOfPages = totalPages.meta.pagination.pageCount
 
//   // Build paths `blog/0`, `blog/1` ...etc.
//   const paths = Array(numberOfPages)
//     .fill(0)
//     .map((_, i) => locales.map((locale) => ({
//       params: {
//         page: `${i + 1}`,
//       },
//       locale
//     }))).flat()
//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getServerSideProps(context) {
  const entitiesRes = await fetchStrapiAPI("/entities", {
    filters: {
      entity_categories: {
        slug: {
          $in: "metaverse",
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