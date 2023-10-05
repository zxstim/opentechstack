import Link from "next/link";
import Header from "../../components/Header/Header";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

export default function Discover(props) {
  const { t } = useTranslation("discover");
  const headerContent = {
    title: "Discover crypto projects - OpenTechStack.com",
    description: "Find your next favourite crypto projects, explore the ecosystem that they are in, check out their socials, see their metrics.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/d12cce69-5439-4bd1-3fda-c7ed7519a600/defi",
  }

  const paths = {
    fullPath: "/discover",
    pathNamesEn: [
      "Discover"
    ],
    pathNamesVi: [
      "Khám phá"
    ],
  }

  // "title1": "🔑 Ví Web3",
  // "title2": "🌏 Cộng đồng",
  // "title3": "🧮 Quản lý danh mục",
  // "title4": "🖼️ Bộ sưu tập NFT",
  // "title5": "🎮 GameFi",
  // "title6": "🏰 Metaverse",
  // "title7": "💎 DeFi",
  // "title8": "⛓️ Blockchain",
  // "title9": "🔭 DAO",
  // "title10": "🪜 NFTFi",
  // "title11": "🔨 Hạ tầng",

  const categories = [
    {
      id: 1,
      name: `${t("title8")}`,
      slug: "blockchains",
    }, 
    {
      id: 2,
      name: `${t("title1")}`,
      slug: "wallets",
    },
    {
      id: 3,
      name: `${t("title7")}`,
      slug: "defi-projects",
    },
    {
      id: 4,
      name: `${t("title4")}`,
      slug: "nft-collections",
    },
    {
      id: 5,
      name: `${t("title5")}`,
      slug: "gamefi-projects",
    },
    {
      id: 6,
      name: `${t("title6")}`,
      slug: "metaverse-projects",
    },
    {
      id: 7,
      name: `${t("title3")}`,
      slug: "portfolio-management-tools",
    },
    {
      id: 8,
      name: `${t("title2")}`,
      slug: "communities",
    },
    {
      id: 9,
      name: `${t("title9")}`,
      slug: "daos",
    },
    {
      id: 10,
      name: `${t("title10")}`,
      slug: "nftfi-projects",
    },
    {
      id: 11,
      name: `${t("title11")}`,
      slug: "infrastructure-projects",
    },
    {
      id: 12,
      name: `${t("title12")}`,
      slug: "investors",
    }
  ]



  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle")}</h2>
          <div className="nav-menu-grid">
            {
              categories.map((category) => (
                <Link href={`/discover/${category.slug}`} key={category.id} style={{ textDecoration: "none" }}>
                  <h3 className="nav-menu-button">{category.name}</h3>
                </Link>
              ))
            }
          </div>
          <br />
          <AlertMessage type="info" message={t("disclosure")} headline={t("note")} />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "discover"])),
      // Will be passed to the page component as props
    },
  };
}
