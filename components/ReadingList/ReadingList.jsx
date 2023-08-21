// import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useTranslation } from "next-i18next";
import PaginatedList from "../PaginatedList/PaginatedList";
import formatArticleTimeStampEn from "../../utils/formatArticleTimeStampEn";
import formatArticleTimeStampVi from "../../utils/formatArticleTimeStampVi";
import styles from "./ReadingList.module.css";
import { useRouter } from "next/router";


export default function ReadingList({ articles, pagination, categories }) {
  // const { t } = useTranslation("reading");
  const router = useRouter();

  return (
      <div className={styles.layout_container}>
        <PaginatedList
          currentPage={pagination.page}
          totalItems={pagination.total}
          totalPages={pagination.pageCount}
          indexPagePath="reading/page"
        />
        <div className={styles.reading_list_container}>
          {articles.map((article) => (
            <div key={article.id} className={styles.article_container}>
              <Link href={`/reading/${article.attributes.slug}`} className={styles.reading_anchor_tag}>
                <Image
                  src={article.attributes.image.data.attributes.formats.small.url}
                  alt={article.attributes.image.data.attributes.alternativeText}
                  width={article.attributes.image.data.attributes.formats.small.width}
                  height={article.attributes.image.data.attributes.formats.small.height}
                  layout="responsive"
                  className={styles.article_image}
                />
                <div className={styles.article_content_container}>
                  <div className={styles.timestamp}>
                    {router.locale == "en" ? formatArticleTimeStampEn(article.attributes.updatedAt) : formatArticleTimeStampVi(article.attributes.updatedAt)}
                  </div>
                  <div className={styles.article_title}>
                    {article.attributes.title}
                  </div>
                  <div className={styles.tags_container}>
                    {article.attributes.categories.data.map((category) => (
                        <div key={category.id} className={styles.tag}>
                          {category.attributes.name}
                        </div>
                      ))
                    }
                  </div>
                  <div className={styles.author_info_box}>
                    <Image
                      src={article.attributes.author.data.attributes.picture.data.attributes.formats.thumbnail.url}
                      alt={article.attributes.author.data.attributes.picture.data.attributes.formats.thumbnail.name}
                      width={25}
                      height={25}
                      className={styles.author_pfp}
                    />
                    <div>{article.attributes.author.data.attributes.name}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <PaginatedList
          currentPage={pagination.page}
          totalItems={pagination.total} 
          totalPages={pagination.pageCount}
          indexPagePath="reading/page"
        />
      </div>
  );
}
