import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import Header from "../../../../components/Header/Header";
import constructSlug from "../../../../utils/constructSlug";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchStrapiAPI } from "../../../../lib/api";
import AppFooter from "../../../../components/AppFooter/AppFooter";
import LanguageSelector from "../../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../../components/NavigationGroup/NavigationGroup";
import WalletInfo from "../../../../components/DiscoverList/WalletsList/WalletInfo/WalletInfo";

export default function WalletInfoPage({ wallet }) {
  const { t } = useTranslation("wallets");
  
  const headerContent = {
    title: `${wallet[0].attributes.name} - OpenTechStack.com`,
    description: `Learn about ${wallet[0].attributes.name}`,
    icon: wallet[0].attributes.logo.data.attributes.formats.thumbnail.url,
    domain: "https://www.OpenTechStack.com",
    image: wallet[0].attributes.logo.data.attributes.formats.thumbnail.url,
  }

  const paths = {
    fullPath: `/discover/wallets/info/${wallet[0].attributes.slug}`,
    pathNamesEn: [
      "Discover",
      "Wallets",
      "Info",
      wallet[0].attributes.name
    ],
    pathNamesVi: [
      "Khám phá",
      "Ví",
      "Thông tin",
      wallet[0].attributes.name
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "center"
          }}>
            <div style={{
              width: "90px",
              height: "90px",
            }}>
              <Image 
                src={wallet[0].attributes.logo.data.attributes.formats.thumbnail.url}
                alt={wallet[0].attributes.logo.alternativeText}
                width={80}
                height={80}
                style={{
                  borderRadius: "8px",
                }}
              />
            </div>
            <h1
              style={{
                width: "100%",
              }}
            >{wallet[0].attributes.name}</h1>
          </div>
          <WalletInfo wallet={wallet}/>
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  const { slug } = context.query

  const walletsRes = await fetchStrapiAPI("/wallets", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      logo: "*",
      wallet_categories: {
        fields: ["name", "slug", "locale"],
      }, 
      blockchains: {
        fields: ["name", "slug", "locale"],
      },
      investors: {
        fields: ["name", "slug", "locale"],
      },
      individuals: {
        fields: ["name", "slug", "locale"],
      },
      announcements: {
        fields: ["message", "publishedAt", "locale"],
      }
    },
    locale: "en"
  });

  return {
    props: { 
        wallet: walletsRes.data,
        ...(await serverSideTranslations(context.locale, ["common", "wallets"])) 
    },
  };
}
