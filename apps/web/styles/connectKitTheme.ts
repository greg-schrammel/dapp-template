import { Types } from 'connectkit'
import { theme } from 'ui'

export const ckTheme: Types.CustomTheme = {
  '--ck-font-family': 'InterVariable',

  '--ck-body-color': theme.colors.text.high,
  '--ck-body-background': theme.colors.background.secondary,
  '--ck-body-background-secondary': theme.colors.background.tertiary,
  '--ck-body-background-tertiary': theme.colors.background.tertiary,
  '--ck-body-action-color': theme.colors.text.low,
  '--ck-copytoclipboard-stroke': theme.colors.text.low,

  '--ck-primary-button-background': theme.colors.background.tertiary,
  '--ck-primary-button-hover-background': theme.colors.background.tertiary,
  '--ck-primary-button-border-radius': '14px',
  '--ck-primary-button-hover-box-shadow': `0px 0px 0px 3px ${theme.colors.border.primary}`,

  '--ck-secondary-button-background': theme.colors.background.tertiary,
  '--ck-secondary-button-hover-background': theme.colors.background.tertiary,
  '--ck-secondary-button-border-radius': '14px',
  '--ck-secondary-button-hover-box-shadow': `0px 0px 0px 3px ${theme.colors.border.primary}`,

  '--ck-tertiary-button-background': theme.colors.background.secondary,
  '--ck-tertiary-button-hover-background': theme.colors.background.tertiary,
  '--ck-tertiary-button-border-radius': '14px',
  '--ck-tertiary-button-hover-box-shadow': `0px 0px 0px 3px ${theme.colors.border.primary}`,

  '--ck-tooltip-background': theme.colors.background.tertiary,
  '--ck-dropdown-box-shadow': `0px 0px 0px 1px ${theme.colors.border.primary}`,

  '--ck-tertiary-box-shadow': `0px 0px 0px 1px ${theme.colors.border.primary}`,

  '--ck-modal-box-shadow': `0px 0px 0px 1px ${theme.colors.border.primary}`,
}
