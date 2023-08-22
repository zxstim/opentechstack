import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import formatArticleTimeStampEn from "../../../../utils/formatArticleTimeStampEn";
import formatArticleTimeStampVi from "../../../../utils/formatArticleTimeStampVi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styles from "./DeFiInfo.module.css";
// import useSWR from 'swr'

export default function DeFiInfo({ entity }) {
  const { t } = useTranslation("discover");
  const router = useRouter();

  return (
    <>
      <div className={styles.datetime_info}>
        🗓️ {router.locale === "en" ? formatArticleTimeStampEn(entity[0].attributes.updatedAt) : formatArticleTimeStampVi(defiProject[0].attributes.updatedAt)}
      </div>
      <h2>{t("social")}</h2>
      <div className={styles.social_container}>
        {entity[0].attributes.socials.web ? (
          <a href={entity[0].attributes.socials.web} className={styles.anchor_tag}>
            <div className={styles.social_tag}>
              <Image
                src="/icons8-website.svg"
                alt="Web icon"
                width={20}
                height={20}
              />   
                <div>{t("website")}</div>   
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.telegram ? (
          <a href={entity[0].attributes.socials.telegram} className={styles.anchor_tag}>
            <div className={styles.social_tag}>
              <Image
                src="/icons8-telegram.svg"
                alt="Telegram icon"
                width={20}
                height={20}
              />
              <div>Telegram</div>
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.twitter ? (
          <a href={entity[0].attributes.socials.twitter} className={styles.anchor_tag}>
            <div className={styles.social_tag}>  
              <Image
                src="/icons8-twitter.svg"
                alt="Twitter icon"
                width={20}
                height={20}
              />
              <div>Twitter</div>
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.discord ? (
          <a href={entity[0].attributes.socials.discord} className={styles.anchor_tag}>
            <div className={styles.social_tag}>   
              <Image
                src="/icons8-discord.svg"
                alt="Discord icon"
                width={20}
                height={20}
              />
              <div>Discord</div>
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.facebook ? (
          <a href={entity[0].attributes.socials.facebook} className={styles.anchor_tag}>
            <div className={styles.social_tag}>   
              <Image
                src="/icons8-facebook.svg"
                alt="Email icon"
                width={20}
                height={20}
              />
              <div>Facebook</div>
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.linkedin ? (
          <a href={entity[0].attributes.socials.linkedin} className={styles.anchor_tag}>
            <div className={styles.social_tag}> 
              <Image
                src="/icons8-linkedin.svg"
                alt="Linkedin icon"
                width={20}
                height={20}
              />
              <div>LinkedIn</div>
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.youtube ? (
          <a href={entity[0].attributes.socials.youtube}>
            <div className={styles.social_tag}>
              <Image
                src="/icons8-youtube.svg"
                alt="Youtube icon"
                width={20}
                height={20}
              />
              <div>YouTube</div>
            </div>
          </a>
        ) : null}
        {entity[0].attributes.socials.email ? (
          <a href={entity[0].attributes.socials.email}>
            <div className={styles.social_tag}>
              <Image
                src="/icons8-circled-envelope.svg"
                alt="Email icon"
                width={22}
                height={22}
              />
              <div>Email</div>
            </div>
          </a>
        ) : null}
      </div>
      <h2>{t("category")}</h2>
      <div className={styles.categories_container}>
        {entity[0].attributes.entity_categories.data.map((category) => (
          <div key={category.id} className={styles.category}>
            {category.attributes.name}
          </div>
        ))}
      </div>
      <h2>{t("blockchain")}</h2>
      <div className={styles.categories_container}>
        {entity[0].attributes.blockchains.data.map((blockchain) => (
          <div key={blockchain.id} className={styles.blockchain}>
            {blockchain.attributes.name}
          </div>
        ))}
      </div>
      <h2>{t("content")}</h2>
      {entity[0].attributes.content ? 
        <ReactMarkdown
          children={entity[0].attributes.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
                <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={github}
                language={match[1]}
                PreTag="div"
                {...props}
                />
              ) : (
                <code className={className} {...props}>
                {children}
                </code>
              );
            },
          }}
        /> 
      : null}
    </>
  );
}
