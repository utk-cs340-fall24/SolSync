# Sprint 1

Name: Amy Huang
Github ID: amy-huang16
Group: SolSync

### What you planned to do

- Create a Figma design for the Settings Page [#19](https://github.com/utk-cs340-fall22/SolSync/issues/19)
- Implement the Settings Page[#20](https://github.com/utk-cs340-fall22/SolSync/issues/20)
- Implement the Sign In Page[#21](https://github.com/utk-cs340-fall22/SolSync/issues/21)

### What you did not do

- Implement styling on Settings Page (which later became the Profile Page)

### What problems you encountered

- Since we ended up reworking the routing of the app, the Settings page became obsolete and the design was not continued/pushed into production. 

### Issues you worked on

[#19](https://github.com/utk-cs340-fall22/SolSync/issues/19)
[#20](https://github.com/utk-cs340-fall22/SolSync/issues/20)
[#21](https://github.com/utk-cs340-fall22/SolSync/issues/21)

### Files you worked on

- SolSync/src/components/Profile/AuthorizedProfile.tsx
- SolSync/src/components/Profile/index.tsx
- SolSync/src/components/Profile/UnauthorizedProfile.tsx
- SolSync/src/components/Login/index.tsx
- SolSync/src/components/SignUp/index.tsx

### What you accomplished

- Added nested Stack Navigation that connects the Login and Sign Up pages with the Profile page. This is nested inside of the Tab navigation, which involves the Home page and the Profile page.
- Added all elements inside of the Profile page. This includes a profile icon, switches for email and push notifications, and a button to reset location or log out.
- Added features like TouchableWithoutFeedback and "Email" and "Password" placeholder text to the Login and Sign Up pages already created by Trishu.
