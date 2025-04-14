import { Config } from 'tailwindcss';

export default <Config>{
  content: [], // When empty, syncify will populate this automatically
  theme: {
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
        body: 'var(--font-body-family)'
      },
      fontSize: {
        logo: '22px'
      },
      letterSpacing: {
        logo: '5px'
      },
      width: {
        vw: '100vw'
      },
      height: {
        vh: '50vh'
      },
      colors: {
        accent: 'hsla(var(--color-accent) / <alpha-value>)',
        surface: 'hsla(var(--color-surface) / <alpha-value>)',
        primary: 'hsla(var(--color-primary) / <alpha-value>)',
        contrast: 'hsla(var(--color-contrast) / <alpha-value>)',
        secondary: 'hsla(var(--color-secondary) / <alpha-value>)'
      },
      transitionTimingFunction: {
        wiggle: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  }
};
