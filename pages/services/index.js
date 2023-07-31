import Header from "../../components/Header/Header";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../../components/UpButton/UpButton";
import AppFooter from "../../components/AppFooter/AppFooter";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";

export default function Services(props) {
  const { t } = useTranslation("services");
  const headerContent = {
    title: "Find your service provider - OpenTechStack.com",
    description: "Find your service provider in our comprehensive list",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/9cf26e72-dc40-4d93-823b-da167198ae00/defi",
  }

  const paths = {
    fullPath: "/services",
    pathNamesEn: [
      "Services"
    ],
    pathNamesVi: [
      "Dịch vụ"
    ],
  }

  const categories = [
    {
      id: 1,
      name: "Audit",
      slug: "audit",
    },
    {
      id: 2,
      name: "Marketing",
      slug: "marketing",
    },
    {
      id: 3,
      name: "Analytics",
      slug: "analytics",
    },
    {
      id: 4,
      name: "Custody",
      slug: "custody",
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
          <h2>{t("subtitle")}</h2>
          <div className="nav-menu-grid">
          {
            categories.map((category) => (
              <Link href={`/services/${category.slug}`} key={category.id} style={{ textDecoration: "none" }}>
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
      ...(await serverSideTranslations(locale, ["common", "services"])),
      // Will be passed to the page component as props
    },
  };
}
