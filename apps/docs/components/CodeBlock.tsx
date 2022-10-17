import dynamic from 'next/dynamic'
import Highlight, { defaultProps, Language, PrismTheme } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark'
import { FC } from 'react'
import { cx, theme as appTheme } from 'ui'
import { CopyButton } from './CopyButton'

const CodePreview = dynamic(() => import('./CodePreview').then((mod) => mod.CodePreview), {
  loading: () => <div className="bg-secondary h-48 w-full border-r-8" />,
})

type Props = {
  children: string
  className: string
  live?: boolean
  expand?: boolean
}

const theme: PrismTheme = {
  ...vsDark,
  plain: {
    ...vsDark.plain,
    color: appTheme.text.high,
    backgroundColor: appTheme.background.secondary,
  },
}

const CodeStatic = ({ language, code }: { language: Language; code: string }) => {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {language && (
            <div className="absolute right-1 top-1">
              <CopyButton content={code} />
            </div>
          )}
          {tokens.map((line, i) => {
            const { className: lineClassName, ...lineProps } = getLineProps({ line, key: i })
            return (
              <div key={i} className={cx(lineClassName, 'whitespace-pre-wrap')} {...lineProps}>
                {line.map((token, key) => {
                  const { className: tokenClassName, ...tokenProps } = getTokenProps({ token, key })
                  return (
                    <span
                      className={cx(tokenClassName, 'font-mono text-sm')}
                      key={key}
                      {...tokenProps}
                    />
                  )
                })}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export const CodeBlock: FC<Props> = ({ children, className, live }) => {
  const code = children.trim()
  const language = className?.replace(/language-/, '') as Language

  return (
    <div
      className={cx(
        'bg-secondary text-high border-primary hover:border-secondary relative my-2 rounded-xl border p-3 leading-snug',
        !language ? 'inline-block rounded-sm border py-0 px-1.5 leading-tight' : null,
      )}
    >
      {live ? (
        <CodePreview code={code} language={language} theme={theme} />
      ) : (
        <CodeStatic code={code} language={language} />
      )}
    </div>
  )
}
