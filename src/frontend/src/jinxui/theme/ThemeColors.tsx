import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { red, orange, yellow, green, cyan, lightBlue, deepPurple, purple } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

/** Oscillate between theme colours in the background of sections. */
const gradient = ({ theme, index }: { theme: Theme, index: number }) => {
    const type = theme.palette.type;
    const [first, last] = index % 2 === 0 ? ['primary', 'secondary'] : ['secondary', 'primary'];
    // Typescript doesn't like indexing by strings - it'll be okay :')
    // @ts-ignore
    const [firstColor, lastColor] = [theme.palette[first][type], theme.palette[last][type]]
    const backgroundColor = `linear-gradient(${firstColor} 0%, ${lastColor} 100%)`;
    // @ts-ignore
    const textColor = theme.palette[first].contrastText;
    return [
        backgroundColor,
        textColor
    ]
}

const hues = [red, orange, yellow, green, cyan, lightBlue, deepPurple, purple];

/** Rainbow step function. The more sections, the more rainbow. */
export const rainbowStep = ({ index }: { index: number }) => {

    const backgroundColor = hues[index % hues.length]['A100'];
    const textColor = '#000';
    return [
        backgroundColor,
        textColor
    ]
}

export const rainbowGradient = ({ index }: { index: number }) => {
    const [firstColor, lastColor] = [hues[index % hues.length]['A100'], hues[(index + 1) % hues.length]['A100']];
    const backgroundColor = `linear-gradient(${firstColor} 0%, ${lastColor} 100%)`;
    const textColor = '#000';

    return [
        backgroundColor,
        textColor
    ]
}

/** The original function. Looks like a self-hosted website from 2004. */
const alternatingColors = ({ theme, index }: { theme: Theme, index: number }) => {
    return pickColorsBasedOnPrimarySecondary(theme, index % 2);
}

const alternatingBackgroundColors = ({ theme, index }: { theme: Theme, index: number }) => {
    return pickColorsBasedOnBackground(theme, index % 2)
}

const secondPaperColor = ({ theme, index }: {theme: Theme, index: number}) => {
    const colorIndex = index === 1 ? 1 : 0;
    return pickColorsBasedOnBackground(theme, colorIndex);
}

const secondPrimaryColor = ({ theme, index }: {theme: Theme, index: number}) => {
    const colorIndex = index === 1 ? 1 : 0;
    return pickColorsBasedOnPrimarySecondary(theme, colorIndex);
}

const pickColorsBasedOnBackground = (theme: Theme, colorIndex: number) => {
    const color = colorIndex === 0 ? 'default' : 'paper';
    const backgroundColor = theme.palette.background[color];
    const textColor = theme.palette.text.primary;
    return [backgroundColor, textColor];
};

const pickColorsBasedOnPrimarySecondary = (theme: Theme, colorIndex: number) => {
    const color = colorIndex === 0 ? 'secondary' : 'primary'
    // @ts-ignore
    const backgroundColor = theme.palette[color].main;
    // @ts-ignore
    const textColor = theme.palette[color].contrastText;
    return [backgroundColor, textColor]
}



// Export your background function here

const BackgroundColor = {
    gradient: gradient,
    rainbowStep: rainbowStep,
    rainbowGradient: rainbowGradient,
    alternatingColors: alternatingColors,
    alternatingBackgroundColors: alternatingBackgroundColors,
    secondPaperColor: secondPaperColor,
    secondPrimaryColor: secondPrimaryColor,
}

/** The default color function to use for the full page background. */
export const defaultColors = gradient;

export default BackgroundColor;