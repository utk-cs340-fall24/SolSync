# Sprint Two
Valli Paladugu, vallipaladugu, Solsync

## What you planned to do
- Update home page to care about auth
    - Issue number: #67
    - https://github.com/utk-cs340-fall24/SolSync/issues/67
- Design habits form
    - Issue number: #73
    - https://github.com/utk-cs340-fall24/SolSync/issues/73
- Implement design on habits form
    - Issue number: #74
    - https://github.com/utk-cs340-fall24/SolSync/issues/74

## What you did not do
- For issue #67, I was not able to account for no location permission on my device when the user is not logged in.

## What problems you encountered
- While designing the add and edit habit forms, the text boxes kept moving when there was an input in the box for the first two digits but it stopped moving after that. Also I am not able to get a background color on the form so that will have to be figured out in the next sprint.

## What issues you worked on
Issue number: 67, https://github.com/utk-cs340-fall24/SolSync/issues/67
Issue number: 73, https://github.com/utk-cs340-fall24/SolSync/issues/73
Issue number: 74, https://github.com/utk-cs340-fall24/SolSync/issues/74

## Files you worked on
- designs/add_habit_form.png
- designs/edit_habit_form.png
- src/components/Home/index.tsx
- src/components/SignUp/index.tsx
- designs/habit_page_no_auth.png
- designs/history_page_no_auth.png
- src/components/Habits/AddHabitForm.tsx 
- src/components/Habits/EditHabitForm.tsx
- src/components/Habits/HabitList.tsx
- src/components/Habits/index.tsx
- src/components/History/index.tsx

## What you accomplished
For sprint 3, I was in charge of designing pages related to the habits form, implementing them and updating the homepage to care about authorization. I designed the habits and history page when there is no auth, and the add and edit habit forms in Figma and implemented them afterwards. For the homepage, I updated it to take the device's location when the user is signed out for the current location's sunrise and sunset times. I also updated the times to be based on the location the user set when signing up when the user is signed in to their account. 