# Sprint 2

Name: Amy Huang

Github ID: amy-huang16

Group: SolSync

### What you planned to do

- Design a Sign-In page [#47](https://github.com/utk-cs340-fall24/SolSync/issues/47) - [link to design](https://github.com/utk-cs340-fall24/SolSync/blob/main/designs/log_in_page.png)
- Implement design on Sign-In page [#48](https://github.com/utk-cs340-fall24/SolSync/issues/48)
- Implement design and add functionality to buttons on Authorized Profile page [#46](https://github.com/utk-cs340-fall24/SolSync/issues/46)

### What you did not do

- I hoped to fully finish the profile page but did not anticipate the complication of an edit profile system nor the issue of having two different types of users and being unable to get the user's name from the database. These issues will be addressed next sprint.

### What problems you encountered

- Editing a profile involves many calls to the database and functions that did not exist yet.
- We have a firebase User and a SolSync User and that lead to problems with displaying the stored user's displayName.

### Issues you worked on

- [#46](https://github.com/utk-cs340-fall24/SolSync/issues/46)
- [#47](https://github.com/utk-cs340-fall24/SolSync/issues/47) - [link to design](https://github.com/utk-cs340-fall24/SolSync/blob/main/designs/log_in_page.png)
- [#48](https://github.com/utk-cs340-fall24/SolSync/issues/48)

### Files you worked on

- src/components/LogIn/index.tsx
- src/components/Profile/index.tsx
- src/components/Profile/AuthorizedProfile.tsx

### What you accomplished

(Give a description of the features you added or tasks you accomplished. Provide some detail here. This section will be a little longer than the bulleted lists above)

My main responsibility for this sprint was the Profile page. The Profile page is broken down into two components: the AuthorizedProfile component and the UnauthorizedProfile component.

The AuthorizedProfile component was designed in Sprint 1 so for this sprint, I implemented that design and added functionality to its buttons, ensuring that Sign Out actually signed the user out and Reset Your Location actually got the user's location. I also displayed the user's email on that page, which is stored in the database. The edit profile button opens a modal that will be designed and implemented in the next sprint.

The UnauthorizedProfile component is itself broken down into two components: the LogIn page and the SignUp page. I redesigned the LogIn page for a more streamlined navigation, and then reworked the stack navigation code and fully implemented the design for the LogIn, connecting with the backend and incorporating fully functioning buttons.
