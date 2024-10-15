# Sprint 2

Rudra Patel, RudraPatel2003, SolSync

## What you planned to do

- Create README [#28](https://github.com/utk-cs340-fall24/SolSync/issues/28)
- Use react-hook-form to rewrite sign in form [#34](https://github.com/utk-cs340-fall24/SolSync/issues/34)
- Use react-hook-form to rewrite sign up form [#35](https://github.com/utk-cs340-fall24/SolSync/issues/35)
- Create habit tab [#36](https://github.com/utk-cs340-fall24/SolSync/issues/36)

## What you did not do

I finished all of the issues I had planned to do.

## What problems you encountered

- The habit form and the habit list are technically two different screens. This was an issue because they had shared state between them in the form of the habits list as well as the addHabit and deleteHabit functions. I fixed this by using React Context; the HabitProvider makes the state and the state change functions accessible to all components in the app, which allows the habit-related components to share state.

## Issues you worked on

- [#28](https://github.com/utk-cs340-fall24/SolSync/issues/34)
- [#34](https://github.com/utk-cs340-fall24/SolSync/issues/34)
- [#35](https://github.com/utk-cs340-fall24/SolSync/issues/35)
- [#36](https://github.com/utk-cs340-fall24/SolSync/issues/36)

## Files you worked on

- src/components/Habits/HabitList.tsx
- package.json
- src/utils/getFirebaseAuthErrorMessage.tsx
- LICENSE.txt
- src/components/Profile/AuthorizedProfile.tsx
- App.tsx
- src/screens/HabitsScreen.tsx
- src/components/Login/index.tsx
- src/utils/getLocationFromDevice.tsx
- src/components/Profile/index.tsx
- src/screens/ProfileScreen.tsx
- README.md
- src/hooks/useUser.ts
- types/index.ts
- images.d.ts
- src/components/Habits/HabitProvider.tsx
- tsconfig.json
- src/components/Habits/HabitForm.tsx
- src/components/SignUp.index.tsx
- src/components/Habits/index.tsx
- src/hooks/useHabit.ts

## What you accomplished

I would say that I accomplished a lot this sprint.

Firstly, I wrote the README file. This file gives a general overview of the project, instructions on how to set up and run the project locally, and information that contributors need to know before they can start working on the project. I also wrote the LICENSE file, which is a copy of the MIT License.

Secondly, I added form validations to the log in and sign up forms. I also added a function to get the error message from the Firebase Auth error. This accomplishes two things:

- There are client-side validations that are enforced by the react-hook-form library. The user gets error messages if they don't put in a valid email or password.
- The getFirebaseAuthErrorMessage presents the server-side error message in a user-friendly format.

Third, I set up the habits tab. This allows the user to add new habits and view the habits they have added. Using the react-hook-form library, I was able to set up the form validations for the habit form. Currently, clicking on a habit deletes it.

All of this work was important to create an enjoyable user experience and to lay the groundwork for major features of the app.
