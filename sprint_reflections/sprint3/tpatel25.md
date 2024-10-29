# Sprint 3

Name: Trishu Patel

Github ID: Trishu-Patel

Group: SolSync

## What you planned to do

- Implement design on history screen [#79](https://github.com/utk-cs340-fall24/SolSync/issues/79)
- Fetch information for daily emails from firestore [#82](https://github.com/utk-cs340-fall24/SolSync/issues/82)
- Allow users to track habit completion on History page [#110](https://github.com/utk-cs340-fall24/SolSync/issues/110)

## What you did not do

I want to fetch the information from firestore for the daily emails in AWS, but I was able to do it within a local node server. Next sprint, I plan to migrate my node function into AWS lambda and configure the function so that it gets triggered automatically.

## What problems you encountered

The only major issue that I ran into this sprint was configuring a firebase admin account and learning how to use it in a local node server.

## Issues you worked on

- Implement design on history screen [#79](https://github.com/utk-cs340-fall24/SolSync/issues/79)
- Fetch information for daily emails from firestore [#82](https://github.com/utk-cs340-fall24/SolSync/issues/82)
- Allow users to track habit completion on History page [#110](https://github.com/utk-cs340-fall24/SolSync/issues/110)
- Connect History page to Firebase [#109](https://github.com/utk-cs340-fall24/SolSync/issues/109)
- Design history screen [#77](https://github.com/utk-cs340-fall24/SolSync/issues/77)

## Files you worked on

- lambdas/sendDailyEmails/index.mjs
- lambdas/sendDailyEmails/package.json
- src/components/History/index.tsx

## What you accomplished

My two major goals this sprint were completing the history tab and creating a function that send your daily email. This sprint, I was able to connect the history tab to firebase, this allows user to mark a habit as completed and be able to visually see when they completed their habits in the past with a little calendar. Since all this data is stored into firebase, all changes made persist whenever you leave the app. I also styled the history tab to match the look and feel of the rest of the app. I also created the send daily email function. This function fetches all the users and habits from firestore, calculates the habit start time for each habit, and constructs/sends a email with all this information to each user. This function is also set up so that I will only send emails to all valid users with at least one habit. 