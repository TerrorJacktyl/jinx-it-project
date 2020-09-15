# API Documentation
## How To Use
### Portfolio Endpoints
The endpoints are documented using swagger.
See the main [README][readme] file for how to access these docs.
Here's a quick summary: `​/api​/portfolios​/{portfolio_id}​/pages​/{page_id}​/sections​/{section_id}`. Any suffix can be removed.

Warning! The swagger docs may not reflect the actual API. I have documented known disrepancies in the swagger docs description.

[readme]: [README.md]

### Authentication
The [djoser docs][djoser] has a great example for how the token authentication operates.
Here's a summary:

 1. Send a request to `/auth/token/login` with your username and password. A token will be returned.
 2. On subsequent requests that need authentication, add the token in the request header. ie, `Authorization: Token b704c9fc3655635646356ac2950269f352ea1139`

[djoser]: [https://djoser.readthedocs.io/en/latest/sample_usage.html]

### How to create a new user

  1. `POST` `email`, `username`, `password` to `​/auth​/users​` to register a new user.
  2. `POST` `password` and `username` to `/auth​/token​/login​` to obtain an auth token. Use this in all future requests.
  3. `PUT` `first_name` and `last_name` to `/api/accounts/me`

### How to create a new portfolio

  1. `POST` `name` of new portfolio to `​/api​/portfolios` to create a new portfolio. The new portfolio's id would be returned along with the posted data. Remember the id.
  2. `POST` `name` of page and page position (`number`) to `/api​/portfolios​/{portfolio_id}​/pages` to create a new page. Remeber the id.
  3. `POST` section `name`, position (`number`), and additional data to `/api​/portfolios​/{portfolio_id}​/pages​/{page_id}​/sections` to create a new section. Repeat this step to add multiple sections.

To create a text section, set `type` to text and `content` to the textual content of that section.
In the future, `type` would be set to different values to support other sections such as an image so it should not be assumed that the `content` field will always exist.
For now, it only exists when `type` is `text`.

### How to obtain portfolio data from the API

  1. `GET ​/api​/portfolios` to get a list of portfolios.
  2. `GET ​/api​/portfolios​/{portfolio_id}/pages` to get a list of pages.
  3. `GET /api​/portfolios​/{portfolio_id}​/pages​/{page_id}​/sections` to get a list of sections.
