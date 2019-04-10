# API DOCS

## Register User
### for mobile to register a new user
* requires: `username`, `password`
* response: `success: false`, `message: message`, `error: error` OR
            `success: true`

## Login
### for mobile user to login as a registered user
* requires: `username`, `password`
* response: `success: false`, `message: message`, `error: error` OR
            `success: true`, `message: message`, `token: token`

## Get Fish
### for mobile to get all of a users previously caught fish
* requires: `token` in header
* response: `success: false`, `error: error`, `message: ERROR GETTING FISH` OR
            `success: true`, `fish: [fish]`

## Open Session
### for browser to open a session that mobile players can join
* requires:
* response: `success: false`, `error: error`, `message: error creating session in database` OR
            `success: true`, `message: sessionID`

## Caught Fish
### for mobile to save users fish that they caught to database after session ends
* requires: `token` in header, `fish` array of fish ids
* response: `success: false`, `error: error`, `message: ERROR ADDING FISH TO DATABASE` OR
            `success: true`