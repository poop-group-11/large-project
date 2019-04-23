# Websocket Docs

## Join Channels
### for player to join session from start screen
* from: mobile
* event:`join`
* data: `sessionCode` , `token`
* emits: `joinResponse`, data: { user, success (boolean), message} for mobile
         `userJoined`, data: `user` for browser to update session screen

## Leave Channels
### if player leaves during game
* from: mobile
* event: `leave`
* data: `course_code`
* emits: `userLeft` data: `user` for browser to know who left

## Session Start
### indicates that no more players can join, starts the session
* from: browser
* event: `sessionStart`
* data: `sessionCode`
* emits: `startSession` for mobile to know to move to the reel screen

## Cast Hook
### for mobile to tell browser that they have casted their hook
* from: mobile
* event: `castHook`
* data: `user`
* emits: `casted`, data: `user` for browser to know which player casted their hook

## Reel
### for mobile to tell browser that they are reeling and the direction
* from: mobile
* event: `reel`
* data: `user`, `direction` i.e. +1 or -1
* emits: `reeled`, data: `user`, `direction` for browser to move hook

## Fish Caught
### for browser to tell mobile that the user caught a fish
* from: browser
* event: `fishCaught`
* data: `user`, `fish`
* emits: `caught`, data: `user`, `fish` for mobile to know what fish they caught

## End Session
### for browser to end session after time is up
* from: browser
* event: `endSession`
* data: `sessionCode`, `winner` (user id of winner)
* emits: `sessionEnded`, data: `winner` for mobile to know that the session is over and who won
         also forces all clients to leave socket
