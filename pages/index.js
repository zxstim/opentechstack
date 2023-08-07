import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import Header from "../components/Header/Header";
import AppFooter from "../components/AppFooter/AppFooter";
import AlertMessage from "../components/AlertMessage/AlertMessage";
// import { fetchStrapiAPI } from "../lib/api";

export default function Home(props) {
  const { t } = useTranslation("common");
  const headerContent = {
    title: "OpenTechStack - Explore everything about the modern tech stack",
    description: "OpenTechStack is a community project aiming to be an open technical resource hub for everyone",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/8d6a2d48-99bc-485c-4afc-239196f02200/defi",
  }
  const buttonStyle = {
    backgroundColor: "#ffffff",
    WebkitAppearance: "none",
    borderRadius: "6px",
    border: "2px solid var(--color-fg-default)",
    color: "var(--color-fg-default)",
    boxShadow: "3px 3px black"
  };

  const headingStyle = {
    margin: "0px 0px 0px 0px",
    padding: "15px 15px 10px 15px",
    fontSize: "20px",
    color: "var(--color-fg-default)",
  }

  const paragraphStyle = {
    color: "var(--color-fg-muted)",
    margin: "0px 0px 0px 0px",
    padding: "0px 15px 15px 15px",
    fontSize: "14px",
  }

  const stimButtonStyle = {
    backgroundColor: "#ffffff",
    WebkitAppearance: "none",
    borderRadius: "6px",
    border: "2px solid #4839f4",
    color: "#4839f4",
    boxShadow: "3px 3px #4839f4"
  };

  const stimHeadingStyle = {
    margin: "0px 0px 0px 0px",
    padding: "15px 15px 10px 15px",
    fontSize: "20px",
    color: "#4839f4",
  }

  const stimParagraphStyle = {
    color: "#4839f4",
    margin: "0px 0px 0px 0px",
    padding: "0px 15px 15px 15px",
    fontSize: "14px",
  }


  return (
    <>
      <Header content={headerContent} />
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div className="subtitle">{t("subtitle")}</div>
          <AlertMessage 
            type="special"
            headline="Looking for Defi.vn?"
            message="We have rebranded as OpenTechStack to better reflect our mission to be an open technical resource hub for everyone."
          />
          <LanguageSelector />
          <h2>{t("section-4")}</h2>
          <div
            style={{
              display: "grid",
              gap: "20px 20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            <div style={buttonStyle}>
              <Link href="/dashboard" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title30")}</h3>
                <p style={paragraphStyle}>{t("subtitle30")}</p>
              </Link>
            </div>
            <div style={stimButtonStyle}>
              <Link href="https://stimpacks.com" style={{ textDecoration: "none"}}>
                  <h3 style={stimHeadingStyle}>
                    <Image 
                      src="/stimpacks-logo.svg" 
                      alt="stimpacks-logo" 
                      width={20} 
                      height={20}
                      style={{marginRight: "4px"}} 
                    />
                    {t("title31")}
                  </h3>
                  <p style={stimParagraphStyle}>{t("subtitle31")}</p>
              </Link>
            </div>
          </div>
          <h2>{t("section-1")}</h2>
          <div
            style={{
              display: "grid",
              gap: "20px 20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            <div style={buttonStyle}>
              <Link href="/build-web3" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title1")}</h3>
                <p style={paragraphStyle}>{t("subtitle1")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/build-web2" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title32")}</h3>
                <p style={paragraphStyle}>{t("subtitle32")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/code" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title5")}</h3>
                <p style={paragraphStyle}>{t("subtitle5")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/dev-tools" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title17")}</h3>
                <p style={paragraphStyle}>{t("subtitle17")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/bot" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title3")}</h3>
                <p style={paragraphStyle}>{t("subtitle3")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/hackathons" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title4")}</h3>
                <p style={paragraphStyle}>{t("subtitle4")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/dev-guides" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title16")}</h3>
                <p style={paragraphStyle}>{t("subtitle16")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/buidl-station" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title28")}</h3>
                <p style={paragraphStyle}>{t("subtitle28")}</p>
              </Link>
            </div>
          </div>
          <h2>{t("section-3")}</h2>
          <div
            style={{
              display: "grid",
              gap: "20px 20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            <div style={buttonStyle}>
              <Link href="/services" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title13")}</h3>
                <p style={paragraphStyle}>{t("subtitle13")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/investors" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title12")}</h3>
                <p style={paragraphStyle}>{t("subtitle12")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/pros-for-hire" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title6")}</h3>
                <p style={paragraphStyle}>{t("subtitle6")}</p>
              </Link>
            </div>
          </div>
          <h2>{t("section-2")}</h2>
          <div
            style={{
              display: "grid",
              gap: "20px 20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            <div style={buttonStyle}>
              <Link href="/start" style={{ textDecoration: "none"}}>
                <h3 style={headingStyle}>{t("title21")}</h3>
                <p style={paragraphStyle}>{t("subtitle21")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/buy" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title7")}</h3>
                  <p style={paragraphStyle}>{t("subtitle7")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/shop" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title24")}</h3>
                  <p style={paragraphStyle}>{t("subtitle24")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/discover" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title19")}</h3>
                  <p style={paragraphStyle}>{t("subtitle19")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/playground" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title27")}</h3>
                  <p style={paragraphStyle}>{t("subtitle27")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/jobs" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title29")}</h3>
                  <p style={paragraphStyle}>{t("subtitle29")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/reading" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title25")}</h3>
                  <p style={paragraphStyle}>{t("subtitle25")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/playground" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title18")}</h3>
                  <p style={paragraphStyle}>{t("subtitle18")}</p>
              </Link>
            </div>
            <div style={buttonStyle}>
              <Link href="/governance" style={{ textDecoration: "none"}}>
                  <h3 style={headingStyle}>{t("title26")}</h3>
                  <p style={paragraphStyle}>{t("subtitle26")}</p>
              </Link>
            </div>
            {/* <Link href="/trading">
              <a style={{ textDecoration: "none" }}>
                <h3 style={buttonStyle}>{t("title8")}</h3>
              </a>
            </Link>
            <Link href="/defi-analytics">
              <a style={{ textDecoration: "none" }}>
                <h3 style={buttonStyle}>{t("title9")}</h3>
              </a>
            </Link>
            <Link href="/learn-defi">
              <a style={{ textDecoration: "none" }}>
                <h3 style={buttonStyle}>{t("title11")}</h3>
              </a>
            </Link> */}
            {/* <Link href="/rekt">
              <a style={{ textDecoration: "none" }}>
                <h3 style={buttonStyle}>{t("title20")}</h3>
              </a>
            </Link> */}
          </div>
          <br />
          <hr />
          <AppFooter />
          <br />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  
  // const announcementsRes = await fetchStrapiAPI("/announcements", { populate: ["image"] })
  // const thumbnailRes = await fetchStrapiAPI("/page-thumbnails", { populate: ["thumbnail"] })

  return {
    props: {
      // announcements: announcementsRes.data,
      // thumbnail: thumbnailRes.data,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
