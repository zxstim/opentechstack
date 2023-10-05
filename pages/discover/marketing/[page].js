import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import FloatingButton from "../../../components/FloatingButton/FloatingButton"
import AppFooter from "../../../components/AppFooter/AppFooter";
import GeneralList from "../../../components/GeneralList/GeneralList";
import { fetchStrapiAPI } from "../../../lib/api";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";

export default function SecurityPage({ entities, pagination }) {
  const { t } = useTranslation("services");

  const headerContent = {
    title: "How to use Web3 Wallets - OpenTechStack.com",
    description: "Learn everything about web3 wallets, including setup guide, security practices, what can you use the wallets for and many more topics.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/93f92267-0ff6-4ef9-45c4-060ea1b95400/defi",
  }

  const paths = {
    fullPath: "/services/marketing",
    pathNamesEn: [
      "Services",
      "Marketing"
    ],
    pathNamesVi: [
      "Dịch vụ",
      "Quảng cáo"
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
          <FloatingButton />
          <h2>{t("subtitle3")}</h2>
          <GeneralList 
            items={entities} 
            pagination={pagination}
            translationFile="services"
            indexPagePath="services/marketing"
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
          $in: "marketing",
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
      ...(await serverSideTranslations(context.locale, ["common", "services"])),
      // Will be passed to the page component as props
    },
  };
}