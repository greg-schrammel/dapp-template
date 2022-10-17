import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cx } from 'class-variance-authority'

export const TooltipProvider = (props: RadixTooltip.TooltipProviderProps) => (
  <RadixTooltip.Provider {...props} />
)

export type TooltipProps = RadixTooltip.TooltipProps &
  RadixTooltip.TooltipContentProps & {
    content: string
  }
export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: TooltipProps) {
  return (
    <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        side="right"
        sideOffset={4}
        {...props}
        className={cx(
          'bg-secondary/95 text-low max-w-md rounded border p-2 text-xs',
          props.className,
        )}
      >
        {content}
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  )
}
