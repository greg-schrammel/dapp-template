import { Types } from 'connectkit'
import { theme } from 'ui'

const rgb = (cssVar: Readonly<string>) => `rgb(var(--${cssVar}))` as const

export const ckTheme: Types.CustomTheme = {
  '--ck-font-family': 'InterVariable',

  '--ck-body-color': theme.text.high,
  '--ck-body-background': theme.background.secondary,
  '--ck-body-background-secondary': theme.background.tertiary,
  '--ck-body-background-tertiary': theme.background.tertiary,
  '--ck-body-action-color': theme.text.low,
  '--ck-copytoclipboard-stroke': theme.text.low,

  '--ck-primary-button-background': theme.background.tertiary,
  '--ck-primary-button-hover-background': theme.background.tertiary,
  '--ck-primary-button-border-radius': '14px',
  '--ck-primary-button-hover-box-shadow': `0px 0px 0px 3px ${theme.border.primary}`,

  '--ck-secondary-button-background': theme.background.tertiary,
  '--ck-secondary-button-hover-background': theme.background.tertiary,
  '--ck-secondary-button-border-radius': '14px',
  '--ck-secondary-button-hover-box-shadow': `0px 0px 0px 3px ${theme.border.primary}`,

  '--ck-tertiary-button-background': theme.background.secondary,
  '--ck-tertiary-button-hover-background': theme.background.tertiary,
  '--ck-tertiary-button-border-radius': '14px',
  '--ck-tertiary-button-hover-box-shadow': `0px 0px 0px 3px ${theme.border.primary}`,

  '--ck-tooltip-background': theme.background.tertiary,
  '--ck-dropdown-box-shadow': `0px 0px 0px 1px ${theme.border.primary}`,

  '--ck-tertiary-box-shadow': `0px 0px 0px 1px ${theme.border.primary}`,

  '--ck-modal-box-shadow': `0px 0px 0px 1px ${theme.border.primary}`,
}
