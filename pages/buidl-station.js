import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";
import Header from "../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../components/UpButton/UpButton";
import BuidlStation from "../components/BuidlStation/BuidlStation";
import BuidlStationList from "../components/BuidlStation/BuidlStationList";
import AppFooter from "../components/AppFooter/AppFooter";
import { fetchStrapiAPI } from "../lib/api";


export default function BuidlStationPage({ events, pagination }) {
  const { t } = useTranslation("buidl-station");
  const headerContent = {
    title: "Join our Developer Support event | Tham gia sự kiện hỗ trợ Dev của chúng tôi - OpenTechStack.com",
    description: "Are you an aspiring or experienced developer looking for a supportive community to boost your skills and knowledge? Join our developer support event!",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com/dev-support",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/7ddd605f-f108-49fe-3f45-66fe10475000/defi",
  }
  const paths = {
    fullPath: "/buidl-station",
    pathNamesEn: [
      "BUIDL Station",
    ],
    pathNamesVi: [
      "BUIDL Station",
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
          {/* <h2>{t("subtitle")}</h2> */}
          <BuidlStation />
          <BuidlStationList events={events} pagination={pagination} />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {

  var localeSlug = context.locale === "en" ? "buidl-station" : "buidl-station-vi";

  const eventsRes = await fetchStrapiAPI("/events", {
    filters: {
      event_categories: {
        slug: {
          $in: localeSlug,
        },
      },
    },
    fields: [
      "name",
      "slug", 
      "locale",
      "startDatetime",
      "endDatetime",
    ],   
    populate: {
      banner: "*",
    },
    locale: context.locale, 
    pagination: {
      page: context.query.page,
      pageSize: 90,
    },
	  sort: "endDatetime:desc",
  })

  return {
    props: {
      events: eventsRes.data,
      pagination: eventsRes.meta.pagination,
      ...(await serverSideTranslations(context.locale, ["common", "buidl-station"])),
      // Will be passed to the page component as props
    },
  };
}