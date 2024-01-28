SecureAccess™ Server
===
A simple TOTP server for security.

# How to use it

`bun src/index.ts`

will do bundle probably later

> para

## add 

add $username: add a new user

> Only one user get processed at the same time

## list

list: list users

## rm

rm $user1 $user2: remove users

## Empty

start auth server

## para

-v/--verbose: show verbose

-p/--port $port: set port for the server, by default it's 8089

-l/--listen $host: set host for the server, by default it's 127.0.0.1

# APIs

/auth/:user/:token

returns: `{"success": true}` or `{"success": false}`