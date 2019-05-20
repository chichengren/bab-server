---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

# includes:
#   - errors

search: true
---

# Introduction

Welcome to the Bab API! You can use our API to access Bab API endpoints, which can get information on various member, player, court, reservations data.

This example API documentation page was created with [Slate](https://github.com/lord/slate). Feel free to edit it and use it as a base for your own API's documentation.

# Authentication

<!-- > To authorize, use this code: -->

<!-- ```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
``` -->

<!-- ```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
``` -->

<!-- > Make sure to replace `meowmeowmeow` with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our [developer portal](http://example.com/developers).

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow` -->

<!-- <aside class="notice">
You must replace <code>meowmeowmeow</code> with your personal API key.
</aside> -->

# Player

## Get All Players

<!-- ```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
``` -->

```shell
curl "https://bab.moepas.com/api/players"
```

<!-- ```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
``` -->

> The above command returns JSON structured like this:

```json
{
  "players": [
    {
      "name": "Fluffums",
      "password": "cat",
      "courtNumber": 6,
      "reservationToken": "token-one",
      "slackId": "slack-a"
    },
    {
      "name": "Puffy",
      "password": "dog",
      "slackId": "slack-b"
    },
  ]
}
```

This endpoint retrieves all players.

### HTTP Request

`GET https://bab.moepas.com/api/players`

### Query Parameters

None

<!-- Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted. -->

<!-- <aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside> -->

## Get a Specific Player

<!-- ```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
``` -->

```shell
curl "https://bab.moepas.com/api/players/get?name=xxx"
```

<!-- ```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this: -->

```json
{
  "player": {
    "name": "Fluffums",
    "password": "cat",
    "courtNumber": 6,
    "reservationToken": "token-one",
    "slackId": "slack-a"
  }
}
```

This endpoint retrieves a specific player.

<!-- <aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside> -->

### HTTP Request

`GET https://bab.moepas.com/api/players/get?slackId=slackId(&name=name)`

### URL Parameters

Parameter | Description
--------- | -----------
slackId | The slackId of the player to retrieve
name | The player name of the player to retrieve

## Add a Player
<!-- ```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.delete(2)
``` -->

```shell
curl "https://bab.moepas.com/api/players/add"
  -X POST -d "name=xxx&password=yyy"
```

<!-- ```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.delete(2);
``` -->

> The above command returns JSON structured like this:

```json
{}
```

This endpoint deletes a specific kitten.

### HTTP Request

`POST https://bab.moepas.com/api/players/add`

### URL Parameters

Parameter | Description
--------- | -----------
name | The name of the player to add
password | The password of the player to add
slackId | The slackId of the player to delete


## Delete a Player

<!-- ```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.delete(2)
``` -->

```shell
curl "https://bab.moepas.com/api/players/delete"
  -X POST -d "name=xxx"
```

<!-- ```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.delete(2);
``` -->

> The above command returns JSON structured like this:

```json
{}
```

This endpoint deletes a specific player.

### HTTP Request

`POST https://bab.moepas.com/api/players/delete`

### URL Parameters

Parameter | Description
--------- | -----------
slackId | The slackId of the player to delete
name | The name of the player to delete

# Reservation

## Get All Active Reservations

```shell
curl "https://bab.moepas.com/api/courts"
```

> The above command returns JSON structured like this:

```json
{
  "reservations": [
    {
      "token": "reservation-token",
      "courtNumber": 1,
      "players": ["one", "two"],
      "startAt": 123,
      "endAt": 456,
      "randoms": false
    }
  ]
}
```

This endpoint lists all active reservations.

### HTTP Request

`GET https://bab.moepas.com/api/courts`

### URL Parameters

Parameter | Description
--------- | -----------

## Add Reservation

```shell
curl "https://bab.moepas.com/api/courts/register"
  -X POST
  -d "courtNumber=1&names=a&names=b"
```

> The above command returns JSON structured like this:

```json
{
  "reservations": {
    "token": "reservation-token",
    "courtNumber": 1,
    "players": ["one", "two"],
    "startAt": 123,
    "endAt": 456,
    "randoms": false
  }
}
```

This endpoint adds an reservation.

### HTTP Request

`POST https://bab.moepas.com/api/courts/register`

### URL Parameters

Parameter | Description
--------- | -----------
courtNumber | The court number of the reservations
names (Array) | Player names to be assigned to this reservations
delayInMinutes (Optional) | The delay for this reservation
durationInMinutes (Optional) | Duration of this
randoms (Optional) | Whether this reservation is random

## Remove Reservation

```shell
curl "https://bab.moepas.com/api/courts/unregister"
  -X POST
  -d "token=token"
```

> The above command returns JSON structured like this:

```json
{}
```

This endpoint adds an reservation.

### HTTP Request

`POST https://bab.moepas.com/api/courts/unregister`

### URL Parameters

Parameter | Description
--------- | -----------
token | The token of the reservation

