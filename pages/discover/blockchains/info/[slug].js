import Header from "../../../../components/Header/Header";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import constructSlug from "../../../../utils/constructSlug";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchStrapiAPI } from "../../../../lib/api";
import AppFooter from "../../../../components/AppFooter/AppFooter";
import BlockchainInfo from "../../../../components/DiscoverList/BlockchainsList/BlockchainInfo/BlockchainInfo";
import LanguageSelector from "../../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../../components/NavigationGroup/NavigationGroup";

export default function BlockchainInfoPage({ blockchain }) {
  const { t } = useTranslation("blockchains");

  const headerContent = {
    title: `${blockchain[0].attributes.name} - OpenTechStack.com`,
    description: `Learn about ${blockchain[0].attributes.name}`,
    icon: blockchain[0].attributes.logo.data.attributes.formats.thumbnail.url,
    domain: "https://www.OpenTechStack.com",
    image: blockchain[0].attributes.logo.data.attributes.formats.thumbnail.url,
  }

  const paths = {
    fullPath: `/discover/blockchains/info/${blockchain[0].attributes.slug}`,
    pathNamesEn: [
      "Discover",
      "Blockchains",
      "Info",
      blockchain[0].attributes.name
    ],
    pathNamesVi: [
      "Khám phá",
      "Blockchain",
      "Thông tin",
      blockchain[0].attributes.name
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
            {blockchain[0].attributes.logo.data.attributes.formats.thumbnail.url ? 
              <div style={{
                width: "80px",
                height: "80px",
              }}>
                <Image 
                  src={blockchain[0].attributes.logo.data.attributes.formats.thumbnail.url}
                  alt={blockchain[0].attributes.logo.alternativeText}
                  width={80}
                  height={80}
                />
              </div> : null}
            <h1
              style={{
                width: "100%",
              }}
            >{blockchain[0].attributes.name}</h1>
          </div>
          <BlockchainInfo blockchain={blockchain}/>
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

  const blockchainRes = await fetchStrapiAPI("/blockchains", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      logo: "*",
      blockchain_categories: {
        fields: ["name", "slug", "locale"],
      }
    },
    locale: "en"
  });

  return {
    props: { 
      blockchain: blockchainRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "blockchains"])) 
    },
  };
}
