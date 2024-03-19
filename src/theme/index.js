import React, { useMemo } from 'react'
import styled, {
    ThemeProvider as StyledComponentsThemeProvider,
    createGlobalStyle,
    css,
} from 'styled-components'
import { Text } from 'rebass'

const MEDIA_WIDTHS = {
    upToExtraSmall: 540,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280,
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
    (accumulator, size) => {
        accumulator[size] = (a, b, c) => css`
            @media (max-width: ${MEDIA_WIDTHS[size]}px) {
                ${css(a, b, c)}
            }
        `
        return accumulator
    },
    {}
)

const white = '#FFFFFF'
const black = '#000000'

export function colors() {
    return {
        white,
        black,

        primary1: '#6239C6',

        textPrimary: '#1A203F',
        textSecondary: '#8E8EA9',
        textBlue: '#335BE9',
        text1: '#8192AA',
        text2: '#161522',

        bg1: '#F3F4F7',
        bg2: '#1C202C',
        bg3: '#C3CBCD',
        bg4: '#F7F6FA',

        border1: '#EAEAEF',
        border2: '#c0c0cf',
        border3: '#e6e8ec',
        border4: '#DDDCE9',

        error: '#EB5757',
        warning: '#FD3232',
        success: '#00D496',
        failed: '#FD3232',

        modalBG: 'rgba(26, 32, 63, 0.14)',
    }
}

export function theme() {
    return {
        ...colors(),

        grids: {
            sm: 8,
            md: 12,
            lg: 24,
        },

        // media queries
        mediaWidth: mediaWidthTemplates,

        // css snippets
        flexColumnNoWrap: css`
            display: flex;
            flex-flow: column nowrap;
        `,
        flexRowNoWrap: css`
            display: flex;
            flex-flow: row nowrap;
        `,
    }
}

export default function ThemeProvider({ children }) {
    const themeObject = useMemo(() => theme(), [])

    return (
        <StyledComponentsThemeProvider theme={themeObject}>
            {children}
        </StyledComponentsThemeProvider>
    )
}

const TextWrapper = styled(Text)`
    color: ${({ color, theme }) => theme[color]};
`

export const TEXT = {
    white(props) {
        return <TextWrapper color="white" {...props} />
    },
    primary(props) {
        return <TextWrapper color="textPrimary" {...props} />
    },
    secondary(props) {
        return <TextWrapper color="textSecondary" {...props} />
    },
    error(props) {
        return <TextWrapper color="error" {...props} />
    },
    blue(props) {
        return <TextWrapper color="textBlue" {...props} />
    },
    default(props) {
        return <TextWrapper {...props} />
    },
}

export const FixedGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@100;200;300;400;500;600;700;800;900&display=swap');
html, input, textarea, button {
  font-family: 'Lexend Tera', sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

button {  
  user-select: none;
}

html {
  font-size: 14px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`

export const ThemedGlobalStyle = createGlobalStyle`
body {
  min-height: 100vh;
}
`
