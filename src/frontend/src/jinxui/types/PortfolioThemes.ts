/** Material Ui theme object extension */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    portfolio: {
      headerBackground: {
        src: string
      },
      theme: {
        name: string
      },
      section: {
        colors: any
        // Specify custom css in this sort of object
        css: any
      }
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    portfolio: {
      headerBackground?: {
        src?: string
      },
      theme?: {
        name?: string
      },
      section?: {
        colors?: any
        css?: any
      }
    },
  }
}
