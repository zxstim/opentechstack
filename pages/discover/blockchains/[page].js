import Header from "../../../components/Header/Header";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import FloatingButton from "../../../components/FloatingButton/FloatingButton"
import AppFooter from "../../../components/AppFooter/AppFooter";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import BlockchainsList from "../../../components/DiscoverList/BlockchainsList/BlockchainsList";
import { fetchStrapiAPI } from "../../../lib/api";

export default function Blockchains({ blockchains, pagination }) {
  const { t } = useTranslation("blockchains");

  const headerContent = {
    title: "Discover Blockchains - OpenTechStack.com",
    description: "Learn everything about Blockchains, their teams, investors and their ecosystem.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/81ca8408-15be-47c1-d0de-394725249700/defi",
  }

  const paths = {
    fullPath: "/discover/blockchains",
    pathNamesEn: [
      "Discover",
      "Blockchains"
    ],
    pathNamesVi: [
      "Khám phá",
      "Blockchains"
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
          <FloatingButton />
          <h2>{t("subtitle")}</h2>
          <BlockchainsList 
            blockchains={blockchains} 
            pagination={pagination} 
            // blockchainCategories={blockchainCategories}
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

  // const blockchainCategoriesRes = await fetchStrapiAPI("/blockchain-categories", {
  //   locale: "all",
  //   sort: "name:asc",
  // })
  const blockchainsRes = await fetchStrapiAPI("/blockchains", {
    fields: [
      "name", 
      "social", 
      "updatedAt", 
      "slug", 
      "locale"
    ],   
    populate: {
      logo: "*",
      blockchain_categories: {
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
      blockchains: blockchainsRes.data,
      pagination: blockchainsRes.meta.pagination,
      // blockchainCategories: blockchainCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "blockchains"])),
      // Will be passed to the page component as props
    },
  };
}