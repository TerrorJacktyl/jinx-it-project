# Git Guide

## Commit Messages

Summarised from [this guide](https://chris.beams.io/posts/git-commit/) by Chris Beams.

### 7 Rules

#### Separate subject from body with a blank line

If you need to add additional details to a commit message, add it to the commit body.
The body can be started by adding a blank line after the first line.

    Header line

    Body starts here. Leave the above line blank.

To make it easier to type the body, use a text editor.
This can be done by using `git commit` instead of `git commit -m`.

[More details][separate]

#### Limit the subject line to 50 characters

Anything beyond the 72nd character will be truncated.

If you need more text to explain the commit, use the body (see previous rule).

[More details][limit-50]

#### Capitalize the subject line

[More details][capitalize]

#### Do not end the subject line with a period

[More details][end]

#### Use the imperative mood in the subject line

Word the commit subject line as if you are ordering someone to do something.

  - Clean your room
  - Close the door
  - Take out the trash

Don't use the indicative mood.

  - Added file
  - Fixed door

A quick way to check is to make sure that the following phrase will make sense grammatically.

> If applied, this commit will __replace with subject line__

[More details][imperative]

#### Wrap the body at 72 characters

Git requires you to format the git message yourself, it does not apply word wrap for you.

[More details][wrap-72]

#### Use the body to explain _what_ and _why_ vs. _how_

Don't describe how a change was made.
It should be explained by the code and comments.

Document what was changed and why.

[More details][why-not-how]

### Examples of a good commit messages

    Summarize changes in around 50 characters or less

    More detailed explanatory text, if necessary. Wrap it to about 72
    characters or so. In some contexts, the first line is treated as the
    subject of the commit and the rest of the text as the body. The
    blank line separating the summary from the body is critical (unless
    you omit the body entirely); various tools like `log`, `shortlog`
    and `rebase` can get confused if you run the two together.

    Explain the problem that this commit is solving. Focus on why you
    are making this change as opposed to how (the code explains that).
    Are there side effects or other unintuitive consequences of this
    change? Here's the place to explain them.

    Further paragraphs come after blank lines.

     - Bullet points are okay, too

     - Typically a hyphen or asterisk is used for the bullet, preceded
       by a single space, with blank lines in between, but conventions
       vary here

    If you use an issue tracker, put references to them at the bottom,
    like this:

    Resolves: #123
    See also: #456, #789

Also see these repos:
  - [git](https://github.com/git/git/commits/master)
    - [t4104: modernize and simplify quoting][289218d]
    - [t: remove test\_oid\_init in tests][e023ff0]
  - [linux](https://github.com/torvalds/linux/commits/master)
    - [block: fix double account of flush request's driver tag][c1e2b84]
    - [sched/debug: Fix the alignment of the show-state debug output][cc172ff]
  - [spring-boot](https://github.com/spring-projects/spring-boot/commits/master)
    - [Add @Interited to @TypeExcludeFilters][3271542]
    - [Fix and improve SpringApplicationBuilder javadoc][89a6f83]




[separate]: https://chris.beams.io/posts/git-commit/#separate
[limit-50]: https://chris.beams.io/posts/git-commit/#limit-50
[capitalize]: https://chris.beams.io/posts/git-commit/#capitalize
[end]: https://chris.beams.io/posts/git-commit/#end
[imperative]: https://chris.beams.io/posts/git-commit/#imperative
[wrap-72]: https://chris.beams.io/posts/git-commit/#wrap-72
[why-not-how]: https://chris.beams.io/posts/git-commit/#why-not-how

[289218d]: https://github.com/git/git/commit/289218de2b5cc17e88d7a04f46fc8302142da8d0
[e023ff0]: https://github.com/git/git/commit/e023ff0691ca207d421a0e75ea23c132ada9142a
[c1e2b84]: https://github.com/torvalds/linux/commit/c1e2b8422bf946c80e832cee22b3399634f87a2c
[cc172ff]: https://github.com/torvalds/linux/commit/cc172ff301d8079e941a6eb31758951a6d764084
[3271542]: https://github.com/spring-projects/spring-boot/commit/3271542d980fc5cb40965612eb183036dc135b0b
[89a6f83]: https://github.com/spring-projects/spring-boot/commit/89a6f83344dc0217cc658cdecfb2357e4c4a370d

## Branches
  * Each new feature should be worked on its own branch from master
  * Branches should be titled `name-current_feature`
  * Ensure that the branch for successfully merged features is deleted quickly
  * Ensure at least one other person reviews a pull request before merging
      * If your review depends on a specific member, you are responsible for `@tagging` them in the merge thread.


## HackMD Test

This is a test edit.