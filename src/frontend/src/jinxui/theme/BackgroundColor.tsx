import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { red, orange, yellow, lime, cyan, lightBlue, deepPurple, purple } from '@material-ui/core/colors';

/** Oscillate between theme colours in the background of sections. */
const alternatingGradient = ({ theme, index }: { theme: Theme, index: number }) => {
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

/** Rainbow step function. The more sections, the more rainbow. */
export const rainbowPastel = ({ theme, index }: { theme: Theme, index: number }) => {

    const hues = [red, orange, yellow, lime, cyan, lightBlue, deepPurple, purple];
    const backgroundColor = hues[index % hues.length]['A100'];
    const textColor = '#000';
    return [
        backgroundColor,
        textColor
    ]
}

// Export your background function here

const BackgroundColor = {
    alternatingGradient: alternatingGradient,
    rainbowPastel: rainbowPastel,
}

export default BackgroundColor;