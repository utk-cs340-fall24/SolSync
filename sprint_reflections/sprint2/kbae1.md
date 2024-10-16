# Sprint 2

Kaylee Bae, baekay000, SolSync

### What you planned to do

- Research methods to send email
- Set up sendgrid and send a test email [#41](https://github.com/utk-cs340-fall24/SolSync/issues/41)
- Create AWS lambda function to send all future emails [#42](https://github.com/utk-cs340-fall24/SolSync/issues/42)
- Create another AWS lambda to send daily emails [#63](https://github.com/utk-cs340-fall24/SolSync/issues/63)
- Test working lambda function with Postman/AWS console
- Implement mathematical method to calculate sunrise/sunset times

### What you did not do

- Implement mathematical method to calculate sunrise/sunset times.
- Use sengrid. We ended up using Mailgun.

### What problems you encountered

- Sendgrid rejected our account creation almost immediately
- Getting Mailgun up took significantly longer than expected. I ran into errors signing up with our solsync email.
- AWS lambda to call another AWS lambda through API Gateway took 6+ hours because arguments are passed in differently than in AWS console.
- Our Mailgun account got deactivated, so I tried to delete previous commit history that had exposed API Mailgun URL/credentials.
- I couldn't get this completely figured out, so I just went ahead and created new commits and PRs today.
- Setting a schedule send. There was no example code for Node online, only cURL.

### Issues you worked on

- [#41](https://github.com/utk-cs340-fall24/SolSync/issues/41)
- [#42](https://github.com/utk-cs340-fall24/SolSync/issues/42)
- [#63](https://github.com/utk-cs340-fall24/SolSync/issues/63)

### Files you worked on

- SolSync/lambdas/exampleMailgunTest.js
- SolSync/lambdas/sendEmail.js
- SolSync/lambdas/getSunriseSunset.mjs
- SolSync/lambdas/sendDailyEmail.mjs


### What you accomplished

I set up Mailgun successfullly, and I sent test emails with it. I then wrote an AWS lambda function that would start the email process, taking in generic email arguments, like recipient and subject. I exposed this lambda function to the frontend using Gateway, tested it with Postman, and then worked on another lambda function that would call this function. The second lambda function successfully calls the first and sends a daily email at 12PM the next day with details about a (for now) hard-coded habit and sunrise and sunset time.