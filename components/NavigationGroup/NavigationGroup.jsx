import { useRouter } from 'next/router'
import { useTranslation } from "next-i18next";
import Link from "next/link";
import styles from "./NavigationGroup.module.css";

export default function NavigationGroup({ paths }) {
  const router = useRouter();
  function constructPaths(pathSegments) {
    const result = [];
    let currentPath = '';

    for (let segment of pathSegments) {
        if (currentPath) {
            currentPath += `/${segment}`;
        } else {
            currentPath = segment;
        }
        result.push(currentPath);
    }

    return result;
  }

  // using switch case to assign paths to currentPathNames
  function selectPathNames(paths) {
    if (router.locale === "en") {
      return paths.pathNamesEn;
    } else if (router.locale === "vi") {
      return paths.pathNamesVi;
    } else {
      return null;
    }
  }

  const currentPathNames = selectPathNames(paths);
  const currentPaths = constructPaths(paths.fullPath.split('/').filter(p => p));
  const { t } = useTranslation("common");

  return (
    <ul className={styles.breadcrumb}>
      <li><Link href="/">{t("back")}</Link></li>
      {/* loop through currentPaths array and create the breadcrumb list items */}
      {
        currentPaths.map((path, index) => {
          if (index === currentPaths.length - 1) {
            return <li key={index}>{currentPathNames[index]}</li>
          }
          return <li key={index}><Link href={`/${path}`}>{currentPathNames[index]}</Link></li>
        }
        )
      }
    </ul>
  )
}