# Sprint 2

## Planning
*Please consult the Product Backlog for features complete with user stories AND acceptance criteria. Planning was done before the making the restructuring of our Product Backlog, so user stories are included here.*

#### User Stories
* As a professional, I want to view my portfolio so that I can admire or edit its presentation. 
* As a professional, I want to add images to my portfolio so that I can display a photo of myself or my work.
* As a professional, I want the edit page to look acceptable on a variety of screen sizes so that I can edit my portfolio from my phone or computer.
* As a professional, I want to be the only person allowed to edit my content so the other can't misrepresent me through my portfolio.
* A a professional, I want to be able to log in so that I can make a portfolio that belongs to me.

#### Sprint Backlog
* User authentication and permissions
  * Front end
    * Figure out how token implementation works
    * Store a user's token throughout their session
    * Implement permissions by incorporating token verification into all API requests for sensitive information
  * Back end
    * Implement user verification on backend
    * Distribute token to front end on successful login request
    * Modify certain API endpoints to require a token upon request
    * Ensure that a logged in user cannot edit the portfolio of a different user
* Display user portfolio content
  * Front end
    * Implement POST request when publish button on the edit page is clicked
    * Styling for display page in accordance with the Figma mockup (ambitious)
    * Show a user's saved content on display page by making a GET request
* Upload Images
  * Front end
    * Create an upload image section on the edit page
    * Make the relevant POST request containing the image to the backend
* Adaptive edit page
  * Front end
    * Update styling so that edit page looks good on both phone and computer
* Customize portfolio layout (stretch goal)
  * Front end
    * Add buttons to move, add, and delete sections
  * Back end
    * Expose API endpoints for the updating of a portfolio's sections


## Review
*Item numbers correspond to the items in our full Product Backlog*

#### What was completed from the backlog
* Display user portfolio content (item 1.3)
* Upload images (item 2.2)
* Adaptive edit page (item 3.4)
* User authentication and permissions (items 10.1, 10.2, 10.3)

#### What wasn't completed from the backlog
* Customize portfolio layout (items 3.1, 3.2, 3.3)

#### Review of key metrics
* Midway through this sprint we compiled our backlog into a proper format, with items based on our user epics, complete with acceptance criteria, priority, and story points. This has helped our workflow and delegation of tasks immensely.


## Retrospective

#### What went well, and how can we keep it up?
* Team Communication
  * Maintain a minimum of two meetings per week.
  * Directly contact team members that we are blocked on.
  * Create accessible documentation for inexperienced team members (i.e. make it easy for front-end members to test and run backend features).
  * Hang out in the Discord voice channels when we’re working.
* Adaptability to priority
  * Continuously monitor the priority of certain tasks and look back to see how it covers the sprint goals.
  * Continue to check how new code affects others and how incomplete tasks block other team members.
* Delegation of tasks
  * When a task comes into priority, continue to have a conversation with whoever is responsible for that stack / section of code. If nobody is responsible for similar tasks, converse with all members to see which have an availability to work on it.
* Ambiguity in terms of of product features
  * Continue to clarify design terms like ‘page’, ‘section’, ‘profile’ vs ‘portfolio’, ‘landing page vs home page’ in our team and client meetings.
  * Continue to add to the glossary, and consult it when we encounter confusion with terminology.

#### What could be improved upon, and what do we need to do to improve?
* Merging from each other’s branches and waiting eons to update master
  * Make smaller branches with less responsibility with a higher number of pull requests to master to reduce the possibility of merge conflicts and non-reviewed code.
  * Having two people required to review pull requests resulted in delays to merging at master, and consequently many people just merged these dangling ‘waiting for merge review’ branches into their own instead of getting these changes from master.
  * We could reduce this ‘fear of merging to master’ by creating a separate dev branch from master, which we would merge our latest changes to before merging into master.
  * **To do**: Be much more diligent with code review, and merge features to master as soon as they are completed instead of extending those features on the same branch
* Realise how realistic sprint goals are a bit earlier
  * Discuss how realistic some sprint goals are during development with the group as soon *as it seems that a certain section may take longer to complete.* 
  * Be wary of how little time is left for the sprint to be complete before allowing less realistic task completion to remain in sprint tasks.
  * **To do**: Be transparent with our progress, and keep our scope in check.
* Keep Trello free from technical issues and focused on use cases/high-level features
  * Despite trying to only have use-case present in our Trello board, a few technical items crept in there.
  * **To do**: Use Github Issues to flag technical issues and improvements so that our Trello is more understandable to product owners and clients.


