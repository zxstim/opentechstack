import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PaginatedList from "../PaginatedList/PaginatedList";
import styles from "./GeneralList.module.css";
// import useSWR from 'swr'

export default function GeneralList({ items, pagination, itemCategories, translationFile, indexPagePath, infoPagePath }) {
  const { t } = useTranslation(translationFile);
  const router = useRouter();

  return (
    <>
      {/* <div className={styles.wallet_filter_container}>
        <div>
          <label>{t("chain-filter")}</label>
          <select className={styles.wallet_filter_select} name="wallets" id="wallets" onChange={filterWalletsDropdown}>
            <option value="">All</option>
            {walletChains.map((chain, index) => (<option key={index} value={chain}>{chain}</option>))}
          </select>
        </div>
        <div>
          <label>{t("tech-filter")}</label>
          <select className={styles.wallet_filter_select} name="wallets" id="wallets" onChange={filterWalletsTechDropdown}>
            <option value="">All</option>
            {walletTechs.map((tech, index) => (<option key={index} value={tech}>{tech}</option>))}
          </select>
        </div>
      </div> */}
      <div className={styles.layout_container}>
        <PaginatedList
          currentPage={pagination.page}
          totalItems={pagination.total} 
          totalPages={pagination.pageCount}
          indexPagePath={indexPagePath}
        />
        <div className={styles.wallets_container}>
          {items.map((item) => (
            <div key={item.id} className={styles.wallets_item}>
              <div className={styles.wallets_item_info}>
                <div className={styles.image_name_container}>
                  <Image 
                    src={item.attributes.logo.data.attributes.formats.thumbnail.url}
                    alt={item.attributes.logo.alternativeText}
                    width={40}
                    height={40}
                  />
                  <div className={styles.wallets_item_title}>
                    {item.attributes.name}
                  </div>
                </div>
                <div className={styles.wallets_item_tech_badge_container}>
                  {item.attributes.entity_categories.data.map((tag) => (
                    <div key={tag.id} className={styles.wallets_item_tech}>
                      {tag.attributes.name}
                    </div> 
                    ))
                  }
                </div>
              </div>
              <div className={styles.wallets_cta_container}>
                <div className={styles.wallets_social_container}>
                  {item.attributes.socials.website ? (
                    <div>
                      <a href={item.attributes.socials.website}>
                        <Image
                          src="/icons8-website.svg"
                          alt="Web icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.telegram ? (
                    <div>
                      <a href={item.attributes.socials.telegram}>
                        <Image
                          src="/icons8-telegram.svg"
                          alt="Telegram icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.twitter ? (
                    <div>
                      <a href={item.attributes.socials.twitter}>
                        <Image
                          src="/icons8-twitter.svg"
                          alt="Twitter icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.discord ? (
                    <div>
                      <a href={item.attributes.socials.discord}>
                        <Image
                          src="/icons8-discord.svg"
                          alt="Discord icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.facebook ? (
                    <div>
                      <a href={item.attributes.socials.facebook}>
                        <Image
                          src="/icons8-facebook.svg"
                          alt="Email icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.linkedin ? (
                    <div>
                      <a href={item.attributes.socials.linkedin}>
                        <Image
                          src="/icons8-linkedin.svg"
                          alt="Linkedin icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.youtube ? (
                    <div>
                      <a href={item.attributes.socials.youtube}>
                        <Image
                          src="/icons8-youtube.svg"
                          alt="Linkedin icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {item.attributes.socials.email ? (
                    <span>
                      <a href={item.attributes.socials.email}>
                        <Image
                          src="/icons8-circled-envelope.svg"
                          alt="Email icon"
                          width={32}
                          height={32}
                        />
                      </a>
                    </span>
                  ) : null}
                </div>
                <Link href={`/${indexPagePath}/info/${item.attributes.slug}`} style={{ textDecoration: "none", color: "#000000" }}>
                  <div className={styles.cta_learn_more}>{t("cta")}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <PaginatedList
          currentPage={pagination.page}
          totalItems={pagination.total} 
          totalPages={pagination.pageCount}
          indexPagePath={indexPagePath}
        />
      </div>  
    </>
  );
}
