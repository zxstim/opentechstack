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

export default function SecurityInfoPage({ entity }) {
  const { t } = useTranslation("security");

  const headerContent = {
    title: `${entity[0].attributes.name} - OpenTechStack.com`,
    description: `Learn about ${entity[0].attributes.name}`,
    icon: entity[0].attributes.logo.data.attributes.formats.thumbnail.url,
    domain: "https://www.OpenTechStack.com",
    image: entity[0].attributes.logo.data.attributes.formats.thumbnail.url,
  }

  const paths = {
    fullPath: `/services/security/info/${entity[0].attributes.slug}`,
    pathNamesEn: [
      "Services",
      "Security",
      "Info",
      entity[0].attributes.name
    ],
    pathNamesVi: [
      "Dịch vụ",
      "Bảo mật",
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
                alt={entity[0].attributes.logo.alternativeText}
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

          {/* <div style={{ display: "flex", marginBottom: "10px" }}>
            <Link href={`/discover/wallets/info/${constructSlug(entity[0].attributes.slug).slugEn}`} locale="en">
            <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇬🇧</p>
            </a>
            </Link>
            <Link href={`/discover/wallets/info/${constructSlug(entity[0].attributes.slug).slugVi}`} locale="vi">
            <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇻🇳</p>
            </a>
            </Link>
          </div> */}
          <GeneralInfo item={entity} translationFile="security" />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  // var slug;
  // var slug_vi;
 
  // if (context.query.slug.split("-").pop() === "vi") {
  //   slug_vi = context.query.slug;
  //   slug = context.query.slug.split("-")[0];
  // } else {
  //   slug = context.query.slug;
  //   slug_vi = context.query.slug + "-vi";
  // }
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
    locale: "all"
  });

  return {
    props: { 
        entity: entityRes.data,
        ...(await serverSideTranslations(context.locale, ["common", "security"])) 
    },
  };
}
