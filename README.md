<h1 align="center">
  <br>
    <img src="assets/app-icon.png" alt="SolSync Logo" width="25%">  
  <br>
    SolSync
  <br>
</h1>

<h2 align="center">An app to track your habits with the sun</h2>

## Group Members

- Rudra Patel (RudraPatel2003)
- Kaylee Bae (baekay000)
- Amy Huang (amy-huang16)
- Trishu Patel (Trishu-Patel)
- Valli Paladugu (vallipaladugu)

## Description

SolSync is a mobile app available on iOS and Android that allows users to track habits that correspond with the sunrise and sunset.

The initial inspiration for this product was the Hindu practice known as Agnihotra, but it can be used for any habit that corresponds with sunrise and sunset (stretching, drinking water, meditating, etc.)

## Getting Started

### Prerequisites

- Node.js
- Expo Go App
- PNPM

### Installing and Running the App

1. Clone the repo
2. Obtain a copy of the .env file from one of the SolSync team members and place it in the root directory of the project
3. Run `pnpm install` to install all dependencies
4. Run `pnpm start` to start the app. If you run into problems with this command, run `npx expo start` instead.
5. As of November 13th, 2024, the Expo Go app only supports Expo SDK version 52 or above. This app uses Expo version 51. To test the app, you must have a MacBook with XCode installed to run the iOS emulator. Once you have ran `pnpm start` or `npx expo start`, follow the instructions on the command line to open the app on your emulator.

## Usage

Upon first opening the app, you will be taken to the home page.
The home page asks for your location and displays the sunrise and sunset times for the current location.

If not logged in, this is the only functionality available.

The profile page is accessed by clicking the profile icon at the bottom. This takes you to a page where you can log in or sign up.

Upon logging in, the app has many more features.

- The app remembers the location you typically use so that the time displayed on the home page is accurate even if you move around. This location can be reset by clicking the "Reset Your Location" button found on the profile page.
- The habits page lets users add, edit, and delete habits, as well as set up notifications for each habit.
- The history page shows how consistent the user has been with their habits. A habit can be tracked on it on the habits page on a given day.

## Contributing

Branch protections are enabled on this repository.
To contribute, please create a new branch and make a pull request.

Your pull request title must follow the conventional commits specification. An example of a valid pull request title is:

```text
feat: Add sunrise times to home page
```

It is also recommended to have the following VSCode extensions installed:

- Prettier
- ESLint

This will allow you to detect formatting and linting errors as you write code

Failure to pass the `pnpm lint` and `pnpm format` commands will mean that your PR cannot be merged.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.
