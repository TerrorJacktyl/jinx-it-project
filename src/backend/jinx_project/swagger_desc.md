# Jinx API
This swagger documentation is auto generated and so may not reflect the actual api.
These discrepancies are documented below.

## Discrepancies
This may not be an exhaustive list.

### Section Model
  - The `page` field is write only and will not appear in GET requests.
  - If `type` is `text`, then an additional `content` field will be in the section.
  - If `type` is `media`, then an additional `media` field will be in the section.

### Output serialisation
The return response may not be accurate. For example, the `/auth/token/login` won't return the username and password back, it will return a token back. However, this is not documented correctly.