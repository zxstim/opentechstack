import Header from "../../../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import AppFooter from "../../../components/AppFooter/AppFooter";

export default function EthereumDevRoadmap(props) {
  const { t } = useTranslation("build");

  const headerContent = {
    title: "Ethereum BUIDL resources | Tài liệu BUIDL trên Ethereum - OpenTechStack.com",
    description: "Check out the roadmap to become Ethereum developers and all the resources for you to learn.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/buidl/ethereum/ethereum-developer-roadmap",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/b29f135c-9a23-4085-4f57-b7390ddf5400/defi",
    twDomain: "OpenTechStack.com",
  }

  const paths = {
    fullPath: "/build-web3/ethereum/developer-roadmap",
    pathNamesEn: [
      "Build on Web3",
      "Ethereum",
      "Ethereum Developer Roadmap",
    ],
    pathNamesVi: [
      "Xây dựng trên Web3Web",
      "Ethereum",
      "Con đường trở thành Ethereum Developer",
    ]
  }

  return (
    <>
      <Header content={headerContent} />  
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>👇 Start from here!</h2>
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
