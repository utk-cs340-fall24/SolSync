# Sprint 3

Kaylee Bae, baekay000, SolSync

### What you planned to do

- Hide AWS endpoint and Mailgun API endpoint in backend
- Create a welcome email lambda function that calls the sendEmail lambda
- Add the lambda function to the sign up fosrm
- Test email send on account creation with multiple emails

### What you did not do

I was able to complete all tasks that were assigned to me; however, to add on to my issues, I would have loved to make my welcome email lambda a POST request instead of a GET request to follow convention.

### What problems you encountered

- The welcome email kept failing to send. Sometimes I would get an HTTP error, but I would receive the welcome email a couple of minutes later. After a lot of experimentation and log-tracking from Mailgun, I found that the cause of this problem was because I was scheduling my email a little bit longer than the lambda function was alloted. When I changed this timeframe to a couple of seconds, the emails started sending on time.
- I also had trouble changing the POST request to a GET request. The parsing was completely different and since I wanted the lambda to work in the AWS console as well as in the frontend, I had to modify some if statements to get this working.

### Issues you worked on

- [#80](https://github.com/utk-cs340-fall24/SolSync/issues/80)
- [#81](https://github.com/utk-cs340-fall24/SolSync/issues/81)
- [#88](https://github.com/utk-cs340-fall24/SolSync/issues/88)

### Files you worked on

- SolSync/lambdas/exampleMailgunTest.js
- SolSync/lambdas/getSunriseSunset.mjs
- SolSync/lambdas/sendWelcomeEmail.mjs
- SolSync/src/components/Home/index.tsx
- SolSync/src/components/Profile/SignUp.tsx


### What you accomplished

I fixed some Mailgun issues that we were having by resetting the account. I then made sure to not repeat the same mistake my hiding the Mailgun API endpoint and lambda endpoints in a local environment file. I wrote an AWS lambda function that sends a welcome email on sign up including the user's display name and their email. I exposed this lambda function to the frontend using API Gateway, tested it with Postman, and then added this request to the sign up form after validation. Now whenever a new user signs up for SolSync, they will receive an email in their inbox as confirmation that their account has been created.