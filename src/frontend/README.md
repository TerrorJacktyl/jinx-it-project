# Jinx front end readme

## Technology

### Core and libraries

The front end is built with TypeScript React and primarily makes use of the following libraries:
1. [Axios](https://github.com/axios/axios) for making requests to the backend via our RESTful API.
1. [Material UI](https://material-ui.com/) for creating UI components with consistent style and accessible design.
1. [Styled Components](https://styled-components.com/) for one-off styling of components.
1. [React-Markdown](https://github.com/remarkjs/react-markdown) for processing [Github-flavoured Markdown (GFM)](https://github.github.com/gfm/) text-formatting inside section text boxes.

## Design guidelines

### API interaction

Should be segregated from UI components. If you want to make any sort of interaction with the API or backend (i.e. if you're about to write `axios`), see the User hook (`src/jinxui/hooks/useUser`).

In short, the User hook contains useful methods like `login`, `getPortfolio` which abstract away API requests. These methods still return JavaScript promises, which means your UI component can still render conditionally based on whether the underlying requests:
- succeeded
- failed
- is still loading/incomplete

To access these methods, in your component's top-level, declare the methods you want from the User hook in a destructured fashion. You can also access data about the logged-in user (i.e. name, avatar) through the `userData` object. Here's an example:

```jsx
import useUser from 'jinxui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/** Display a menu with a user greeting and a logout button. */
function AvatarDropdown(props: any) {
    // Destructured extraction of 
    const { userData, logout } = useUser();

    return (
        <div>
            <Typography variant="h2">Hello, {userData.name}</Typography>
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    )

}
```

See all available User hook methods by looking at the return of the `useUser` component in `src/jinxui/hooks/useUser`.

For a more thorough demo of the User hook, and rationale behind why we use it, see `docs/userHook`.


### Styling

We use a hybrid of Styled Components and Material UI.

If you're working on the portfolio display or edit pages, please use Material UI theming to style any components that should update with the user's selected portfolio theme.

Otherwise, you're welcome to use whichever library you're most comfortable with.