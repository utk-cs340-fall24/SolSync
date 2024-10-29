# Sprint 2

Rudra Patel, RudraPatel2003, SolSync

## What you planned to do

- Update README to fit final project specifications [#97](https://github.com/utk-cs340-fall24/SolSync/issues/97)
- Remove references to push notifications [#93](https://github.com/utk-cs340-fall24/SolSync/issues/93)
- Extract all database functions into a separate file [#92](https://github.com/utk-cs340-fall24/SolSync/issues/92)
- Add the ability to edit habits [#75](https://github.com/utk-cs340-fall24/SolSync/issues/75)
- Investigate testing framework [#68](https://github.com/utk-cs340-fall24/SolSync/issues/68)
- Update useUser to return firestore user, not firebase auth user [#66](https://github.com/utk-cs340-fall24/SolSync/issues/66)

## What you did not do

I finished all of the issues I had planned to do.

## What problems you encountered

- Updating auth was a very tricky problem. Getting the loading state to work with the useUser was tedious and took a while to figure out. Additionally, I inadvertently introduced a bug where every page has its own user state, which is not what we want. I ended up fixing this in Amy's PR but moving the user to a React Context.
- The testing framework was tricky to set up, especially since I was using Expo and TypeScript. I spoke with the team and we decided it would not provide any benefits to the project.

## Issues you worked on

- [#97](https://github.com/utk-cs340-fall24/SolSync/issues/97)
- [#93](https://github.com/utk-cs340-fall24/SolSync/issues/93)
- [#92](https://github.com/utk-cs340-fall24/SolSync/issues/92)
- [#75](https://github.com/utk-cs340-fall24/SolSync/issues/75)
- [#68](https://github.com/utk-cs340-fall24/SolSync/issues/68)

## Files you worked on

- .eslintrc.js
- .github/workflows/pr.yml
- App.tsx
- README.md
- src/components/Habits/AddHabitForm.tsx
- src/components/Habits/HabitList.tsx
- src/components/Habits/EditHabitForm.tsx
- src/components/Habits/HabitProvider.tsx
- src/components/Habits/index.tsx
- src/components/History/index.tsx
- src/components/Home/index.tsx
- src/components/LogIn/index.tsx
- src/components/Profile/AuthorizedProfile.tsx
- src/components/Profile/index.tsx
- src/components/SignUp/index.tsx
- src/hooks/useHabit.ts
- src/hooks/useUser.ts
- src/server/habits.ts
- src/server/histories.tsx
- src/server/index.ts
- src/server/users.ts
- src/types/index.ts
- src/utils/getLocationFromDevice.ts

Note: not all of these files listed are in the commits.txt because someone may have changed them afterwards

## What you accomplished

I would say that I accomplished a lot this sprint.

Firstly, I updated the README to fit the final project specifications. This prepares us for the final project demo and submission.
Secondly, I removed the references to push notifications. This is because Trishu had determined we would not be able to implement push notifications into this project.
Thirdly, I extracted all database functions into a separate file. This keeps the code clean and makes it easier to maintain.
Fourthly, I added the ability to edit habits. This finalizes the functionality for the habits page.
Fifthly, I investigated testing frameworks. Testing is a crucial part of any project, but we decided that it would not be worth it.
Sixthly, I updated useUser to return firestore user, not firebase auth user. This allowed other teammates to access user information without having to make additional calls to the database.

I also contributed on other people's work:

- For Amy, I rewrote the authorization logic and move the useUser hook to a React Context. This allowed her profile page modal to work.
