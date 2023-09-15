# `Team Hub API`
### `POST api/auth/login`
##### Request body:
* username `(STRING)`
* password `(STRING)`
##### Response object:
* message `(STRING)`
* accessToken `(OBJECT)` **or** `(NULL)`
##### Response cookies:
* jwt `(STRING)`
---
### `POST api/auth/refresh`
##### Request cookies:
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
### `POST api/users`
##### Request body:
* username `(STRING)`
* password `(STRING)`
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
### `GET api/teams/search-team/:teamName`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* teamName `(STRING)`
##### Response object:
* message `(STRING)`
* teams `(ARRAY)`
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
### `GET api/memberships/get-single-membership/:teamID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* teamID `(STRING)`
##### Response object:
* message: `(STRING)`
* membership `(OBJECT)` **or** `(NULL)`
---
### `GET api/memberships/check-membership/:userID/:teamID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* userID `(STRING)`
* teamID `(STRING)`
##### Response object:
* message: `(STRING)`,
* membership `(OBJECT)` **or** `(NULL)`
---
### `GET api/memberships`
##### Request headers:
* authorization `(STRING)`
##### Response object:
* message `(STRING)`
* memberships `(ARRAY)` **or** `(NULL)`
---
### `POST api/memberships`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* teamID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `DELETE api/memberships/:membershipID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* membershipID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `GET api/posts/get-all-posts/:teamID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* teamID `(STRING)`
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
* teamID `(STRING)`
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
### `GET api/post_votes/:postID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* postID `(STRING)`
##### Response object:
* message: `(STRING)`
* postVote: `(OBJECT)` **or** `(NULL)`
---
### `POST api/post_votes`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* teamID `(STRING)`
* postID `(STRING)`
* vote `(NUMBER)`
##### Response object:
* message `(STRING)`
---
### `DELETE api/post_votes/:postVoteID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* postVoteID `(STRING)`
##### Request body:
* postID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `GET api/comments/get-all-comments/:postID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* postID `(STRING)`
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
* comment `(OBJECT)` **or** `(NULL)`
---
### `POST api/comments`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* body `(STRING)`
* teamID `(STRING)`
* postID `(STRING)`
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
### `GET api/comment_votes/:commentID`
##### Request headers:
* authorization `(STRING)`
##### Request path parameters:
* commentID `(STRING)`
##### Response object:
* message `(STRING)`
* commentVote `(OBJECT)` **or** `(NULL)`
---
### `POST api/comment_votes`
##### Request headers:
* authorization `(STRING)`
##### Request body:
* teamID `(STRING)`
* commentID `(STRING)`
* vote `(NUMBER)`
##### Response object:
* message `(STRING)`
---
### `DELETE api/comment_votes/:commentVoteID`
##### Request headers:
* authorization `{STRING}`
##### Request path parameters:
* commentVoteID `(STRING)`
##### Request body:
* commentID `(STRING)`
##### Response object:
* message `(STRING)`
---
### `GET api/cookie_checker`
##### Request cookies:
* acceptsCookies `(STRING)`
##### Response object:
* message: `(STRING)`
---
### `POST api/cookie_checker`
##### Response object:
* message: `(STRING)`
##### Response cookies:
* acceptsCookies `(STRING)`
---