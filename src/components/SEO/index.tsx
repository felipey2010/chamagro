'use client'

import { SystemConfig } from '@/data/SystemConfig'

type Props = {
  title: string
  description?: string
  keywords?: string
}

export default function SEO({ title, description, keywords }: Props) {
  const completeTitle = title
    ? title + ' | ' + SystemConfig.title
    : SystemConfig.title
  const completeDescription = description
    ? description
    : SystemConfig.description
  const completeKeywords = keywords ? keywords : SystemConfig.keywords

  let pathname = ''

  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    pathname = `${url.protocol}//${url.host}`
  }

  return (
    <>
      <meta charSet="UTF-8" key="charset" lang="pt-br" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        key="viewport"
      />

      <title>{completeTitle}</title>
      <meta name="description" content={completeDescription} />
      <meta name="keywords" content={completeKeywords} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={completeTitle} />
      <meta property="og:description" content={completeDescription} />
      <meta property="og:url" content={pathname} />
      {/* End Facebook tags */}

      {/* Twitter tags */}
      <meta name="twitter:creator" content={SystemConfig.title} />
      <meta name="twitter:card" content={completeDescription} />
      <meta name="twitter:title" content={completeTitle} />
      <meta name="twitter:description" content={completeDescription} />
      {/* End Twitter tags */}

      {/* <link
        rel="apple-touch-icon"
        href="/assets/images/gov-roraima-icon.png"
        key="govroraima"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={"/assets/images/favicon-32x32.png"}
        key="icon32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={"/assets/images/favicon-16x16.png"}
        key="icon16"
      />
      <link rel="icon" href={"/assets/images/favicon.ico"} key="favicon" /> */}
    </>
  )
}
