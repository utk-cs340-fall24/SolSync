# SolSync

## Description

SolSync is a mobile app available on iOS and Android that allows users to track habits that correspond with the sunrise and sunset.

The initial inspiration for this product was the Hindu practice known as Agnihotra, but it can be used for any habit that corresponds with sunrise and sunset (stretching, drinking water, meditating, etc.)

## Getting Started

### Prerequisites

- Node.js
- Expo Go App
- PNPM

### Installation

1. Clone the repo
2. Obtain a copy of the .env file from one of the SolSync team members and place it in the root directory of the project
3. Run `pnpm install` to install all dependencies
4. Run `pnpm start` to start the app
5. Scan the QR code with the Expo Go app to open the app on your phone, or, alternatively, use a locally installed emulator

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
