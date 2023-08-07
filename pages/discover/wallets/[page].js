import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import FloatingButton from "../../../components/FloatingButton/FloatingButton"
import AppFooter from "../../../components/AppFooter/AppFooter";
import WalletsList from "../../../components/DiscoverList/WalletsList/WalletsList";
import { fetchStrapiAPI } from "../../../lib/api";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";

export default function Wallets({ wallets, pagination, walletCategories }) {
  const { t } = useTranslation("wallets");

  const headerContent = {
    title: "How to use Web3 Wallets - OpenTechStack.com",
    description: "Learn everything about web3 wallets, including setup guide, security practices, what can you use the wallets for and many more topics.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/93f92267-0ff6-4ef9-45c4-060ea1b95400/defi",
  }

  const paths = {
    fullPath: "/discover/wallets",
    pathNamesEn: [
      "Discover",
      "🔑 Web3 wallets"
    ],
    pathNamesVi: [
      "Khám phá",
      "🔑 Ví Web3"
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
          <WalletsList wallets={wallets} pagination={pagination} walletCategories={walletCategories}/>
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

  const walletCategoriesRes = await fetchStrapiAPI("/wallet-categories", {
    locale: "all",
    sort: "name:asc",
  })
  const walletsRes = await fetchStrapiAPI("/wallets", {
    fields: [
      "name", 
      "social", 
      "updatedAt", 
      "slug", 
      "locale"
    ],   
    populate: {
      logo: "*",
      wallet_categories: {
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
      wallets: walletsRes.data,
      pagination: walletsRes.meta.pagination,
      walletCategories: walletCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "wallets"])),
      // Will be passed to the page component as props
    },
  };
}