import styles from "./InvestorList.module.css";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import PaginatedList from "../PaginatedList/PaginatedList";


export default function ButtonList({ items, translationFile, indexPagePath, pagination }) {
  const { t } = useTranslation(translationFile);

  return (
    <div className={styles.layout_container}>
      <PaginatedList
        currentPage={pagination.page}
        totalItems={pagination.total} 
        totalPages={pagination.pageCount}
        indexPagePath={indexPagePath}
      />
      <div className={styles.menu_grid}>
        {items.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          }).map((item) => (
          <div key={item.id} className={styles.button_container}>
            <Link href={`/investors/info/${item.attributes.slug}`} 
              className={styles.anchor}
              >
              <div className={styles.container}>
                {item.attributes.logo ?
                  <Image 
                    src={item.attributes.logo.data.attributes.formats.thumbnail.url}
                    alt={item.attributes.logo.alternativeText}
                    width={40} 
                    height={40}
                    className={styles.logo}
                  /> : null}
                <div className={styles.title}>                 
                  {item.attributes.name}
                </div>
              </div>
              <div className={styles.tags_container}>
                {item.attributes.investor_categories ?
                  item.attributes.investor_categories.data.map((tag) => (
                    <div key={tag.id} className={styles.tag}>
                      {tag.attributes.name}
                    </div> 
                  )) : null
                }
              </div>
              <div className={styles.description}>
                {item.attributes.description}
              </div>
            </Link>
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
  );
} 