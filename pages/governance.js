import Header from "../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import AppFooter from "../components/AppFooter/AppFooter";
import ProposalsList from "../components/GovProposals/Proposals";


export default function Governance(props) {
  const { t } = useTranslation("governance");
  const headerContent = {
    title: "Governance for OpenTechStack - OpenTechStack.com",
    description: "Propose, discuss and govern how OpenTechStack.com will grow. Contribute to an open hub and help shape the Web3 industry.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/0ad78fdf-55c6-4b61-81b2-26e51dde2f00/defi",
  }

  const paths = {
    fullPath: "/governance",
    pathNamesEn: [
      "Governance"
    ],
    pathNamesVi: [
      "Quản trị"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector path="/governance"/>
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle")}</h2>
          <ProposalsList />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

// This gets called on every request
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "governance"])),
      // Will be passed to the page component as props
    },
  };
}
