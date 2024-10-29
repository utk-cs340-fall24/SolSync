# Sprint 3

Name: Amy Huang

Github ID: amy-huang16

Group: SolSync

### What you planned to do

- Redo design on authorized profile page and implement it [#90](https://github.com/utk-cs340-fall24/SolSync/issues/90) - [link to design](https://github.com/utk-cs340-fall24/SolSync/blob/main/designs/authorized_profile.png)
- Refactor authorized profile [#76](https://github.com/utk-cs340-fall24/SolSync/issues/76)
- Finalize edit displayName modal [#69](https://github.com/utk-cs340-fall24/SolSync/issues/69) - [link to design](https://github.com/utk-cs340-fall24/SolSync/blob/main/designs/edit_display_name.png)
- Icon picker [#70](https://github.com/utk-cs340-fall24/SolSync/issues/70)

### What you did not do

- The one user story I did not end up completing was adding an icon picker. This was initially more of a stretch goal than a core feature, but I thought I would try to implement it this sprint. However, it ended up being very complicated and the changes I would have to make to the database would risk breaking the app right before the demo, so I decided not to go through with it.

### What problems you encountered

- For the authorized profile page, I had issues reloading the page after the user reset their location. We were able to fix this by making the useUser function return an object and creating a reloadUser function that reloads the information from the database.
- For the EditProfile modal, I had issues with having the new displayName persist after the modal closes, i.e., giving this information to the AuthorizedProfile component. We solved this by nesting the entire app inside of a UserProvider, which ensures that the entire app accesses the same user object.

### Issues you worked on

- [#90](https://github.com/utk-cs340-fall24/SolSync/issues/90)
- [#76](https://github.com/utk-cs340-fall24/SolSync/issues/76)
- [#69](https://github.com/utk-cs340-fall24/SolSync/issues/69)

### Files you worked on

- src/components/Profile/AuthorizedProfile.tsx
- App.tsx
- src/components/Profile/EditProfile.tsx
- src/components/Profile/index.tsx
- src/hooks/useHabit.ts
- src/hooks/useUser.ts
- src/providers/UserProvider.tsx

### What you accomplished

(Give a description of the features you added or tasks you accomplished. Provide some detail here. This section will be a little longer than the bulleted lists above)

The main feature I worked on this sprint was the Edit Profile page. I added a modal-style Edit Profile page that allows the user to edit their display name. I also redesigned the profile page to match the styles of the login and logout page and worked with other team members, Valli and Trishu, to streamline this design style to the rest of the app. Along the way, I worked with Rudra to fix the bug where the UI would not refresh based on the database changes to the SolSyncUser, which is an issue that we ran into with the home page and the profile page.
