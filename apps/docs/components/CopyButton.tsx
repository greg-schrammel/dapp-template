import { CheckIcon, CopyIcon } from 'icons'

import { useCopyToClipboard } from 'hooks'
import { Button } from 'ui'

export const CopyButton = ({ content }: { content: string }) => {
  const [isCopied, onCopy] = useCopyToClipboard(content)
  return (
    <Button variant="icon" onClick={onCopy}>
      {isCopied ? (
        <CheckIcon className="h-4 w-4 text-green-500 " title="Copied" />
      ) : (
        <CopyIcon className="h-4 w-4" title="Copy to Clipboard" />
      )}
    </Button>
  )
}
