import copy from 'copy-to-clipboard'
import { useCallback, useRef, useState } from 'react'

export const useCopyToClipboard = (
  contentToCopy: string,
  resetAfterMs = 1000,
): [boolean, VoidFunction] => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      setIsCopied(false)
    }

    copy(contentToCopy, { format: 'text/plain' })

    setIsCopied(true)
    timeoutRef.current = setTimeout(() => setIsCopied(false), resetAfterMs)
  }, [contentToCopy, resetAfterMs])

  return [isCopied, onCopy]
}
