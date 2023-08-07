import Head from "next/head";
import Header from "../../components/Header/Header";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AppFooter from "../../components/AppFooter/AppFooter";
import styles from '../../styles/0xstim.module.css'
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../../components/NavigationGroup/NavigationGroup";


export default function ZxStim(props) {
  const { t } = useTranslation("zxstim");

  const headerContent = {
    title: "Contact me 0xStim - OpenTechStack.com",
    description: "Get to know me 0xStim, OpenTechStack.com lead builder. Book your meeting with me here!",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/04875cae-074a-46c0-bdc4-b69470999000/defi",
  }

  const paths = {
    fullPath: "/0xstim",
    pathNamesEn: [
      "0xStim"
    ],
    pathNamesVi: [
      "0xStim"
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
          <h2>README.md</h2>
          {/* center the below image */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
            <Image
              src="/0xstim-nouns.svg"
              alt="0xStim pfp"
              width={200}
              height={200}
            />
          </div>
          <div className={styles.links_container}>
            <h3 className={styles.description}>Builder of <a href="https://OpenTechStack.com">OpenTechStack</a> and <a href="https://stimpacks.com">Stimpacks</a></h3>
            <Link className={styles.anchor_tag} href="/">
              <div className={styles.links_button}>
                OpenTechStack
              </div>
            </Link>
            <a className={styles.anchor_tag} href="https://stimpacks.com">
              <div className={styles.links_button}>
                Stimpacks
              </div>
            </a>
            {/* <Link className={styles.anchor_tag} href="/0xstim/profile">
              <div className={styles.links_button}>
                Profile
              </div>
            </Link> */}
            <a className={styles.anchor_tag} href="https://twitter.com/0xStim">
              <div className={styles.links_button}>
                Twitter @0xStim
              </div>
            </a>
            <a className={styles.anchor_tag} href="https://t.me/zxstim">
              <div className={styles.links_button}>
                Telegram @zxstim
              </div>
            </a>
            <a className={styles.anchor_tag} href="https://www.facebook.com/0xstim/">
              <div className={styles.links_button}>
                Facebook @0xStim
              </div>
            </a>
            <a className={styles.anchor_tag} href="https://calendly.com/0xstim/30min">
              <div className={styles.links_button}>
                Schedule a time to talk
              </div>
            </a>
            <a className={styles.anchor_tag} href="https://github.com/0xstim">
              <div className={styles.links_button}>
                GitHub @0xstim
              </div>
            </a>
            <a className={styles.anchor_tag} href="http://discord.com/users/615423002598703106">
              <div className={styles.links_button}>
                Discord @0xStim
              </div>
            </a>
            <a className={styles.anchor_tag} href="https://www.tiktok.com/@0xstim?_t=8aYhMV2KudF&_r=1">
              <div className={styles.links_button}>
                TikTok @0xStim
              </div>
            </a>
            <a className={styles.anchor_tag} href="mailto:zxstim@gmail.com">
              <div className={styles.links_button}>
                zxstim@gmail.com
              </div>
            </a>
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
      ...(await serverSideTranslations(locale, ["common", "zxstim"])),
      // Will be passed to the page component as props
    },
  };
}
