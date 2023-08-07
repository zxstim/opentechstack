import Header from "../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";
import ButtonList from "../../components/ButtonList/ButtonList";
import { fetchStrapiAPI } from "../../lib/api";


export default function Build({ blockchains, pagination }) {
  const { t } = useTranslation("build");

  const buttonStyle = {
    backgroundColor: "#ebebeb",
    margin: "5px 5px 5px 0px",
    padding: "15px 10px 15px 10px",
    WebkitAppearance: "none",
    borderRadius: "6px",
    border: "2px solid var(--color-border-default)",
    fontSize: "20px",
    color: "var(--color-fg-default)",
  };

  const headerContent = {
    title: "Build on Web3 - OpenTechStack.com",
    description: "Explore Web3 ecosystems, roadmaps on how to become builders, resources for you to become a great builder.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/build",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/b29f135c-9a23-4085-4f57-b7390ddf5400/defi",
    twDomain: "OpenTechStack.com",
  }

  const stimButtonStyle = {
    display: "flex",
    flexDirection: "row !important",
    alignItems: "center",
    backgroundColor: "#ffffff",
    WebkitAppearance: "none",
    borderRadius: "6px",
    border: "2px solid var(--color-fg-default)",
    color: "var(--color-fg-default)",
    boxShadow: "3px 3px var(--color-fg-default)"
  };

  const stimHeadingStyle = {
    fontSize: "20px",
    color: "var(--color-fg-default)",
  };

  const paths = {
    fullPath: "/build-web3",
    pathNamesEn: [
      "Build on Web3"
    ],
    pathNamesVi: [
      "Xây dựng trên Web3"
    ],
  }

  const chains = [
    {
      id: 1,
      name: "Ethereum",
      path: "/build-web3/ethereum",
    },
    {
      id: 2,
      name: "Optimism",
      path: "/build-web3/optimism",
    },
    {
      id: 3,
      name: "Arbitrum",
      path: "/build-web3/arbitrum",
    },
    {
      id: 4,
      name: "Base",
      path: "/build-web3/base",
    },
    {
      id: 5,
      name: "Starknet",
      path: "/build-web3/starknet",
    },
    {
      id: 6,
      name: "Klaytn",
      path: "/build-web3/klaytn",
    },
    {
      id: 7,
      name: "Gnosis Chain",
      path: "/build-web3/gnosis",
    },
    {
      id: 8,
      name: "Polygon",
      path: "/build-web3/polygon",
    },
    {
      id: 9,
      name: "BNB Chain",
      path: "/build-web3/bnbchain",
    },
    {
      id: 10,
      name: "OKC",
      path: "/build-web3/okc",
    },
    {
      id: 11,
      name: "Oasys",
      path: "/build-web3/oasys",
    },
    {
      id: 12,
      name: "Nym",
      path: "/build-web3/nym",
    },
  ]

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths}/>
          <h2>{t("subtitle1")}</h2>
          <AlertMessage type="neutral" headline="✏️ Note" message="This is a work in progress!"/>
          <ButtonList 
            items={blockchains} 
            translationFile="build"
            pagination={pagination}
            indexPagePath="/build-web3"
            />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

// export async function getStaticProps({ locale }) {

//   const 

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "build"])),
//       // Will be passed to the page component as props
//     },
//   };
// }

export async function getStaticPaths({ locales }) {
  // Get total number of posts from API.
  const totalPages = await fetchStrapiAPI("/blockchains", {
    populate: ["blockchain_categories"], 
    pagination: {
      page: 1,
      pageSize: 60,
    }
  })
  const numberOfPages = totalPages.meta.pagination.pageCount
 
  // Build paths `blog/0`, `blog/1` ...etc.
  const paths = Array(numberOfPages)
    .fill(0)
    .map((_, i) => locales.map((locale) => ({
      params: {
        page: `${i + 1}`,
      },
      locale
    }))).flat()
  return {
    paths,
    fallback: false,
  }
}


export async function getStaticProps({ params, ...context }) {

  // const blockchainCategoriesRes = await fetchStrapiAPI("/blockchain-categories", {
  //   locale: "all",
  //   sort: "name:asc",
  // })
  const blockchainsRes = await fetchStrapiAPI("/blockchains", {
    fields: [
      "name",
      "description", 
      "updatedAt", 
      "slug",
    ],   
    populate: {
      logo: "*",
      blockchain_categories: {
        fields: ["name", "slug", "locale"],
        sort: ["name:asc"],
      }
    },
    locale: "en", 
    pagination: {
      page: Number(params.page),
      pageSize: 60,
    },
	  sort: "name:asc",
  })

  return {
    props: {
      blockchains: blockchainsRes.data,
      pagination: blockchainsRes.meta.pagination,
      // blockchainCategories: blockchainCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "build"])),
      // Will be passed to the page component as props
    },
  };
}