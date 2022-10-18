import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cx } from 'class-variance-authority'
import { ReactNode } from 'react'

export const TooltipProvider = (props: RadixTooltip.TooltipProviderProps) => (
  <RadixTooltip.Provider {...props} />
)

// redefine some props just to show up in the docs :)
export type TooltipProps = RadixTooltip.TooltipProps &
  RadixTooltip.TooltipContentProps & {
    /** Tooltip trigger */
    children: ReactNode
    /** Text content */
    content: string
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true
    /** The duration from when the pointer enters the trigger until the tooltip gets opened. */
    delayDuration?: number
  }
export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 700,
  ...props
}: TooltipProps) {
  return (
    <RadixTooltip.Root
      delayDuration={delayDuration}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        side="right"
        sideOffset={4}
        {...props}
        className={cx(
          'bg-secondary/95 text-low max-w-md rounded-sm border p-2 text-xs shadow-md',
          props.className,
        )}
      >
        {content}
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  )
}
