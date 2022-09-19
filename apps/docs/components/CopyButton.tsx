import { CheckIcon, CopyIcon } from 'icons'

import { useCopyToClipboard } from 'hooks'

export const CopyButton = ({ content }: { content: string }) => {
  const [isCopied, onCopy] = useCopyToClipboard(content)
  return (
    <button className="text-low rounded-lg p-1 hover:bg-white/10" onClick={onCopy}>
      {isCopied ? (
        <CheckIcon className="h-4 w-4 text-green-500 " title="Copied" />
      ) : (
        <CopyIcon className="h-4 w-4" title="Copy to Clipboard" />
      )}
    </button>
  )
}
