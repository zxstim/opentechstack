// import Link from "next/link";
import Header from "../../../../components/Header/Header";
import Image from "next/image";
// import constructSlug from "../../../../utils/constructSlug";
// import formatArticleTimeStampEn from "../../../../utils/formatArticleTimeStampEn";
// import formatArticleTimeStampVi from "../../../../utils/formatArticleTimeStampVi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchStrapiAPI } from "../../../../lib/api";
import AppFooter from "../../../../components/AppFooter/AppFooter";
import GeneralInfo from "../../../../components/GeneralList/GeneralInfo/GeneralInfo";
import LanguageSelector from "../../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../../components/NavigationGroup/NavigationGroup";

export default function CommunitityInfoPage({ entity }) {
  const { t } = useTranslation("discover");

  const headerContent = {
    title: `${entity[0].attributes.name} - OpenTechStack.com`,
    description: `Learn about ${entity[0].attributes.name}`,
    icon: entity[0].attributes.logo.data.attributes.formats.thumbnail.url,
    domain: "https://www.OpenTechStack.com",
    image: entity[0].attributes.logo.data.attributes.formats.thumbnail.url,
  }

  const paths = {
    fullPath: `/discover/communities/info/${entity[0].attributes.slug}`,
    pathNamesEn: [
      "Discover",
      "Communities",
      "Info",
      entity[0].attributes.name
    ],
    pathNamesVi: [
      "Khám phá",
      "Cộng đồng",
      "Thông tin",
      entity[0].attributes.name
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
            alignItems: "center",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "80px",
              height: "80px",
            }}>
              <Image 
                src={entity[0].attributes.logo.data.attributes.formats.thumbnail.url}
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <h1
              style={{
                width: "100%",
              }}
            >{entity[0].attributes.name}</h1>
          </div>
          <GeneralInfo item={entity} translationFile="discover" />
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

  const entityRes = await fetchStrapiAPI("/entities", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      logo: "*",
      entity_categories: {
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
        entity: entityRes.data,
        ...(await serverSideTranslations(context.locale, ["common", "discover"])) 
    },
  };
}
