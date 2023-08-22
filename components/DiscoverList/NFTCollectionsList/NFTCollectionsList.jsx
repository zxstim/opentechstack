import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PaginatedList from "../../PaginatedList/PaginatedList";
import styles from "./NFTCollectionsList.module.css";
// import useSWR from 'swr'

export default function DeFiList({ entities, pagination }) {
  const { t } = useTranslation("discover");
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
          indexPagePath="discover/nft-collections"
        />
        <div className={styles.list_container}>
          {entities.map((entity) => (
            <div key={entity.id} className={styles.item_container}>
              <div className={styles.header_container}>
                <div className={styles.image_name_container}>
                  <Image 
                    src={entity.attributes.logo.data.attributes.formats.thumbnail.url}
                    alt={entity.attributes.logo.alternativeText}
                    width={40}
                    height={40}
                  />
                  <div className={styles.title}>
                    {entity.attributes.name}
                  </div>
                </div>
                <div className={styles.category_tag_container}>
                  {entity.attributes.entity_categories.data.map((tag) => (
                    <div key={tag.id} className={styles.category_tag}>
                      {tag.attributes.name}
                    </div> 
                    ))
                  }
                </div>
              </div>
              <div className={styles.footer_container}>
                <div className={styles.social_container}>
                  {entity.attributes.socials.web ? (
                    <div>
                      <a href={entity.attributes.socials.web}>
                        <Image
                          src="/icons8-website.svg"
                          alt="Web icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.telegram ? (
                    <div>
                      <a href={entity.attributes.socials.telegram}>
                        <Image
                          src="/icons8-telegram.svg"
                          alt="Telegram icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.twitter ? (
                    <div>
                      <a href={entity.attributes.socials.twitter}>
                        <Image
                          src="/icons8-twitter.svg"
                          alt="Twitter icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.discord ? (
                    <div>
                      <a href={entity.attributes.socials.discord}>
                        <Image
                          src="/icons8-discord.svg"
                          alt="Discord icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.facebook ? (
                    <div>
                      <a href={entity.attributes.socials.facebook}>
                        <Image
                          src="/icons8-facebook.svg"
                          alt="Email icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.linkedin ? (
                    <div>
                      <a href={entity.attributes.socials.linkedin}>
                        <Image
                          src="/icons8-linkedin.svg"
                          alt="Linkedin icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.youtube ? (
                    <div>
                      <a href={entity.attributes.socials.youtube}>
                        <Image
                          src="/icons8-youtube.svg"
                          alt="Linkedin icon"
                          width={30}
                          height={30}
                        />
                      </a>
                    </div>
                  ) : null}
                  {entity.attributes.socials.email ? (
                    <span>
                      <a href={entity.attributes.socials.email}>
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
                <Link href={`/discover/nft-collections/info/${entity.attributes.slug}`} style={{ textDecoration: "none", color: "#000000" }}>
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
          indexPagePath="discover/nft-collections"
        />
      </div>  
    </>
  );
}
