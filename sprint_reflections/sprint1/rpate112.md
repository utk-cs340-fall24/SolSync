# Sprint 1

Rudra Patel, RudraPatel2003, SolSync

### What you planned to do

- Initialize the Expo project [#5](https://github.com/utk-cs340-fall24/SolSync/issues/5)
- Set up CI/CD pipeline using GitHub Actions [#6](https://github.com/utk-cs340-fall24/SolSync/issues/6)
- Set up Tabs navigation with proper icons [#7](https://github.com/utk-cs340-fall24/SolSync/issues/7)

### What you did not do

I finished all of the issues I had planned to do.

### What problems you encountered

- The RegEx for the PR title was not working properly. Bash has very specific rules for the syntax of regular expressions, and it is not how it would be done in a normal programming language. This made it hard to create the CI/CD pipeline.
- The Tabs navigation was tricky to set up at first. I was running into many issues with setting up the Expo app itself, which had a tendency to break often. I also had a hard time reviewing others' PRs; any small issue caused the entire app to fail to load.

### Issues you worked on

- [#5](https://github.com/utk-cs340-fall24/SolSync/issues/5)
- [#6](https://github.com/utk-cs340-fall24/SolSync/issues/6)
- [#7](https://github.com/utk-cs340-fall24/SolSync/issues/7)

### Files you worked on

- .github/pull_request_template.md
- .github/workflows/pr.yml
- tsconfig.json
- setup-branch-protection.sh
- README.md
- package.json
- App.tsx
- .eslintrc.js
- src/screens/HomeScreen.tsx
- src/components/Home/index.tsx

### What you accomplished

Overall, I would say I accomplished a lot of things. Firstly, I initialized the Expo project so that it would not use the new Expo Router feature and would use TypeScript. This is because the Expo Router is very new and we have run into issues with it. The second thing I did was set up the CI/CD pipeline using GitHub Actions. This made it so that we have strict standards for all code that enters the repository. The third thing I did was set up the Tabs navigation. This was a prerequisite for everyone else to do their work because it created the backbone of the app.

I also did some work that was untracked in the process of reviewing PRs.

- With Trishu, I helped standardize the naming of the functions he used and also helped him set up environment variables. He was using react-native-dotenv, but it did not work, so I helped him set up the .env file so that it would work with Expo.
- With Valli, I helped set up the tsconfig.json so that she could import her assets from @assets
- With Kaylee, I helped integrate her Lambda functionw with API Gateway, as the way the lambda must parse the JSON body is different when you are testing and when you are receiving a request from API Gateway.
- With Amy, I helped her fix her Typescript errors when setting up the Stack Navigation on the Profile page.
