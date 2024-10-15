# Sprint 1

Kaylee Bae, baekay000, SolSync

### What you planned to do

- Create an AWS account and a user with administrative access [#8](https://github.com/utk-cs340-fall24/SolSync/issues/8)
- Create an example lambda function with the console
- Research and use a sunrise/sunset API to return sunrise/sunset times
- Setup weather API for use with AWS [#9](https://github.com/utk-cs340-fall24/SolSync/issues/9)
- Expose lambda function to frontend using API gateway [#10](https://github.com/utk-cs340-fall24/SolSync/issues/10)
- Test working lambda function with Postman

### What you did not do

- I got all of my issues completed, but I would have liked to find a mathematical method to calculate sunrise/sunset times.

### What problems you encountered

- Using the lambda function to create a GET request to the weather API.
- Using lambda funcionality dependent on some node modules.
- Configuring the code to allow for the lambda function to work on Postman and AWS test console.

### Issues you worked on

- [#8](https://github.com/utk-cs340-fall24/SolSync/issues/8)
- [#9](https://github.com/utk-cs340-fall24/SolSync/issues/9)
- [#10](https://github.com/utk-cs340-fall24/SolSync/issues/10)

### Files you worked on

- SolSync/lambdas/index.js
- SolSync/lambdas/node-fetch.zip

### What you accomplished

I was able to set up AWS successfullly, including creating an AWS account, creating a user with administrative access, running lambda function with the console, and testing its functionality with Postman. I then modified this example lambda function with another one I wrote. The new lambda function hits a REST API I found and parses the JSON to return today's sunrise/sunset time and tomorrow's sunrise time in ISO 8601. It also takes in an API key that will keep others from using our endpoint. In summary, I made a lambda function that can be used by our frontend to return the weather data.
