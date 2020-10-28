# Sprint 1

## Planning

### User Stories
Developed based on interview with client

### Personas
|User|Description|
|----|----------|
|Max |Wants to build an ePortfolio to aid with job-seeking and to keep a personal record of their achievements.
|Sascha|A recruiter who wants to assess Max as a candidate for their company using Max’s ePortfolio.

### Stories
Max:
* I want to display the work I’m proud of so others can easily recognise my achievements.
* I want creating and editing my portfolio to be as easy as possible, especially if I’m new to the service.
* I want the layout to be flexible so that I can showcase my achievements how I like.
* As a first-time user, I want to be guided through the process of building a simple portfolio.
* I want to easily be able to upload and display my portfolio in a well layed out format.
* I want to easily be able to upload my resume and present it in a nice layout on my site.

Sashcha:
* I want to easily be able to access any other information I want when landing on a new person’s page.
* I want the navigation to be clear and fast so I don't waste asny time.

### Product Backlog
* As a website user, I want to be able to create a secure account.
* As a website member, I want to be able to access my personal portfolio site easily.
* As a website member, I want to be guided through the steps of setting up a web page.
* As user I want the default template to look good and be well layed out.

### Sprint Backlog
* Create rudementary API for a very simple website that makes use of React and Django --*assigned to Jack and Giles*.
* Deploy a simple Django website to the digital ocean server. Ensure it is using Docker --*assigned to John*.
* Create a website that makes use of Django and React that allows new users to be created --*assigned to Nima and Kevin*.
* Create a mockup of the four basic pages (home, new user, portfolio information, personal portfolio) using Figma --*assigned to John*.
* Investigate the use of Swagger for documentation --*assigned to Kevin*.

## Sprint Review
What was completed from the backlog:
* Sign up and login page (no user authentication)
* Rudimentary backend
* Basic Portfolio Creation Page
* Streamline development and deployment
  * Dockerised both front end and back end
  * NGINX and server have both been set up
* Figma mockup/wireframe of basic pages

What wasn't completed from the backlog:
* Portfolio display page 

Review of key merics:
* Backlog items weren't atomic enough, we need to split these tasks up more

## Sprint Retrospective
What went well?
* Team communication 
  * Maintain a minimum of two meetings per week.
  * Directly contact team members that we are blocked on.
  * Create accessible documentation for inexperienced team members (i.e. make it easy for front-end members to test and run backend features).
  * Hang out in the Discord voice channels when we’re working.|
* Documentation 
  * Maintain sufficient (but not excessive) detail for mutual understanding in documentation. 
  * Update documentation at all levels of abstraction (i.e. update both technical instructions and subtle points of user stories)|
* Development  
  * Continue to prioritise development best practices (testing, automating technical bottlenecks when they appear rather than ignoring them, testing) alongside active use cases.
  * Develop features to completion, and don’t spread out development among many features.

What could be improved upon?
* Allocating and designing tasks 
  * During sprint 1, our to-dos arose iteratively from our team meetings, as we didn’t have a very detailed list of tasks from the beginning (this was largely due to the technical inexperience of the team). Having each built a solid technical base, we are capable of and should properly envision our tasks at the beginning of each future sprint.
  * We also didn’t make use of story points and detailed acceptance criteria for our tasks, which made it difficult to discern whether we were ‘done’ with them. We should include this structure in future tasks.
  * **To do**: Adhere to the scrum practices when creating sprint backlog cards 
* Ambiguity in terminology for product features 
  * We often had to clarify design terms like ‘page’, ‘section’, ‘profile’ vs ‘portfolio’, ‘landing page vs home page’ in our team and client meetings.
  * **To do**: Create a glossary, and consult it when we encounter confusion with terminology.
* Getting sidetracked by technical frameworks 
  * Due to our technical inexperience, the first sprint involved many digressions from our work on use cases into setting up extra language, framework and infrastructural features. We experienced the **w i d e n i n g** in the ‘double diamond’ diagram as we sought to prioritise implementing worthwhile tools that will aid us in our future development.
  * Having established these basic tools, we should keep our priorities in check and ‘narrow the diamond’; we should focus on the use cases we set ourselves at the beginning of future sprints, rather than setting up the next latest-and-greatest tool in our workflow.
  * **To do**: regularly consult sprint goals when we begin to forget them.

* Enforcing style 
  * One of the technical points we got sidetracked by in sprint 1 was style guides. Although we’ve learned a lot from our discussions on indentation, variable naming etc., we should stick to using auto-formatters in development to avoid worrying about these idiosyncrasies, while still efficiently ensuring our style is consistent.
  * **To do**: Ensure relevant formatters are installed before writing code.

