const rgb = (cssVar: Readonly<string>) => `rgb(var(--${cssVar}))` as const

export const ckTheme = {
  '--ck-font-family': 'InterVariable',

  '--ck-body-color': rgb('text-high'),
  '--ck-body-background': rgb(`background-color-secondary`),
  '--ck-body-background-secondary': rgb(`background-color-tertiary`),
  '--ck-body-background-tertiary': rgb(`background-color-tertiary`),
  '--ck-body-action-color': rgb(`text-low`),
  '--ck-copytoclipboard-stroke': rgb(`text-low`),

  '--ck-primary-button-background': rgb('background-color-tertiary'),
  '--ck-primary-button-hover-background': rgb('background-color-tertiary'),
  '--ck-primary-button-border-radius': '14px',
  '--ck-primary-button-hover-box-shadow': `0px 0px 0px 3px ${rgb('border-color-primary')}`,

  '--ck-secondary-button-background': rgb('background-color-tertiary'),
  '--ck-secondary-button-hover-background': rgb('background-color-tertiary'),
  '--ck-secondary-button-border-radius': '14px',
  '--ck-secondary-button-hover-box-shadow': `0px 0px 0px 3px ${rgb('border-color-primary')}`,

  '--ck-tertiary-button-background': rgb('background-color-secondary'),
  '--ck-tertiary-button-hover-background': rgb('background-color-tertiary'),
  '--ck-tertiary-button-border-radius': '14px',
  '--ck-tertiary-button-hover-box-shadow': `0px 0px 0px 3px ${rgb('border-color-primary')}`,

  '--ck-tooltip-background': rgb('background-color-tertiary'),
  '--ck-dropdown-box-shadow': `0px 0px 0px 1px ${rgb('border-color-primary')}`,

  '--ck-tertiary-box-shadow': `0px 0px 0px 1px ${rgb('border-color-primary')}`,

  '--ck-modal-box-shadow': `0px 0px 0px 1px ${rgb('border-color-primary')}`,
}
