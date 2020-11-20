# Sprint 3

## Planning
*Please consult the Product Backlog for features complete with user stories AND acceptance criteria. All numbers on the below features correspond to their respective items in the Product Backlog.*

#### Sprint Backlog
High Priority
* Users can add and remove new sections
  * 3.2 Add new section (front end)
  * 3.3 Remove section (front end)
  * By extension of the above, change order of sections
* Increase navigation between different part of the site
  * 3.5 Increase connectivity of the website
* Update portfolio page styling
  * 1.4 Portfolio page
* Testing
  * Iron out all obvious bugs before deployment
  * Extensive usability testing

Medium Priority
* Add different portfolio themes that a user may choose from
  * 9.1 Customise the style and colour of my portoflio
  * 9.2 Upload a custom background image for my portfolio

Low Priority
* User contact form on portfolio page
  * 7.1 Contact other users 
* Public/Private portfolio URLs
  * 1.5 Public portfolios
  * 6.1 Anonymous user access
  * 10.3 Private portfolios 
* More section types
  * 3.6 List/dot point section
  * 3.7 Timeline section
* User tutorial
  * 4.1 Guide a user through portfolio creation
* Add and remove pages
  * 3.1 Add new pages
  * 3.3 Remove pages
* Update styling throughout the site


## Review

#### What was completed from the backlog?
* As a professional, I want to display the work I'm proud of
  * 1.4 Portfolio page (updated styling to use MaterialUI)
  * 1.5 Public portfolios
* As a professional, I want to customize my portfolio's layout
  * 3.2 Add new section
  * 3.3 Remove section
  * 3.5 Increase connectivity of the website (Can now get to edit page from portfolio display page)
  * 3.6 List/dot point section (Added through markdown functionality for text sections)
  * Change order of sections
* As a first time user, I want to be guided through the process of building a simple portfolio
  * 4.1 Guide a user through portfolio creation (default portfolio with instructions for new users)
* As a professional, I want to customize the style and colour of my portfolio 
  * 9.1 Customise the style and colour of my portoflio (various premade themes to choose from)
* As a recruiter, I want to easily access a candidate's resume or work
  * 6.1 Anonymous user access 
* As a professional, I want to know my data is secure
  * 10.3 Private portfolios 
* Miscellaneous
  * Landing page styling changed to use MaterialUI
  * Login and signup pages styling changed to use MaterialUI
  * Edit page styling changed to use MaterialUI

#### What wasn't completed from the backlog?
* 3.1 Add new pages
* 3.3 Remove pages
* 3.7 Timeline section
* 7.1 Contact other users 
* 9.2 Upload a custom background image for my portfolio


#### Review of Key Metrics
Successful usability testing in the sense that a diverse range of users were tested, with some bugs found and constructive feedback given. Site was found to be easy to use for almost all users, with most confusion caused by lack of intuitive features (e.g. a new portfolio button instead of editing the default portfolio). Most users responded that they would be more inclinced to use the site for artistic purposes rather than
displaying resumes or professional work.

Some recommended additions to the site were:
* More guidance for first time users, and tooltips for various buttons on the edit page
* Upload of background image (already in our backlog) and customisation of primary and secondary colours
* Sample projects on the landing page that new users can look through
* Loading animations for uploading images

## Retrospective

#### What went well, and how can we keep it up?
* Highly Productive, got a lot done
  * Have lots of time (having the break really helped)
  * Eveeryone keep taking initiative to pick up new features when they’ve finished their old ones.
* Team Communication
  * Maintain a minimum of two meetings per week.
  * Directly contact team members that we are blocked on.
  * Create accessible documentation for inexperienced team members (i.e. make it easy for front-end members to test and run backend features).
  * Hang out in the Discord voice channels when we’re working
* Properly implementing use cases and product backlog in Trello
  * Keep properly laying out each Product Backlog item, complete with use case and acceptance criteria, along with a clear definition of ‘done’ 
  * Staying within a feature’s scope, and not trying to extend it once it's 'done'
  * Update Trello consistently with any progress made on items
* Code Review
  * Pull requests were approved much faster (almost all within 2 days) during this sprint. Keep this up and review early.
  * Keep doing in-depth reviews of each other’s code, and put effort into understanding how other developers’ designs worked.
  * If there are any issues/bugs found, put them in the repository's issue tracker
* Usability Testing
  * Conduct usability testing when any major features are added in the future


#### What could be improved upon, and what do we need to do to improve?
* Still issues with merge conflicts
  * Should aim to merge only from master and not other people’s branches
  * Submit pull requests often!
* Make a bigger effort to implement all of client's requests
  * Clarify features requested by the client *and* their priority at the end of every sprint
  * Even if there is bare minimum functionality, and priorities must be chosen, implement the feature anyway if the client wants it.
* Devops Practices
  * Now that our project is getting bigger, implement better devops infrastructure. E.g. Continuous intergration pipelines upon a PR opening, and continuous deployment upon approval. 
  * Implement a staging server to test the deployment environment (and not test in prod).
  * Have more code showcases by team members to get the rest of the team up to speed with the codebase, and demos of updated UI.

