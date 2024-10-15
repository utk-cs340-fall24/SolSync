# Sprint 2

Trishu Patel, Trishu-Patel, SolSync

## What you planned to do

- Connect habit tab to database [#37](https://github.com/utk-cs340-fall24/SolSync/issues/37)
- Connect History tab to backend [#38](https://github.com/utk-cs340-fall24/SolSync/issues/38)
- Create History Tab [#39](https://github.com/utk-cs340-fall24/SolSync/issues/39)

## What you did not do

I was able to complete all tasks that were assigned to me.

## What problems you encountered

- I ran into issues storing and reading dates from firebase. You are not able to read stored times from firebase using the default firebase date object. All times stored into firestore automatically get converted into UTC without storing which timezone the input date came from. The solution is only storing times at UTC and converting it into local time at the front-end. This means that sunrise at 7:30 EST will be stored at 11:30 UTC in firestore.

- My original goal for this sprint is the create a demo for push notifications. In order to test push notifications, you need to side-load the app onto a physical device. However, Apple requires developer to buy an Apple Developer License (which cost $100/year) in order to side-load an app on an iPhone. Many hours were spent trying to find a method to send push notifications without an Apple Developer License but we were unable to. So as a team, we decided that we will not be implementing push notifications into this project.

## Issues you worked on

- [#37](https://github.com/utk-cs340-fall24/SolSync/issues/37)
- [#38](https://github.com/utk-cs340-fall24/SolSync/issues/38)
- [#39](https://github.com/utk-cs340-fall24/SolSync/issues/39)

## Files you worked on

- src/components/History/index.tsx
- package.json
- src/screens/HistoryScreen.tsx
- src/components/Habits/HabitForm.tsx
- src/components/Habits/HabitProvider.tsx
- src/types/index.ts
- App.tsx

## What you accomplished

- I was able to our connect the habits pages into firestore. Users are now able to create and delete habit as they wish and all changes are automatically stored into our database. This habits are unique to the user so that you are only able to see your habits. I was also able to create the history tab. This page consist of a dropdown with the user's habits and dynamic calendar. Whenever the user selects a habit from the dropdown, the history for this habit automatically displays into the calendar. The user can swipe between the calendars to view the history over months/year. The data for each habit's history is current read from hard-coded data in firebase. Next sprint, I plan to give users to ability to input data for the history (by clicking on the dates in the calendar).