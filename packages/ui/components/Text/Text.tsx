import React from 'react'

export type TextProps = {
  className: HTMLElement['className']
  type: 'button' | 'submit'
}

export const Text = ({ type = 'button' }: TextProps) => {
  return (
    <button type="button" className="bg-blue-400 hover:bg-blue-700 h-16 w-16">
      Boop
    </button>
  )
}
