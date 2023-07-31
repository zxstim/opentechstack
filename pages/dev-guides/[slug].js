import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";
import DevReadingPage from "../../components/DevReadingPage/DevReadingPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import { fetchStrapiAPI } from "../../lib/api";

export default function DevArticle({ devArticle }) {
  const { t } = useTranslation("reading");
  const router = useRouter();
  const paths = {
    fullPath: `/dev-guides/${devArticle.attributes.slug}`,
    pathNamesEn: [
      "Dev guides",
      `${devArticle.attributes.title}`
    ],
    pathNamesVi: [
      "Hướng dẫn Dev",
      `${devArticle.attributes.title}`
    ],
  }
  const headerContent = {
    title: `${devArticle.attributes.title} - OpenTechStack.com`,
    description: devArticle.attributes.description,
    icon: "../opentechstack.svg",
    domain: `https://www.OpenTechStack.com/dev-guides/${devArticle.attributes.slug}`,
    image: devArticle.attributes.image.data.attributes.formats.small.url,
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <DevReadingPage article={devArticle} />
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

  const devArticlesRes = await fetchStrapiAPI("/dev-articles", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: "*",
      categories: {
        fields: ["name", "slug"],
        sort: ["name:asc"],
      },
      author: {
        populate: ["picture"],
      }
    },
  });

  return {
    props: { 
        devArticle: devArticlesRes.data[0],
        ...(await serverSideTranslations(context.locale, ["common", "reading"])) 
    },
  };
}
