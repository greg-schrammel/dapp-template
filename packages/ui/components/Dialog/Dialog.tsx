import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

export const DialogContent = forwardRef<HTMLDivElement, DialogPrimitive.DialogContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all" />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
      >
        {children}
        {/* <DialogPrimitive.Close aria-label="Close">
            <CloseIcon />
          </DialogPrimitive.Close> */}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
)

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
