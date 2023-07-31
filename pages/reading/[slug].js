import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";
import ReadingPage from "../../components/ReadingPage/ReadingPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import { fetchStrapiAPI } from "../../lib/api";

export default function Article({ article }) {
  const { t } = useTranslation("reading");
  const router = useRouter();
  const paths = {
    fullPath: `/reading/${article.attributes.slug}`,
    pathNamesEn: [
      "Reading crypto researches",
      `${article.attributes.title}`
    ],
    pathNamesVi: [
      "Đọc nghiên cứu crypto",
      `${article.attributes.title}`
    ],
  }
  const headerContent = {
    title: `${article.attributes.title} - OpenTechStack.com`,
    description: article.attributes.description,
    icon: "../opentechstack.svg",
    domain: `https://www.OpenTechStack.com/reading/${article.attributes.slug}`,
    image: article.attributes.image.data.attributes.formats.small.url,
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <ReadingPage article={article} />
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

  const articlesRes = await fetchStrapiAPI("/articles", {
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
        article: articlesRes.data[0],
        ...(await serverSideTranslations(context.locale, ["common", "reading"])) 
    },
  };
}
