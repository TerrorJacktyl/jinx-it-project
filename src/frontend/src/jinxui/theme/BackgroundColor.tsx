import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Background color functions
export const alternatingGradientBackground = ({ theme, index }: { theme: Theme, index: number }) => {
    const type = theme.palette.type;
    const [first, last] = index % 2 === 0 ? ['primary', 'secondary'] : ['secondary', 'primary'];
    // Typescript doesn't like indexing by strings - it'll be okay :')
    // @ts-ignore
    const [firstColor, lastColor] = [theme.palette[first][type], theme.palette[last][type]]
    const backgroundColor = `linear-gradient(${firstColor} 0%, ${lastColor} 100%)`;
    // @ts-ignore
    const textColor = theme.palette[first].contrast;
    return [
        backgroundColor,
        textColor
    ]
}