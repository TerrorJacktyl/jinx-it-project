# Style Guide
Some key points to keep in mind when writing code

# Clean Code
Principles from [Clean Code by Robert C. Martin](https://www.amazon.com.au/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

Medium has [an article](https://medium.com/mindorks/how-to-write-clean-code-lessons-learnt-from-the-clean-code-robert-c-martin-9ffc7aef870c) that goes summerises it reasonably well

Some key points:
## Use meaningful names
  * It's worth spending some time thinking of name that best conveys the meaning of a method or variable
  * Can be long if necessary, IDEs have autocomplete
  * One work per concept
    * e.g. don't have 'fetch' and 'retrieve' doing very eimlar things

## Write small functions
  * Break up if necesssary
  * No more than three arguments

## Avoid comments
  * Ideally there should be no comments at all
  * The meaning and intent should be expressed through meaningful names, function signatures, etc.
  * Comments can lose their application as code gets updated

# Overall Formatting
  * Indent two spaces

# Python
Key points from [Google's style Guide](https://google.github.io/styleguide/pyguide.html) 

## Style Rules
### 80 Character line length
  * Exception for
    * Long import statements
    * URLs, path names, etc.
    * Long string constants
  * Make use of Python's implicit line joining inside brackets, braces, etc.
### Avoid parentheses
  * Use for tuples etc. but not needed in if statements or return statements

### Indentations 
  * Indentation should always be made of spaces and not tabs
  * Align wrapped elements either vertically or with hanging indent.
### Trailing commas
  * Use when the closing brace is not on the same line:
  ``` python
  abc = [
    1,
    2,
  ]
  ```
### White Space
  * No white space inside brackets, braces etc.
  * No white space before open paren
```python
spam(ham[1], {eggs: 2}, [])
```
  * Surround binary operators with a single space on either side
```python
x == 1
```
### Strings
  * If combining a bunch of strings in a loop, append each element to an array and then `join` afterwards.
### Files and Sockets
  * Explicitly close files and sockets when finished with them
### Imports
  * Should all be on separate lines
### Statements
  * Generally one statement per line
  * Okay to combine if the entire thing fits on one line
```python
if foo: bar(foo)
```
### Naming
All names should be snake_case apart from ClassNames, ExceptionNames and GLOBAL_CONSTANT_NAMES
```python
module_name
package_name
ClassName
method_name
ExceptionName
function_name
GLOBAL_CONSTANT_NAME
global_var_name
instance_var_name
function_parameter_name
local_var_name
```
Avoid:
  * Single character naming
  * `(-)` in any package/module name
  * `__double_leading_or_trailing__` these are reserved
  * offensive names

## Language Rules
### Run `pylint`
  * Catches easy to miss errors

### Imports
  * Use import statements for packages and modules only, not for individual classes or functions
### Packages
  * Import each module using the full pathname location of the module
### Avoid global variables
  * Variables should be declared at the module level or as class attributes
### Nested classes and functions okay
  * Nested classes and functions can be used when used on local variable
### True/False: Use implicit false
  * Make use of the fact that 0, None, [], {}, '' all evaluate to false directly
### Use type annotations
  ```python 
  def func(a: int) -> List[int]
  ```
  * Makes code more readable

# Typescript / Javascript
To be completed

# JSON

## Style guide

### Naming

`snake_case`
