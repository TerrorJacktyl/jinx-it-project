# Backend

Our backend is built on [Django](https://www.djangoproject.com/), making use of the [Django Rest Framework (DRF)](https://www.django-rest-framework.org/), and interfaces with a [PostgreSQL database](https://www.postgresql.org/).

# API documentation
## How To Use
### Portfolio Endpoints
The endpoints are documented using swagger.
See the main [README][readme] file for how to access these docs.
Here's a quick summary: `​/api​/portfolios​/{portfolio_id}​/pages​/{page_id}​/sections​/{section_id}`. Any suffix can be removed.

Warning! The swagger docs may not reflect the actual API. I have documented known disrepancies in the swagger docs description.

[readme]: README.md

### Authentication
The [djoser docs][djoser] has a great example for how the token authentication operates.
Here's a summary:

 1. Send a request to `/auth/token/login` with your username and password. A token will be returned.
 2. On subsequent requests that need authentication, add the token in the request header. ie, `Authorization: Token b704c9fc3655635646356ac2950269f352ea1139`

[djoser]: https://djoser.readthedocs.io/en/latest/sample_usage.html

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

### How to perform bulk updates to a list of sections

Use a `PUT` request to send a array of sections to the sections list endpoint (`/api/portfolios/{portfolio_id}/pages/{page_id}/sections`) to update the list.

Sections without ids will be created and the id would be returned.
If there is an existing section which is not in the sent array, then it would be deleted.
If a sections has an id, then it would be modified instead of deleted.

For example, the following request would delete everything except for the first item, and also creates a new section based on the data in the second item.

```json
[
    {
        "id": 4235,
        "name": "I will be modified",
        "type": "text",
        "content": "every other existing section gets deleted"
    },
    {
        "name": "I will be created",
        "type": "text",
        "content": "hello there!"
    }
]
```

## How To Modify
### How to add a new section type to the back end

  1. Open up `models.py` and copy paste TextSection in the Models file. You also need to update the `mapping` section of the `Section` model.
  2. Modify to appropriate name and content type.
  3. Run `python manage.py makemigrations`, check okay, run `python manage.py migrate`
  4. Go to `admin.py`
  5. Copy paste the existing TextSection admin function
  6. Change names and replace `'content'` with what ever fields are in the new section
  7. Now you should be able to log in to the Django admin and add a test entry
  8. Head over to `serializers.py`
  9. Same deal, copy paste the existing TextField and adjust as necessary. Also update the `get_serializer_map` section of `PolymorphSectionSerializer`.
  10. Head over to `views.py`
  11. Here you need to update the `get_queryset` for `SectionList`. Add the new section model to the `section_types` array.
  12. Repeat above step in `SectionDetail`
  13. You should now be good to go

Don't forget to add the new section to the front end!
Here's what to do with the frontend:

  1. Update Types.tsx if you need new properties.
  2. Update Portfolio.tsx with a new `else if` statement to handle the new section
  3. Update Edit.tsx

### How to edit the default portfolio

The default portfolio will be added as a new user's primary portfolio.

To change the default portfolio, edit the `create_default_portfolio` function in the portfolio's  [models](portfolio/models.py) file.


## How to test serializers on their own

Follow [this guide](https://www.django-rest-framework.org/tutorial/1-serialization/#working-with-serializers) on using the DJango shell to test the serializer directly

## How to debug in VSCode
This is based off [this guide](https://testdriven.io/blog/django-debugging-vs-code/)

  1. Create a new `launch.json` in your `.vscode` folder
  2. Give it the following settings:
``` json 
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Django",
      "type": "python",
      "request": "attach",
      "pathMappings": [
        {
          "localRoot": "${workspaceFolder}/src/backend",
          "remoteRoot": "/backend"
        }
      ],
      "port": 3001,
      "host": "127.0.0.1",
    }
  ]
}
```
  3. Open `manage.py`
  4. Uncomment section surrounded by `# start debug section` and `# end debug section`
  5. Set some break points
  6. Spin up docker
  7. Press the little `Start Debugging` button. Keep in mind, you need to do this in order for DJango to start up.
  8. Now if you open up `http://localhost:3000` and do anything to hit one of the breakpoints, it should pause and give you a debugging session in VSCode.