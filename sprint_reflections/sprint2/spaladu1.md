# Sprint Two
Valli Paladugu, vallipaladugu, Solsync

## What you planned to do
- Fetch sunrise and sunset data from backend 
    - Issue number: #43
    - https://github.com/utk-cs340-fall24/SolSync/issues/43
- Design habits page in Figma
    - Issue number: #44
    - https://github.com/utk-cs340-fall24/SolSync/issues/44
- Design and implement the sign up screen
    - Issue number: #45
    - https://github.com/utk-cs340-fall24/SolSync/issues/45

## What you did not do
- The location used for the API call is now hard coded in. I was not able to pull the phone's location when the user is not signed in or get the user's location when they are signed in.

## What problems you encountered
- It took a while to understand how to fetch the data from the API and format it into my code. I also was trying to get a linear gradient on the SolSync text in the Sign Up page, but it was not working how I wanted to do. I will most likely figure out how to do that in either sprint 3 or sprint 4.

## What issues you worked on
Issue number: 43, https://github.com/utk-cs340-fall24/SolSync/issues/43
Issue number: 44, https://github.com/utk-cs340-fall24/SolSync/issues/44
Issue number: 45, https://github.com/utk-cs340-fall24/SolSync/issues/45

## Files you worked on
- src/components/Home/index.tsx
- src/components/SignUp/index.tsx
- designs/habits_page_no_auth.png
- designs/habits_page_with_auth.png
- designs/home_page_evening.png
- designs/home_page_morning.png
- designs/log_in_page.png
- designs/sign_up_page.png

## What you accomplished
For sprint 2, I was in charge of fetching the sunrise sunset data from backend, designing the habits page, and designing and implementing the sign up page. I called the sunrise and sunset data from the API with a hard coded location for this sprint, which I will change to the phone's/user's location in the next sprint. I formatted the homepage to show one linear gradient style from hours 0 to 12 and another linear gradient style from hours 12 to 0. I added an activity indicator that shows a loading symbol while the API call is getting the sunrise and sunset times. I also created designs of the habits pages based on if the user is signed in or not, which will be implemented in the next sprint. Finally, I designed the sign up page and implemented it, allowing users to create their account. It requires a username, email and password. The sign up page can be accessed by clicking the Create an Account button on the sign in page. 