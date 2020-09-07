### MOVEMENT

h / j / k / l -> Left / Down / Up / Right

w / b -> Forward one word / Back one word 

0 / ^ / $  -> Start of line / First non-whitespace char / End of line

gg / G -> Start of file / End of file

{ / } -> Up a paragraph / Down a paragraph

gt / gT -> Prev tab / Next tab


### INSERT MODE SHORTCUTS

o / O -> Insert mode on a new line below / Insert mode on a new line above

a -> Insert mode after moving right 1 character. 

I / A -> Insert mode at the first character of a line / Insert mode after the last character of the line

ci<delimiter> -> Clears out the contents within <delimiter>, and puts you in insert mode inside

ca<delimter> -> Clears out the contents with <delimiter>, the <delimiter>s themselves, and puts you in insert mode


### UNDO, DELETE, YANK & PASTE

u -> Undo changes

dd / yy -> Delete line / Yank line

p / P -> Paste a line below / Paste a line above

U -> Undo all changes on one line

CTRL-R -> Redo changes which were undone

di<delimiter> -> Deletes the contents within <delimiter>

da<delimiter> -> Deletes the contents with <delimiter>, and the <delimiter>s themselves


### SEARCHING

/<pattern> -> Search for <pattern> 

n / N -> With a pattern entered, go to next match / With a pattern entered, go to previous match

\* / # -> Jumps to next occurence of the word currently under cursor / Jumps to previous occurence of the word currently under cursor

z. -> Centre screen on the cursor


### VISUAL MODE

v -> Enter visual mode

V -> Enter visual mode linewise

*Use the below commands once already in visual mode*
d / y -> Delete highlighted content / Yank highlighted content

\> / < -> Shift left / Shift right


### REPLACE

*For search and replace commands, remember to escape special characters with \*
:<Start_Line>,<End-Line>s/^/<Symbol> -> Inserts <Symbol> at the start of all lines from <Start> to <End>

:%s/<Old\_Word>/<New\_Word>/g -> Replaces all instances of <Old\_Word> with <New\_Word>


### COMMAND MODE

Quit
  :q -> Quit
  :q! -> Quit without writing
  :wq -> Write and exit
  :wq! <file> -> Write to <file>, and exit always

Edit
  :e -> Refresh
  :e! -> Refresh and discard all changes
  :e {file} -> Switch to edit <file>, can use :tabnew <file> to open in a new tab

Insert
  :r <file> -> Insert <file> below the cursor

File Exploration
  :Vex -> Opens up a vertical window displaying file tree
  :tabnew <file\_path> -> Opens file in a new tab

### MISC

ESC / CTRL-c -> Both will exit whatever mode you're in. Personal preference

CTRL-L -> Reset Screen, fixes lame red background bug if you do end up getting it

