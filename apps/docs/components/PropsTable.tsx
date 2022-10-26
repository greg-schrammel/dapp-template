import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { QuestionMarkIcon } from 'icons'
import { PropItem } from 'react-docgen-typescript'
import { Button, ExternalLink, Tooltip } from 'ui'

type PropsTableProps = {
  componentSourceCodeLink?: string
  types: Record<string, PropItem>
}

const sortEventsOnTop = (types: PropsTableProps['types']) =>
  Object.values(types).sort((a, b) => {
    if (a.name.startsWith('on') || b.name.startsWith('on')) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

export const PropsTable = ({ componentSourceCodeLink, types }: PropsTableProps) => {
  const headers = ['name', 'type', 'default']
  const props = sortEventsOnTop(types)

  return (
    <>
      {props.length ? (
        <div className="lg:overflow-unset max-w-full overflow-scroll">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary text-left">
                {headers.map((x) => (
                  <th className="sticky top-0 first:rounded-l last:rounded-r" key={x}>
                    <div className="px-4 py-1">
                      <span className="text-low text-xs font-medium uppercase">{x}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {props.map((x) => (
                <tr className="border-secondary border-b border-opacity-30 p-2" key={x.name}>
                  <td className="align-center flex gap-1 px-4 py-3">
                    <span className="text-high">{x.name}</span>
                    {x.required && (
                      <span className="text-xs text-red-400">
                        ✱<VisuallyHidden>Required</VisuallyHidden>
                      </span>
                    )}
                    {!!x.description && (
                      <Tooltip content={x.description} side="top">
                        <Button variant="icon" size="sm">
                          <QuestionMarkIcon title="description" />
                        </Button>
                      </Tooltip>
                    )}
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
          {componentSourceCodeLink && (
            <ExternalLink
              href={componentSourceCodeLink}
              className="text-low hover:text-high text-xs"
            >
              View Source on GitHub
            </ExternalLink>
          )}
        </div>
      </div>
    </>
  )
}
