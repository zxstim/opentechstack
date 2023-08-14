import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import ButtonList from "../../components/InvestorList/InvestorList";
import Header from "../../components/Header/Header";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { fetchStrapiAPI } from "../../lib/api";
// import ButtonList from "../../components/ButtonList/ButtonList";

export default function Investors({ investors, pagination }) {
  const { t } = useTranslation("investors");
  const headerContent = {
    title: "Global investors list - OpenTechStack.com",
    description: "Find out about different types of investor categories and their contact information.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/6fe5a556-f28d-4f89-4b9d-f8e103ee7600/defi",
  }

  const paths = {
    fullPath: "/investors",
    pathNamesEn: [
      "Investors"
    ],
    pathNamesVi: [
      "Nhà đầu tư"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <LanguageSelector />
          <NavigationGroup paths={paths} />
          <h2>{t("subtitle")}</h2>
          <ButtonList 
            items={investors} 
            pagination={pagination} 
            translationFile="investors"
            indexPagePath="/investors"
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

  // const investorCategoriesRes = await fetchStrapiAPI("/investor-categories")
  const investorsRes = await fetchStrapiAPI("/investors", { 
		fields: [
      "name",
      "description",
      "social", 
      "updatedAt", 
      "slug", 
    ], 
    populate: [
      "investor_categories"
    ], 
    pagination: {
      page: context.query.page,
      pageSize: 60,
    },
		sort: "name:asc"
  })

  return {
    props: {
      investors: investorsRes.data,
      pagination: investorsRes.meta.pagination,
      // investorCategories: investorCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "investors"])),
      // Will be passed to the page component as props
    },
  };
}