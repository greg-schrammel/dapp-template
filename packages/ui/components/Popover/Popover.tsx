import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef, PropsWithChildren } from 'react'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverContent = forwardRef<HTMLDivElement, PropsWithChildren<{}>>(
  ({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...props}
        ref={forwardedRef}
        className="bg-secondary flex max-h-96 w-[250px] flex-col gap-2 rounded border p-2 shadow"
      >
        {children}
        {/* <PopoverPrimitive.Arrow className="fill-border-primary" /> */}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
)
