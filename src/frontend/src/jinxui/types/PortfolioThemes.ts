/** Material Ui theme object extension */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    portfolio: {
      headerBackground: {
        src: string
        overlayColor?: string
        maxHeight?: number
      },
      header?: {
        verticalAlign?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | undefined
        horizontalAlign?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined
        textAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify' 
        marginBottom?: any
      }
      theme: {
        name: string
      },
      section?: {
        colors?: any
        // Specify custom css in this sort of object
        css?: any
        titleGap?: any
        sectionGap?: any
        spacing?: 0 | 1 | 10 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined
        border?: "first" | "odds" | "evens" | "all" | undefined
        borderPadding?: any
      }
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    portfolio: {
      headerBackground?: {
        src?: string
        overlayColor?: string
        maxHeight?: number
      },
      header?: {
        verticalAlign?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | undefined
        horizontalAlign?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined
        textAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
        marginBottom?: any
      }
      theme?: {
        name?: string
      },
      section?: {
        colors?: any
        css?: any
        titleGap?: any
        sectionGap?: any
        spacing?: 0 | 1 | 10 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined
        border?: "first" | "odds" | "evens" | "all" | undefined
        borderPadding?: any
      }
    },
  }
}
