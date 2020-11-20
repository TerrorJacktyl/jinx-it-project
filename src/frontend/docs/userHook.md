# User hook rationale and demo

Written by Jack (feel free to DM with any questions).

## What does all this stuff do?

In essence, I've created [a React Hook](https://reactjs.org/docs/hooks-intro.html) to abstract API requests for authenticated users. This hook works by conveniently sharing data about the logged in user (if there is one) to many components such as their `username` and `theme`, and handling HTTP requests for you. This solves two problems:
1. Repeating ourselves when it comes to writing `axios.post(SAME_URL_AS_ALWAYS, config={headers: {'Authorization': 'Token ASDKLAJSKLDJ'}})` requests.
2. Having to stowaway the logged-in user's data in the props of every goddamn component above the components that *actually need the user data*.

The important React features here are:
1. Contexts, which make the user data accessible to components without having to send the data to them as props.
2. Hooks, which are used to:
    - implement state for functional components (since we don't have `this` for functions, and we said we'd prefer to not use class components [(bc too much boilerplate and `this` binding sucks)](https://medium.com/@Zwenza/functional-vs-class-components-in-react-231e3fbd7108))
    - abstract API calls into nice functions like `login`, `logout` and `setUserDetails`

### User data

The user data we can store is defined as an interface in `src/jinxui/contexts/IUserContext` (note the `I`). The default data is given in `src/jinxui/contexts/UserContext`:

```typescript
export const defaultUserContext: IUserContext = {
    username: '',
    token: '',
    authenticated: false,
    theme: 'light',
}
```

Some components might tap into this data for:
- Changing their style depending on the `theme`
- Displaying the `username` on the account settings page
- Redirecting a user from `/login` to their portfolio if they are already `authenticated`.

This data is accessible from the `useUser` hook, which is demoed below.

### Hook functions

The User hook (written in `src/jinxui/hooks/useUser`):
1. stores this shared user data, and
2. has some functions useful for modifying this data (so you don't have to modify the `UserContext` state yourself).

An example usage of this is in `src/Login`.

```typescript
// The beginning of the Login component
const Login = () => {
  ...
  // Get the login function from useUser to use later
  const { login, logout } = useUser();

// Later, in the submit behaviour for the login button
onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              // use the hook function
              login(values.email, values.password)
                .then(data => {
                  console.log(data);
                  setRedirect(true);
                })
                .catch(response => console.error(response));
            }}
```

I think this is neat, because `login`
1. takes care of the API request for you, but it still returns a *promise* (i.e. you can still update the UI based on whether the login succeeded or failed, seen in the `.then( stuffDoneOnSuccess )` and `.catch (stuffDoneOnFailure)` ).
2. updates the user data so that all future API requests (through the `User` hook) will be authenticated.

For instance, to update the user's account details (which requires authentication), you can now just write:

```typescript
import { useUser } from 'jinxui';

const { setAccountDetails } = useUser();

<Form>
  // declare a first and last name field (which the user can change to update their details)
  <Button onclick={(form) => {
    setAccountDetails({first_name: form.first_name, last_name: form.last_name})}
      .then(success => console.log("Details successfully updated"))
      .catch(error => console.log("Error, could not update details"))
  }>
  ...
</Form>
```

### But there's one more thing!

To make sure the components can access the context, we need to wrap the *highest level component that needs the user data* in a special component: `UserContextProvider`.

I've wrapped the whole application in this component (see `src/App.tsx`), so you don't need to worry about doing this.

If you want to know the details, check out [React contexts](https://reactjs.org/docs/context.html) or feel free to `@Jack`.