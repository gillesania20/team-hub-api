# `Team Hub API`
### `POST api/auth/login`
##### Request body:
* username `(STRING)`
* password `(STRING)`
##### Response object:
* message `(STRING)`
* accessToken `(OBJECT)` **or** `(NULL)`
##### Response cookie:
* jwt `(STRING)`
---
### `POST api/auth/refresh`
##### Request cookie:
* jwt `(STRING)`
##### Response object:
* message `(STRING)`
* accessToken `(OBJECT)` **or** `(NULL)`
* userID `(STRING)` **or** `(NULL)`
---
### `POST api/auth/logout`
##### Response object:
* message `(STRING)`
---
### `GET api/users/:userID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* userID `(STRING)`
##### Response object:
* message `(STRING)`
* user `(OBJECT)` **or** `(NULL)`
---
### `PATCH api/users/:userID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* userID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `GET api/teams/:teamID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* teamID `(STRING)`
##### Response object:
* message `(STRING)`
* team `(OBJECT)` **or** `(NULL)`
---
### `POST api/teams`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* name `(STRING)`
* leader `(STRING)`
##### Response object:
* message `(STRING)`
---
### `PATCH api/teams/:teamID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* teamID `(STRING)`
##### Request body:
* name `(STRING)`
* members `(ARRAY)`
##### Response object:
* message `(STRING)`
---
### `DELETE api/teams/:teamID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* teamID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `GET api/posts`
##### Request headers:
* authorization `(STRING)`
##### Response object:
* message `(STRING)`
* posts `(ARRAY)` **or** `(NULL)`
---
### `GET api/posts/:postID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* postID `(STRING)`
##### Response object:
* message `(STRING)`
* post `(OBJECT)`
---
### `POST api/posts`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* body `(STRING)`
##### Response object:
* message `(STRING)`
---
### `PATCH api/posts/:postID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* postID `(STRING)`
##### Request body:
* body `(STRING)`
* comments `(ARRAY)`
* like `(ARRAY)`
* dislike `(ARRAY)`
##### Response object:
* message `(STRING)`
---
### `DELETE api/posts/:postID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* postID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `GET api/comments`
##### Request headers:
* authorization `(STRING)`
##### Response object:
* message `(STRING)`
* comments `(ARRAY)` **or** `(NULL)`
---
### `GET api/comments/:commentID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* commentID `(STRING)`
##### Response object:
* message `(STRING)`
* comment `(OBJECT)`
---
### `POST api/comments`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* body `(STRING)`
* user `(STRING)`
* post `(STRING)`
##### Response object:
* message `(STRING)`
---
### `PATCH api/comments/:commentID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* commentID `(STRING)`
##### Request body:
* body `(STRING)`
* like `(ARRAY)`
* dislike `(ARRAY)`
##### Response object:
* message `(STRING)`
---
### `DELETE api/comments/:commentID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* commentID `(STRING)`
##### Response object:
* message `(STRING)`
---