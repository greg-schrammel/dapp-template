import * as Icons from 'icons'
import NextImage from 'next/future/image'
import NextLink from 'next/link'
import { Language, PrismTheme } from 'prism-react-renderer'
import { useRef } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import * as Components from 'ui/components'
import { CopyButton } from './CopyButton'

export type Props = {
  code: string
  language: Language
  theme?: PrismTheme
}

export const CodePreview = ({ code, language, theme }: Props) => {
  const previewRef = useRef(null)
  return (
    <LiveProvider
      as="div"
      code={code}
      language={language}
      scope={{
        ...Components,
        ...Icons,
        previewRef,
        NextImage,
        NextLink,
      }}
      theme={theme}
      transformCode={(code) =>
        `<div className="flex flex-col gap-2 items-center text-high font-sans"> ${code} </div>`
      }
    >
      <div className="overflow-visible p-3" ref={previewRef}>
        <LivePreview />
        <LiveError className="font-mono text-xs text-red-500" />
      </div>
      <div className="-mx-3 my-2 border-t border-white/10" />
      <div className="relative py-2">
        <LiveEditor />

        <div className="absolute -right-2 -top-1">
          <CopyButton content={code} />
        </div>
      </div>
    </LiveProvider>
  )
}
