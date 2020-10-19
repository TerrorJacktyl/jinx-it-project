# Ji.nx React Coding Conventions


## Styled Components

[https://styled-components.com/](https://styled-components.com/)

#### Why to use this?
Having to add classes to tags or components and creating separate ```.css``` files can get very confusing and complicated. Using styled components can make CSS styling very concise, clean and readable as well as promoting re-usability and malleability.

E.g. we can create a reusable component, then create another reusable component with slightly different properties but inheriting all the properties without the need to rewrite them all.

#### Install using:
```npm install --save styled-components```

#### Import to the JS / TS file you need:
```import  styled  from  "styled-components";```

#### Usage:

If we are making a styled tag which is a default HTML tag (e.g. `<h1>` or `<p>`) :
```
const Title = styled.h1`
	color: #000000;
	padding: 10px;
	margin-left: 5px;
`
```
If it is a non-standard html tag (e.g. another component like `StyledTitle`):
```
const StyledTitle = styled(Title)`
	color: #ffffff;
`
```
This essentially inherits all the properties from ```StyledTitle``` but changes the colour.

## Reusable Components Library
If we create a component which can be reused in other files we can add it to a reusable components library.
In ```src/jinxui/components``` create a new file with the name of the component in the respective folder e.g. ```SubmitButton.js``` in ```/button```. 
Add the component to the file and make sure you export at the end e.g. ```export default SubmitButton```.
In ```src/jinxui/index.ts``` add the component to this list in the same way the other components are added e.g. ```export { default as SubmitButton } from "./components/button/SubmitButton"```

## React Hook Conventions for State Variables

#### useState
##### Import using:
```import  React,  {  useState }  from  "react"```

##### Usage:
Here the variable we have created within a react component is ```clickCount```.
To change ```clickCount``` we use the setter: ```setClickCount```.
```useState(0)``` initialises ```clickCount``` to 0:
 
```const  [clickCount,  setClickCount]  =  useState(0);```

## Props

Props can be used when passing data from component to component.
Lets use the example for a state variable ```clickCount``` we had in the notes above:

In a ```header.js``` file (if using TS change as needed):
```
import checkbox from "../components/checkbox";
import  React,  {  useState }  from  "react"

const Header = () => {
	const  [clickCount,  setClickCount]  =  useState(0);
	return (
		<checkbox counter={clickCount}/>
	)
}
```
In a ```checkbox.js``` file:
```
const checkbox = ({ counter }) => {
	<p>{counter}</p>
}
```


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI0MjMyNjg5MSwxNzY4NjY4MDEwLDIwMD
YwMzYzOTUsLTE4NTkzMDc2MzAsMTA5NzkyMDgzOSwtMzYzNjMw
MjY1LDE4MjgzMTU0NDAsLTE5MjE4NTU1NjYsMTYwMDczNjk0Ny
wtMTI2MjgwMTgwNSwyMTE1NDA0OTEwLC0xMjQyNzc0NDEwLDEy
NDI5MTQzMjFdfQ==
-->