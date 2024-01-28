SecureAccess™ Server
===

TODOs

- [x] Simple TOTP server.
- [ ] GRPC TUN and RCP(Remote CLI Protocol)
- [ ] GRPC TUN and RNP™(Remote Networking Protocol)
- [ ] Rainy Dashboard™(Remote control, Package management, monitor...)
- [ ] Auth Socket for Linux APPs

# How to use it

`bun src/index.ts` with `action` and `-p/--para`

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