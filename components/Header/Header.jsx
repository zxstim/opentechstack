import Head from 'next/head';


export default function Header({ content }) {
  return (
    <Head>
      <title>{content.title}</title>
      <meta name="description" content={content.description}/>
      <meta charSet="utf-8" />
      <link rel="icon" href={content.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={content.domain} />
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:image" content={content.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="OpenTechStack.com" />
      <meta property="twitter:url" content={content.domain} />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.description} />
      <meta name="twitter:image" content={content.image} />
  </Head>
  )
}