import Image from "next/image";
import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { fetchStrapiAPI } from "../../../lib/api";
import AppFooter from "../../../components/AppFooter/AppFooter";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import InvestorInfo from "../../../components/InvestorList/InvestorInfo/InvestorInfo";

export default function InvestorInfoPage({ investor }) {
  const { t } = useTranslation("investors");
  
  // const headerContent = {
  //   title: `${investor[0].attributes.name} - OpenTechStack.com`,
  //   description: `Learn about ${investor[0].attributes.name}`,
  //   icon: "../opentechstack.svg",
  //   domain: "https://www.OpenTechStack.com",
  //   image: "../opentechstack.svg",
  // }

  const headerContent = {
    title: `${investor[0].attributes.name} - OpenTechStack.com`,
    description: `Learn about ${investor[0].attributes.name}`,
    icon: investor[0].attributes.logo.data.attributes.formats.thumbnail.url,
    domain: "https://www.OpenTechStack.com",
    image: investor[0].attributes.logo.data.attributes.formats.thumbnail.url,
  }

  const paths = {
    fullPath: `/investors/info/${investor[0].attributes.slug}`,
    pathNamesEn: [
      "Investors",
      "Info",
      investor[0].attributes.name
    ],
    pathNamesVi: [
      "Nhà đầu tư",
      "Thông tin",
      investor[0].attributes.name
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
            {investor[0].attributes.logo.data ? 
              <div style={{
                width: "90px",
                height: "90px",
              }}>
                <Image 
                  src={investor[0].attributes.logo.data.attributes.formats.thumbnail.url}
                  alt="Investor logo"
                  width={80}
                  height={80}
                  style={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            : null}
            <h1
              style={{
                width: "100%",
              }}
            >{investor[0].attributes.name}</h1>
          </div>
          <InvestorInfo 
            item={investor}
            translationFile="investors"
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
  const { slug } = context.query

  const investorRes = await fetchStrapiAPI("/investors", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      logo: "*",
      investor_categories: {
        fields: ["name", "slug"],
      }, 
      individuals: {
        fields: ["name", "slug"],
      },
      announcements: {
        fields: ["message", "publishedAt"],
      }
    }
  });

  return {
    props: { 
        investor: investorRes.data,
        ...(await serverSideTranslations(context.locale, ["common", "investors"])) 
    },
  };
}
