import Link from "next/link";
import Header from "../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";


export default function build(props) {
  const { t } = useTranslation("build");

  const buttonStyle = {
    backgroundColor: "#ebebeb",
    margin: "5px 5px 5px 0px",
    padding: "15px 10px 15px 10px",
    WebkitAppearance: "none",
    borderRadius: "6px",
    border: "2px solid var(--color-border-default)",
    fontSize: "20px",
    color: "var(--color-fg-default)",
  };

  const headerContent = {
    title: "Build on Web3 - OpenTechStack.com",
    description: "Explore Web3 ecosystems, roadmaps on how to become builders, resources for you to become a great builder.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/build",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/b29f135c-9a23-4085-4f57-b7390ddf5400/defi",
    twDomain: "OpenTechStack.com",
  }

  const paths = {
    fullPath: "/build-web2",
    pathNamesEn: [
      "Build on Web2"
    ],
    pathNamesVi: [
      "Xây dựng trên Web2"
    ],
  }

  const platforms = [
    {
      id: 1,
      name: "Local server",
      path: "/build-web2/local-server",
    },
    {
      id: 2,
      name: "Amazon Web Services",
      path: "/build-web2/amazon-web-services",
    },
    {
      id: 3,
      name: "Google Cloud Platform",
      path: "/build-web2/google-cloud-platform",
    },
    {
      id: 4,
      name: "Microsoft Azure",
      path: "/build-web2/microsoft-azure",
    }
  ]

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths}/>
          <h2>{t("subtitle1")}</h2>
          <AlertMessage type="neutral" headline="✏️ Note" message="This is a work in progress!"/>
          <div className="nav-menu-grid">
            {platforms.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                } else if (a.name > b.name) {
                  return 1;
                } else {
                  return 0;
                }
              }).map((platform) => (
              <Link key={platform.id} href={platform.path} style={{ textDecoration: "none" }}>
                <h3 className="nav-menu-button">{platform.name}</h3>
              </Link>
            ))}
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
      ...(await serverSideTranslations(locale, ["common", "build"])),
      // Will be passed to the page component as props
    },
  };
}
