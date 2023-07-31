import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../components/AppFooter/AppFooter";
import Header from "../components/Header/Header";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

export default function LearnToCode(props) {
  const { t } = useTranslation("code");
  const headerContent = {
    title: "Learn to code - OpenTechStack.com",
    description: "Learn about roadmaps to become many different tech roles and how to code in different languages.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/1f40f51c-7491-4f22-a1d6-8b41a1bb3300/defi",
  }

  const paths = {
    fullPath: "/code",
    pathNamesEn: [
      "Learn to code"
    ],
    pathNamesVi: [
      "Học lập trình"
    ],
  }

  const categories = [
    {
      id: 1,
      name: "Frontend",
      slug: "frontend",
    },
    {
      id: 2,
      name: "Backend",
      slug: "backend",
    },
    {
      id: 3,
      name: "Blockchain",
      slug: "blockchain",
    },
    {
      id: 4,
      name: "DevOps",
      slug: "devops",
    },
    {
      id: 5,
      name: "Android",
      slug: "android",
    },
    {
      id: 6,
      name: "DBA",
      slug: "dba",
    },
    {
      id: 7,
      name: "QA",
      slug: "qa",
    },
  ]

  const languages = [
    {
      id: 1,
      name: "Javascript",
      slug: "javascript",
    },
    {
      id: 2,
      name: "Python",
      slug: "python",
    },
    {
      id: 3,
      name: "Solidity",
      slug: "solidity",
    },
    {
      id: 4,
      name: "Cairo",
      slug: "cairo",
    },
    {
      id: 5,
      name: "Rust",
      slug: "rust",
    },
    {
      id: 6,
      name: "Go",
      slug: "go",
    },
    {
      id: 7,
      name: "Move",
      slug: "move",
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
          <h2>{t("subtitle1")}</h2>
          <div className="nav-menu-grid">
            {categories.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                } else if (a.name > b.name) {
                  return 1;
                } else {
                  return 0;
                }
              }).map((category) => (
              <Link href={`/code/${category.slug}`} key={category.id} style={{ textDecoration: "none" }}>
                <h3 className="nav-menu-button">{category.name}</h3>
              </Link>
            ))}
          </div>
          <h2>{t("subtitle2")}</h2>
          <div className="nav-menu-grid">
            {
              languages.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                } else if (a.name > b.name) {
                  return 1;
                } else {
                  return 0;
                }
              }).map((language) => (
                <Link href={`/code/${language.slug}`} key={language.id} style={{ textDecoration: "none" }}>
                  <h3 className="nav-menu-button">{language.name}</h3>
                </Link>
              ))
            }
          </div>
          <br />
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
      ...(await serverSideTranslations(locale, ["common", "code"])),
      // Will be passed to the page component as props
    },
  };
}
