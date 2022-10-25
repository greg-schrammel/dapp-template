import * as DialogPrimitive from '@radix-ui/react-dialog'
import { CloseIcon } from 'icons'
import { forwardRef } from 'react'
import { Button } from '../Button'

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
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
)

export const DialogClose = () => (
  <DialogPrimitive.Close aria-label="Close" asChild className="-m-2">
    <Button variant="icon" size="sm">
      <CloseIcon />
    </Button>
  </DialogPrimitive.Close>
)

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
