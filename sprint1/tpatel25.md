# Sprint 1

Trishu Patel, tpatel25, SolSync

## What you planned to do

- Configure firebase and expo to enable them to communicate [#16](https://github.com/utk-cs340-fall24/SolSync/issues/16)
- Setup Firebase Auth [#18](https://github.com/utk-cs340-fall24/SolSync/issues/18)
- Initialize FireStore [#17](https://github.com/utk-cs340-fall24/SolSync/issues/17)
- Enable users to sign up, log in, and sign out [#18](https://github.com/utk-cs340-fall24/SolSync/issues/18)
- Request user location permission and store coordinates into FireStore [#17](https://github.com/utk-cs340-fall24/SolSync/issues/17)

## What you did not do

I was able to complete all of my tasks. I plan to abstract out authentication and database logic into separate React Hooks next sprint.

## What problems you encountered

- Setting up Firebase Auth to work with expo go
- Requesting user locations quickly
- Configuring environment variables without exposing api keys

## Issues you worked on

- [#16](https://github.com/utk-cs340-fall24/SolSync/issues/16)
- [#17](https://github.com/utk-cs340-fall24/SolSync/issues/17)
- [#18](https://github.com/utk-cs340-fall24/SolSync/issues/18)

## Files you worked on

- app.json
- src/components/SignUp/index.tsx
- .gitignore
- App.tsx
- babel.config.js
- firebaseConfig.ts
- metro.config.js
- src/components/SignUp/index.tsx
- src/components/Login/index.tsx
- src/hooks/useUser.ts
- src/screens/LoginScreen.tsx
- src/screens/SignUpScreen.tsx

## What you accomplished

The bulk of my work revolved around setting up and connect Firebase into our expo app. I created a new firebase web app with proper roles and credentials. I also setup Firebase Auth to allow new user to create an account, sign into a existing account, and sign out. When a new user creates an account, the app prompts the user to get access to there location and stores this information alongside the user's email into fireStore. This location information will be used to find/calculate sunrise times in AWS in future.
