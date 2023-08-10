import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../../../components/Header/Header";
import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../../components/NavigationGroup/NavigationGroup";
import EthereumBuildSummary from "../../../components/BuildPlatform/Ethereum/EthereumBuildSummary/EthereumBuildSummary";
// import UpButton from "../../../components/UpButton/UpButton";
import AppFooter from "../../../components/AppFooter/AppFooter";

export default function BuildEthereum(props) {
  const { t } = useTranslation("common");

  const headerContent = {
    title: "How to build on Ethereum - OpenTechStack.com",
    description: "Explore Ethereum ecosystem, development resources and roadmaps on how to become Ethereum developers.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/build/ethereum",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/b29f135c-9a23-4085-4f57-b7390ddf5400/defi",
    twDomain: "OpenTechStack.com",
  }

  const paths = {
    fullPath: "/build-web3/ethereum",
    pathNamesEn: [
      "Build on Web3",
      "Ethereum"
    ],
    pathNamesVi: [
      "Xây dựng trên Web3",
      "Ethereum"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">Ethereum</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <EthereumBuildSummary />
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
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
