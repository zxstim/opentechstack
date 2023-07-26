import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "./LanguageSelector.module.css";

export default function LangSelector() {
  const router = useRouter();
  const currentPath = router.asPath;
  const [currentLanguage, setCurrentLanguage] = useState(router.locale);

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;

    // Set language in local state and navigate to new locale
    setCurrentLanguage(newLocale);
    router.push(currentPath, currentPath, { locale: newLocale });
  };

  useEffect(() => {
    setCurrentLanguage(router.locale);
  }, [router.locale]);

  const languages = [
    { code: "en", name: "English 🇬🇧", country_code: "gb" },
    { code: "vi", name: "Tiếng Việt 🇻🇳", country_code: "vn" },
  ]

  return (
    <select 
      name="languageSelector" 
      id="languageSelector" 
      className={styles.selector} 
      value={currentLanguage} 
      onChange={handleLanguageChange}
      >
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  )
}