import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import formatArticleTimeStampEn from "../../utils/formatArticleTimeStampEn";
import formatArticleTimeStampVi from "../../utils/formatArticleTimeStampVi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styles from "./DevReadingPage.module.css";


export default function DevReadingPage({ article }) {
  // const { t } = useTranslation("reading");
  const router = useRouter();
  
  return (
    <>
      <Image
        src={article.attributes.image.data.attributes.formats.large.url}
        alt={article.attributes.image.data.attributes.alternativeText}
        width="1200"
        height="630"
        layout="responsive"
      />
      <h1>{article.attributes.title}</h1>
      <p>{article.attributes.description}</p>
      <div className={styles.tags_container}>
        {article.attributes.categories.data.map((category) => (
            <div key={category.id} className={styles.tag}>
              {category.attributes.name}
            </div>
          ))
        }
      </div>
      <Link href={`/${article.attributes.author.data.attributes.name}`} style={{ textDecoration: "none" }}>
        <div style={{ display: "flex" }}>
          <div className={styles.article_author_container}>
            <Image
              src={article.attributes.author.data.attributes.picture.data.attributes.formats.thumbnail.url}
              alt={article.attributes.author.data.attributes.picture.data.attributes.formats.thumbnail.name}
              width={50}
              height={50}
              className={styles.author_pfp}
            />
            <div>{article.attributes.author.data.attributes.name}</div>
          </div>
        </div>
      </Link >
      <div className={styles.timestamp}>
        🗓️ {router.locale === "en" ? formatArticleTimeStampEn(article.attributes.updatedAt) : formatArticleTimeStampVi(article.attributes.updatedAt)}
      </div>
      <ReactMarkdown
        children={article.attributes.content}
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
    </>
  )
}