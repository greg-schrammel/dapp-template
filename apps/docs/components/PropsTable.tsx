import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'
import { PropItem } from 'react-docgen-typescript'

import { Link } from './Link'

type Props = {
  sourceLink?: string
  types: Record<string, PropItem>
}

export const PropsTable = ({ sourceLink, types }: Props) => {
  const hasDescription = Object.values(types).some((x) => x.description !== '')
  const [showDescriptions, setShowDescriptions] = useState(hasDescription)

  const headers = ['name', 'type', 'default', ...(showDescriptions ? ['description'] : [])]
  const props = Object.values(types).sort((a, b) => {
    if (a.name.startsWith('on') || b.name.startsWith('on')) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return (
    <>
      {props.length ? (
        <div className="lg:overflow-unset max-w-full overflow-scroll">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary text-left">
                {headers.map((x) => (
                  <th className="sticky top-0 first:rounded-l-lg last:rounded-r-lg" key={x}>
                    <div className="px-4 py-1">
                      <span className="text-medium text-xs font-medium uppercase">{x}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {props.map((x) => (
                <tr className="border-b border-white border-opacity-30 p-2" key={x.name}>
                  <td className="px-4 py-3">
                    <span className="text-high">
                      {x.name}
                      {x.required && (
                        <span className="text-xs text-red-400">
                          {' '}
                          ✱<VisuallyHidden>Required</VisuallyHidden>
                        </span>
                      )}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-blue-400">
                      {x.type.raw ?? x.type.name}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-medium text-xs">
                      {x.defaultValue?.value.toString() ?? '-'}
                    </span>
                  </td>

                  {showDescriptions && (
                    <td className="px-4 py-3">
                      <span className="text-medium text-xs">{x.description || '-'}</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span className="text-medium">No props</span>
      )}

      <div className="my-2">
        <div className="flex justify-end gap-2">
          {!!hasDescription && (
            <button
              className="text-medium hover:text-high text-xs"
              onClick={() => setShowDescriptions((s) => !s)}
            >
              {showDescriptions ? 'Hide Descriptions' : 'Show Descriptions'}
            </button>
          )}

          {sourceLink && (
            <Link href={sourceLink} className="text-medium hover:text-high text-xs">
              View Source on GitHub
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
