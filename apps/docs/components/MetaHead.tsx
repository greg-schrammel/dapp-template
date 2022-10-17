import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { useTheme } from 'ui'
import { darkTheme, lightTheme } from 'ui/styles/themes'

// TODO: update with project info

export const HOST_URL = ''
export const TWITTER_USER = ''
export const SITE_NAME = 'docs'
export const FAVICO = '/assets/favico.svg'

export interface MetaProps {
  description?: string
  image?: string
  title: string
  type?: string
}

export const MetaHead = ({ meta: _meta }: { meta?: MetaProps }): JSX.Element => {
  const { resolvedTheme } = useTheme()
  const themeColor =
    resolvedTheme === 'light' ? lightTheme.background.primary : darkTheme.background.primary // not super happy with this
  const router = useRouter()
  const meta: MetaProps = {
    title: 'docs',
    description: '',
    image: `${HOST_URL}/assets/thumb.jpg`,
    type: 'website',
    ..._meta,
  }

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_USER} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <link rel="shortcut icon" href={FAVICO} />
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}
